// /apps/phoenix-website/app/api/stripe/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialiser Stripe (laisser l'API version par défaut pour compatibilité)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Initialiser le client Supabase admin pour l'écriture en BDD
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy-key',
);

// Le secret du webhook
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Helper pour trouver l'user_id à partir du customer_id Stripe
const getUserIdFromCustomerId = async (customerId: string): Promise<string | null> => {
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (error || !data) {
    console.error(`Aucun utilisateur trouvé pour le customer_id Stripe: ${customerId}`);
    return null;
  }
  return data.user_id;
};

export async function POST(req: NextRequest) {
  try {
    // Vercel (runtime Node.js) + Next.js App Router: récupérer le RAW body via text()
    const bodyText = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    // 1. VÉRIFICATION DE LA SIGNATURE
    try {
      event = stripe.webhooks.constructEvent(bodyText, sig, webhookSecret);
    } catch (err: any) {
      console.error(`❌ Erreur de vérification du webhook: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // 2. PUBLICATION DE L'ÉVÉNEMENT PHOENIX
    const eventType = event.type;
    const eventObject = event.data.object as any;
    let phoenixEvent = null;

    console.log(`✅ Webhook Stripe reçu et validé: ${eventType}`);

    switch (eventType) {
      case 'checkout.session.completed':
        const userIdFromCheckout = eventObject.client_reference_id;
        if (!userIdFromCheckout) {
          console.error('CRITICAL: checkout.session.completed sans client_reference_id!');
          break;
        }
        phoenixEvent = {
          stream_id: userIdFromCheckout,
          event_type: 'billing.subscription_activated',
          app_source: 'billing',
          payload: {
            stripe_customer_id: eventObject.customer,
            stripe_subscription_id: eventObject.subscription,
            subscription_tier: eventObject.metadata?.plan_id || 'premium',
          },
        };
        break;

      case 'customer.subscription.deleted':
        const userIdFromCancel = await getUserIdFromCustomerId(eventObject.customer);
        if (!userIdFromCancel) break;
        phoenixEvent = {
          stream_id: userIdFromCancel,
          event_type: 'billing.subscription_cancelled',
          app_source: 'billing',
          payload: {
            stripe_subscription_id: eventObject.id,
            cancellation_reason:
              eventObject.cancellation_details?.reason || 'user_request_from_stripe_dashboard',
          },
        };
        break;

      case 'invoice.payment_failed':
        const userIdFromFail = await getUserIdFromCustomerId(eventObject.customer);
        if (!userIdFromFail) break;
        phoenixEvent = {
          stream_id: userIdFromFail,
          event_type: 'billing.payment_failed',
          app_source: 'billing',
          payload: {
            amount_due: eventObject.amount_due,
            currency: eventObject.currency,
            failure_reason: eventObject.last_payment_error?.message || 'unknown',
            stripe_invoice_id: eventObject.id,
          },
        };
        break;

      case 'customer.subscription.updated':
        const userIdFromUpdate = await getUserIdFromCustomerId(eventObject.customer);
        if (!userIdFromUpdate) break;
        phoenixEvent = {
          stream_id: userIdFromUpdate,
          event_type: 'user.tier_updated',
          app_source: 'billing',
          payload: {
            new_tier: eventObject.items.data[0]?.price.lookup_key || 'premium',
            old_tier: eventObject.previous_attributes?.items
              ? eventObject.previous_attributes.items.data[0]?.price.lookup_key || 'free'
              : 'unknown',
            stripe_subscription_id: eventObject.id,
            stripe_customer_id: eventObject.customer,
          },
        };
        break;

      default:
        console.log(`-> Événement non traité: ${eventType}`);
        break;
    }

    if (phoenixEvent) {
      const { error } = await supabaseAdmin.from('events').insert(phoenixEvent);
      if (error) {
        console.error('Erreur insertion événement Phoenix:', error);
        return NextResponse.json({ error: 'Failed to record Phoenix event' }, { status: 500 });
      }
      console.log(
        `✅ Événement Phoenix [${phoenixEvent.event_type}] publié pour l'utilisateur ${phoenixEvent.stream_id}`,
      );
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Erreur inattendue dans le handler de webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Désactiver tout cache et forcer l'exécution côté Node.js (Stripe SDK requis)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'fra1';
