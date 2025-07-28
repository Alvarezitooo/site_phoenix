import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Une tarification juste et transparente,
            <span className="text-orange-500"> pour tous les besoins</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Phoenix Letters vous accompagne dans votre reconversion avec des outils gratuits puissants 
            et des fonctionnalités premium pour aller plus loin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Plan Gratuit */}
          <Card className="relative border-2 border-slate-200 hover:border-slate-300 transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Gratuit</CardTitle>
              <CardDescription className="text-slate-600">Pour commencer</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">0€</span>
                <span className="text-slate-600 ml-2">/ toujours</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>2 lettres de motivation par mois</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Templates de base</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Export TXT</span>
                </li>
              </ul>
              <Button className="w-full mt-8" variant="outline">
                <a href="https://phoenix-letters.streamlit.app/" target="_blank" rel="noopener noreferrer">
                  Commencer gratuitement
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Plan Premium */}
          <Card className="relative border-2 border-orange-500 hover:border-orange-600 transition-colors">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white px-4 py-1">Recommandé</Badge>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription className="text-slate-600">Pour une reconversion réussie</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">9,99€</span>
                <span className="text-slate-600 ml-2">/ mois</span>
              </div>
              <div className="text-sm text-slate-600">
                ou 79€/an <Badge variant="secondary" className="ml-2">Économisez 33%</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Lettres de motivation illimitées</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Tous les templates premium</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Export PDF/DOCX professionnel</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Analyse "Mirror Match"</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Coaching "Smart Coach"</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Plan de carrière "Trajectory Builder"</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
              <Button className="w-full mt-8 bg-orange-500 hover:bg-orange-600">
                Passer à Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bientôt disponible */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Bientôt disponible</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle className="text-xl">Phoenix CV</CardTitle>
                <CardDescription>Q3 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  CV percutants et accroches personnalisées qui passent les filtres ATS.
                </p>
              </CardContent>
            </Card>
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle className="text-xl">Phoenix Rise</CardTitle>
                <CardDescription>Q4 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Coach carrière IA et journal de bord pour piloter votre reconversion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}