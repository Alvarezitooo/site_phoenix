import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Leaf } from 'lucide-react';
import GreenAIBadge from '@/components/green/GreenAIBadge';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Créé par un reconverti, pour les reconvertis
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <Leaf className="h-4 w-4 mr-2" />
              Premier générateur Green AI français
            </div>
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Outils IA pour réussir votre{' '}
            <span className="text-orange-500">reconversion professionnelle</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transformez votre parcours atypique en votre plus grande force. Phoenix est l'écosystème 
            d'applications <strong className="text-green-700">Green AI</strong> conçu par un reconverti, pour les reconvertis.
          </p>

          {/* Green AI Value Proposition */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-green-800">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="text-lg font-semibold">
                -47% de CO2 vs ChatGPT • Même qualité de résultats
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Certification en cours
              </span>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href="https://phoenix-letters.streamlit.app/" target="_blank" rel="noopener noreferrer">
                <Leaf className="mr-2 h-5 w-5" />
                Essayer Phoenix Green AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 h-auto border-green-300 text-green-700 hover:bg-green-50"
              asChild
            >
              <a href="/green-ai">
                Voir les métriques CO2
              </a>
            </Button>
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
      <img src="/openart-image_594S3XHV_1753199070084_raw.jpg" alt="Phoenix Letters Logo" className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse object-cover" />
      <img src="/openart-image_594S3XHV_1753199070084_raw.jpg" alt="Phoenix Letters Logo" className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10 animate-pulse delay-1000 object-cover" />
    </section>
  );
}