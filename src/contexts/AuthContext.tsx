/**
 * Authentication Context
 * Manages authentication state and provides auth methods to the application
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import toast from 'react-hot-toast';
import type { User, AuthContextType } from '../types';
import * as authService from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((newUser) => {
      setUser(newUser);
      setInitialized(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithGoogle();
      setUser(user);
      toast.success(`Welcome, ${user.displayName || 'User'}!`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const user = await authService.signInWithApple();
      setUser(user);
      toast.success(`Welcome, ${user.displayName || 'User'}!`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithKakao = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await authService.signInWithKakao();
      // Redirect happens, loading will continue
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      setError(message);
      toast.error(message);
      setLoading(false);
      throw err;
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await authService.signOut();
      setUser(null);
      toast.success('Signed out successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    try {
      return await authService.getIdToken();
    } catch (err) {
      console.error('Failed to get ID token:', err);
      return null;
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await authService.refreshToken();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to refresh token';
      console.error(message);
      toast.error(message);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    initialized,
    signInWithGoogle,
    signInWithApple,
    signInWithKakao,
    signOut,
    getIdToken,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
