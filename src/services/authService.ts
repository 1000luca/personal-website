/**
 * Authentication Service
 * Handles Firebase authentication logic and token management
 */

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithCustomToken,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../config/firebase';
import type { User, AuthProvider } from '../types';
import { tokenService } from './tokenService';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<User> => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase auth not initialized');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(result.user, 'google');
  } catch (error: unknown) {
    console.error('Google sign-in error:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

/**
 * Sign in with Apple
 */
export const signInWithApple = async (): Promise<User> => {
  if (!auth || !appleProvider) {
    throw new Error('Firebase auth not initialized');
  }

  try {
    const result = await signInWithPopup(auth, appleProvider);
    return mapFirebaseUser(result.user, 'apple');
  } catch (error: unknown) {
    console.error('Apple sign-in error:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

/**
 * Sign in with Kakao (redirect method)
 */
export const signInWithKakao = async (): Promise<void> => {
  const kakaoApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!kakaoApiKey || !redirectUri) {
    throw new Error('Kakao configuration missing');
  }

  const params = new URLSearchParams({
    client_id: kakaoApiKey,
    redirect_uri: redirectUri,
    response_type: 'code',
  });

  window.location.href = `${KAKAO_AUTH_URL}?${params.toString()}`;
};

/**
 * Handle Kakao OAuth callback
 */
export const handleKakaoCallback = async (code: string): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase auth not initialized');
  }

  try {
    // Exchange code for custom token from backend
    const response = await fetch(`${BACKEND_URL}/api/auth/kakao/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Kakao');
    }

    const { customToken } = await response.json();

    // Sign in with custom token
    const result = await signInWithCustomToken(auth, customToken);
    return mapFirebaseUser(result.user, 'kakao');
  } catch (error: unknown) {
    console.error('Kakao callback error:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  if (!auth) {
    throw new Error('Firebase auth not initialized');
  }

  try {
    await firebaseSignOut(auth);
    tokenService.clearTokens();
  } catch (error: unknown) {
    console.error('Sign-out error:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

/**
 * Get Firebase ID token
 */
export const getIdToken = async (): Promise<string | null> => {
  if (!auth?.currentUser) return null;

  try {
    return await auth.currentUser.getIdToken();
  } catch (error: unknown) {
    console.error('Failed to get ID token:', error);
    return null;
  }
};

/**
 * Refresh Firebase ID token
 */
export const refreshToken = async (): Promise<void> => {
  if (!auth?.currentUser) {
    throw new Error('No user signed in');
  }

  try {
    await auth.currentUser.getIdToken(true);
  } catch (error: unknown) {
    console.error('Failed to refresh token:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

/**
 * Exchange Firebase token with backend JWT
 */
export const exchangeTokenWithBackend = async (
  firebaseToken: string
): Promise<void> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/exchange`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange token');
    }

    const { accessToken, refreshToken, expiresIn } = await response.json();

    tokenService.setTokens({
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    });
  } catch (error: unknown) {
    console.error('Token exchange error:', error);
    // Non-critical error, continue without backend tokens
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  if (!auth) {
    console.error('Firebase auth not initialized');
    return () => {};
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // Try to infer provider from providerData
      const provider = inferProvider(firebaseUser);
      const user = mapFirebaseUser(firebaseUser, provider);
      callback(user);

      // Exchange token with backend (optional)
      getIdToken().then((token) => {
        if (token) {
          exchangeTokenWithBackend(token).catch((error) => {
            console.error('Failed to exchange token:', error);
          });
        }
      });
    } else {
      callback(null);
      tokenService.clearTokens();
    }
  });
};

/**
 * Map Firebase user to application user
 */
const mapFirebaseUser = (
  firebaseUser: FirebaseUser,
  provider: AuthProvider
): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    provider,
    emailVerified: firebaseUser.emailVerified,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
  };
};

/**
 * Infer auth provider from Firebase user
 */
const inferProvider = (firebaseUser: FirebaseUser): AuthProvider => {
  const providerData = firebaseUser.providerData[0];
  if (!providerData) return 'google'; // Default fallback

  const providerId = providerData.providerId;
  if (providerId.includes('google')) return 'google';
  if (providerId.includes('apple')) return 'apple';
  if (providerId.includes('kakao')) return 'kakao';

  return 'google'; // Default fallback
};

/**
 * Get user-friendly error message
 */
const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;

    switch (code) {
      case 'auth/popup-closed-by-user':
        return 'Sign-in cancelled';
      case 'auth/popup-blocked':
        return 'Please allow popups for this site';
      case 'auth/account-exists-with-different-credential':
        return 'Account already exists with different sign-in method';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      default:
        return 'Authentication failed. Please try again';
    }
  }

  return 'An unexpected error occurred';
};
