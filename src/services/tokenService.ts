/**
 * Token Service
 * Manages JWT token storage and validation
 */

import type { JWTTokens, TokenStorage } from '../types';

const TOKEN_KEY = 'auth_tokens';

/**
 * Token storage implementation using localStorage
 */
export const tokenService: TokenStorage = {
  /**
   * Get stored tokens from localStorage
   */
  getTokens(): JWTTokens | null {
    try {
      const tokensStr = localStorage.getItem(TOKEN_KEY);
      if (!tokensStr) return null;

      const tokens = JSON.parse(tokensStr) as JWTTokens;
      return tokens;
    } catch (error) {
      console.error('Failed to get tokens:', error);
      return null;
    }
  },

  /**
   * Save tokens to localStorage
   */
  setTokens(tokens: JWTTokens): void {
    try {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    } catch (error) {
      console.error('Failed to set tokens:', error);
    }
  },

  /**
   * Clear tokens from localStorage
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  },

  /**
   * Check if the access token has expired
   */
  isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens) return true;

    const now = Date.now();
    const buffer = 60 * 1000; // 1 minute buffer
    return now >= tokens.expiresAt - buffer;
  },
};
