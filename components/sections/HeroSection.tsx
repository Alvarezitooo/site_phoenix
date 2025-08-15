import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Créé par un reconverti, pour les reconvertis
            </div>
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Outils IA pour réussir votre{' '}
            <span className="text-orange-500">reconversion professionnelle</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transformez votre parcours atypique en votre plus grande force. Phoenix est l'écosystème
            d'applications IA conçu par un reconverti, pour les reconvertis.
          </p>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href="https://phoenix-letters.streamlit.app/" target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-2 h-5 w-5" />
                Essayer Phoenix Letters GRATUIT
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <StripeCheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PACK_PRICE_ID || 'price_pack_monthly'}
              productName="Bundle Phoenix (Letters + CV)"
              price="15,99€/mois"
              label="Passer Premium"
              className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white"
            />
          </div>

          {/* Stats - Temporairement désactivé pour des raisons d'exactitude des données
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-slate-600">Lettres générées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
              <div className="text-slate-600">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">24h</div>
              <div className="text-slate-600">Support réactif</div>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* Decorative elements */}
      <Image
        src="/openart-image_594S3XHV_1753199070084_raw.jpg"
        alt="Phoenix Letters Logo"
        width={80}
        height={80}
        className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse object-cover"
        priority
      />
      <Image
        src="/openart-image_594S3XHV_1753199070084_raw.jpg"
        alt="Phoenix Letters Logo"
        width={128}
        height={128}
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10 animate-pulse delay-1000 object-cover"
      />
    </section>
  );
}
