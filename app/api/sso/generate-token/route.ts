/**
 * 🔐 Phoenix SSO Token Generation API
 * Génère des tokens sécurisés pour navigation cross-app
 */

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { user_data, target_app, expires_hours = 1 } = await request.json();

    // Validation des données
    if (!user_data || !target_app) {
      return NextResponse.json({ error: 'user_data et target_app requis' }, { status: 400 });
    }

    if (!user_data.user_id || !user_data.email) {
      return NextResponse.json(
        { error: 'user_id et email requis dans user_data' },
        { status: 400 },
      );
    }

    // Apps supportées
    const supportedApps = ['letters', 'cv', 'rise'];
    if (!supportedApps.includes(target_app)) {
      return NextResponse.json({ error: `App non supportée: ${target_app}` }, { status: 400 });
    }

    // Clé secrète Phoenix
    const phoenixSecret = process.env.PHOENIX_SECRET_KEY || 'phoenix-sso-secret-2024-secure';

    // Construction payload JWT
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      user_id: user_data.user_id,
      email: user_data.email,
      user_tier: user_data.user_tier || 'free',
      full_name: user_data.full_name || '',
      source_app: 'website',
      target_app: target_app,
      session_id: generateSessionId(),
      iat: now,
      exp: now + expires_hours * 3600,
      iss: 'phoenix-ecosystem',
      aud: target_app,
      jti: crypto.randomBytes(16).toString('hex'),
    };

    // Génération JWT
    const jwtToken = jwt.sign(payload, phoenixSecret, { algorithm: 'HS256' });

    // Chiffrement du token pour sécurité supplémentaire
    const encryptionKey = generateEncryptionKey(phoenixSecret);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);

    let encryptedToken = cipher.update(jwtToken, 'utf8', 'base64');
    encryptedToken += cipher.final('base64');

    // Combinaison IV + token chiffré
    const finalToken = Buffer.concat([iv, Buffer.from(encryptedToken, 'base64')]).toString(
      'base64url',
    );

    // Réponse
    return NextResponse.json({
      success: true,
      sso_token: finalToken,
      expires_in: expires_hours * 3600,
      target_app: target_app,
      issued_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erreur génération token SSO:', error);

    return NextResponse.json(
      {
        error: 'Erreur serveur génération token',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 },
    );
  }
}

// Utilitaires

function generateSessionId(): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(8).toString('hex');
  return `phoenix_${timestamp}_${random}`;
}

function generateEncryptionKey(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex').substring(0, 32);
}

// Méthodes HTTP supportées
export const runtime = 'nodejs';
export const preferredRegion = 'auto';
