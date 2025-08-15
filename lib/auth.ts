/**
 * 🔐 Phoenix Website - Service d'Authentification Unifié
 * Intégration Supabase Auth pour le website Phoenix
 */

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Types Phoenix Auth
export interface PhoenixUser {
  id: string;
  email: string;
  fullName?: string;
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  apps: {
    letters: boolean;
    cv: boolean;
    rise: boolean;
    aube: boolean;
  };
  preferences: {
    newsletter: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  createdAt: string;
  lastLoginAt: string;
}

export interface PhoenixSession {
  user: PhoenixUser;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service d'authentification Phoenix
export class PhoenixWebsiteAuth {
  private static instance: PhoenixWebsiteAuth;

  static getInstance(): PhoenixWebsiteAuth {
    if (!PhoenixWebsiteAuth.instance) {
      PhoenixWebsiteAuth.instance = new PhoenixWebsiteAuth();
    }
    return PhoenixWebsiteAuth.instance;
  }

  // Inscription utilisateur via n8n webhook
  async signUp(email: string, password: string, metadata?: any): Promise<PhoenixUser | null> {
    try {
      // Appel au webhook n8n pour gérer l'inscription
      const n8nWebhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_SIGNUP ||
        'http://localhost:5678/webhook/phoenix-signup';

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          metadata: {
            fullName: metadata?.fullName,
            sourceApp: 'website',
            utmSource: metadata?.utmSource,
            newsletter: metadata?.newsletter || false,
          },
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`N8N Webhook Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.user) {
        return this.transformN8NUserToPhoenix(result.user);
      }

      throw new Error(result.error || "Erreur lors de l'inscription");
    } catch (error) {
      console.error('Phoenix signup via n8n error:', error);
      throw error;
    }
  }

  // Connexion utilisateur
  async signIn(email: string, password: string): Promise<PhoenixUser | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Mettre à jour last_login
        await this.updateLastLogin(data.user.id);
        return this.transformToPhoenixUser(data.user);
      }

      return null;
    } catch (error) {
      console.error('Phoenix signin error:', error);
      throw error;
    }
  }

  // Connexion Google OAuth
  async signInWithGoogle(): Promise<{ url: string }> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          source_app: 'website',
        },
      },
    });

    if (error) throw error;
    return { url: data.url };
  }

  // Déconnexion
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  // Récupérer utilisateur actuel
  async getCurrentUser(): Promise<PhoenixUser | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return null;

      return this.transformToPhoenixUser(user);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Générer token cross-app
  async generateCrossAppToken(targetApp: 'letters' | 'cv' | 'rise'): Promise<string> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) throw new Error('No active session');

    // Token JWT personnalisé pour navigation cross-app
    const crossAppToken = btoa(
      JSON.stringify({
        userId: session.user.id,
        email: session.user.email,
        targetApp,
        timestamp: Date.now(),
        signature: this.generateSignature(session.user.id, targetApp),
      }),
    );

    return crossAppToken;
  }

  // Redirection SSO cross-app sécurisée
  async redirectToApp(app: 'letters' | 'cv' | 'rise', userData?: any): Promise<void> {
    try {
      // Récupération session utilisateur actuelle
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Aucune session active - reconnexion requise');
      }

      // Données utilisateur pour SSO
      const ssoUserData = {
        user_id: session.user.id,
        email: session.user.email,
        user_tier: session.user.app_metadata?.subscription_tier || 'free',
        full_name: session.user.user_metadata?.full_name || '',
        source_app: 'website',
        ...userData,
      };

      // URLs des applications
      const urls = {
        letters:
          process.env.NEXT_PUBLIC_PHOENIX_LETTERS_URL || 'https://phoenix-letters.streamlit.app',
        cv: process.env.NEXT_PUBLIC_PHOENIX_CV_URL || 'https://phoenix-cv.streamlit.app',
        rise: process.env.NEXT_PUBLIC_PHOENIX_RISE_URL || 'https://phoenix-rise.streamlit.app',
      };

      // Génération URL SSO sécurisée
      const ssoUrl = await this.generateSecureSSO_URL(ssoUserData, app, urls[app]);

      // Redirection avec tracking
      this.trackCrossAppNavigation(app, ssoUserData.user_id);
      window.location.href = ssoUrl;
    } catch (error) {
      console.error(`Erreur redirection SSO vers ${app}:`, error);
      throw error;
    }
  }

  // Génération URL SSO sécurisée (compatible avec phoenix_sso.py)
  private async generateSecureSSO_URL(
    userData: any,
    targetApp: string,
    baseUrl: string,
  ): Promise<string> {
    try {
      // Appel au service n8n pour génération token SSO
      const response = await fetch('/api/sso/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_data: userData,
          target_app: targetApp,
          expires_hours: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur génération token SSO');
      }

      const { sso_token } = await response.json();

      // Construction URL avec token
      const ssoUrl = `${baseUrl}?phoenix_auth=${sso_token}&source=website_sso`;

      return ssoUrl;
    } catch (error) {
      console.error('Erreur génération URL SSO:', error);

      // Fallback vers ancienne méthode
      const fallbackToken = await this.generateCrossAppToken(
        targetApp as 'letters' | 'cv' | 'rise',
      );
      return `${baseUrl}?phoenix_token=${fallbackToken}&source=website`;
    }
  }

  // Tracking navigation cross-app
  private trackCrossAppNavigation(targetApp: string, userId: string): void {
    try {
      // Event tracking pour analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'cross_app_navigation', {
          target_app: targetApp,
          user_id: userId,
          source: 'phoenix_website',
        });
      }
    } catch (error) {
      console.error('Erreur tracking navigation:', error);
    }
  }

  // Helpers privés
  private async createPhoenixProfile(userId: string, data: any): Promise<void> {
    const { error } = await supabase.from('profiles').insert({
      id: userId,
      email: data.email,
      full_name: data.fullName,
      subscription_tier: data.subscriptionTier,
      app_preferences: {
        letters: false,
        cv: false,
        rise: false,
        aube: false,
      },
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Create profile error:', error);
    }
  }

  private async updateLastLogin(userId: string): Promise<void> {
    await supabase
      .from('profiles')
      .update({
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }

  private transformToPhoenixUser(user: any): PhoenixUser {
    return {
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name,
      subscriptionTier: user.app_metadata?.subscription_tier || 'free',
      apps: {
        letters: user.app_metadata?.apps?.letters || false,
        cv: user.app_metadata?.apps?.cv || false,
        rise: user.app_metadata?.apps?.rise || false,
        aube: user.app_metadata?.apps?.aube || false,
      },
      preferences: {
        newsletter: user.user_metadata?.newsletter_opt_in || false,
        analytics: user.user_metadata?.analytics_opt_in || true,
        marketing: user.user_metadata?.marketing_opt_in || false,
      },
      createdAt: user.created_at,
      lastLoginAt: user.last_sign_in_at,
    };
  }

  private transformN8NUserToPhoenix(user: any): PhoenixUser {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      subscriptionTier: user.subscriptionTier || 'free',
      apps: {
        letters: user.apps?.letters || false,
        cv: user.apps?.cv || false,
        rise: user.apps?.rise || false,
        aube: user.apps?.aube || false,
      },
      preferences: {
        newsletter: user.preferences?.newsletter || false,
        analytics: user.preferences?.analytics || true,
        marketing: user.preferences?.marketing || false,
      },
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  }

  private generateSignature(userId: string, targetApp: string): string {
    // Signature simple pour validation cross-app
    const secret = process.env.NEXT_PUBLIC_PHOENIX_SECRET || 'phoenix-secret';
    return btoa(`${userId}-${targetApp}-${secret}`);
  }
}

// Instance singleton
export const phoenixAuth = PhoenixWebsiteAuth.getInstance();

// Hook React pour auth
export function usePhoenixAuth() {
  return {
    signUp: phoenixAuth.signUp.bind(phoenixAuth),
    signIn: phoenixAuth.signIn.bind(phoenixAuth),
    signInWithGoogle: phoenixAuth.signInWithGoogle.bind(phoenixAuth),
    signOut: phoenixAuth.signOut.bind(phoenixAuth),
    getCurrentUser: phoenixAuth.getCurrentUser.bind(phoenixAuth),
    redirectToApp: phoenixAuth.redirectToApp.bind(phoenixAuth),
  };
}
