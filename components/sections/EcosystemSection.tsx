import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User, TrendingUp, ArrowRight } from 'lucide-react';

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Notre Écosystème
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Trois applications complémentaires pour vous accompagner à chaque étape 
            de votre reconversion professionnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Phoenix Letters */}
          <Card className="relative border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-3 left-4">
              <Badge className="bg-green-500 text-white">LIVE</Badge>
            </div>
            <CardHeader className="pt-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Phoenix Letters</CardTitle>
              <CardDescription>
                Générez des lettres de motivation uniques qui transforment votre expérience passée 
                en un atout majeur pour votre futur métier.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li>• Templates personnalisés par secteur</li>
                <li>• IA qui valorise votre parcours atypique</li>
                <li>• Export professionnel PDF/DOCX</li>
                <li>• Coaching intégré</li>
              </ul>
              <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                <a href="https://phoenix-letters.streamlit.app/" target="_blank" rel="noopener noreferrer">
                  Commencer à écrire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Phoenix CV */}
          <Card className="relative border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-3 left-4">
              <Badge className="bg-orange-500 text-white">Q3 2025</Badge>
            </div>
            <CardHeader className="pt-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Phoenix CV</CardTitle>
              <CardDescription>
                Créez des CV percutants et des accroches hyper-personnalisées qui passent 
                les filtres ATS et captent l'attention des recruteurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li>• Optimisation ATS automatique</li>
                <li>• Templates modernes et professionnels</li>
                <li>• Accroches personnalisées par poste</li>
                <li>• Analyse de compatibilité offre/profil</li>
              </ul>
              <Button className="w-full" variant="outline" disabled>
                Bientôt disponible
              </Button>
            </CardContent>
          </Card>

          {/* Phoenix Rise */}
          <Card className="relative border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
            <div className="absolute -top-3 left-4">
              <Badge className="bg-blue-500 text-white">Q4 2025</Badge>
            </div>
            <CardHeader className="pt-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Phoenix Rise</CardTitle>
              <CardDescription>
                Votre coach de carrière IA et journal de bord pour préparer vos entretiens, 
                suivre votre motivation et piloter votre reconversion au quotidien.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-slate-600 space-y-2 mb-6">
                <li>• Préparation d'entretiens personnalisée</li>
                <li>• Suivi de motivation et objectifs</li>
                <li>• Conseils de carrière adaptatifs</li>
                <li>• Tableau de bord de progression</li>
              </ul>
              <Button className="w-full" variant="outline" disabled>
                En développement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}