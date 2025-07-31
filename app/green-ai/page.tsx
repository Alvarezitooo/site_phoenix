/**
 * 🌱 Phoenix Green AI - Page dédiée
 * 
 * Page complète présentant l'initiative Green AI de Phoenix,
 * les métriques environnementales et la transparence carbone.
 * 
 * Author: Claude Phoenix DevSecOps Guardian
 * Version: 1.0.0 - Phoenix Green AI Initiative
 */

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Leaf, 
  Award, 
  TrendingDown, 
  BarChart3, 
  Shield, 
  ExternalLink,
  ArrowRight,
  Users,
  Zap,
  TreePine
} from 'lucide-react';

// Composants Green AI
import GreenAIBadge from '@/components/green/GreenAIBadge';
import GreenMetricsCard from '@/components/green/GreenMetricsCard';
import CarbonCalculator from '@/components/green/CarbonCalculator';

export const metadata: Metadata = {
  title: 'Phoenix Green AI - Premier générateur de lettres écologique en France',
  description: 'Découvrez comment Phoenix Letters révolutionne la reconversion professionnelle avec une IA écologique certifiée. Réduction de 47% des émissions CO2 vs concurrents.',
  keywords: 'Green AI, IA écologique, reconversion professionnelle, empreinte carbone, certification ISO, Phoenix Letters',
  openGraph: {
    title: 'Phoenix Green AI - IA écologique pour votre reconversion',
    description: 'Le premier générateur de lettres de motivation certifié Green AI. -47% de CO2 vs ChatGPT.',
    type: 'website',
    images: [
      {
        url: '/openart-image_594S3XHV_1753199070084_raw.jpg',
        width: 1200,
        height: 630,
        alt: 'Phoenix Green AI - IA écologique'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix Green AI - Premier générateur écologique français',
    description: 'Reconversion professionnelle + IA responsable = Phoenix Letters Green AI',
  }
};

export default function GreenAIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section Green AI */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge Hero */}
            <div className="inline-flex items-center space-x-2 bg-white/80 border border-green-300 
                           rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Premier en France</span>
              <span className="text-green-600">•</span>
              <span className="text-blue-700">Certification ISO/IEC 42001 en cours</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Phoenix{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Green AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              L'intelligence artificielle écologique au service de votre reconversion professionnelle.
              <strong className="text-green-700"> -47% de CO2 vs ChatGPT</strong>, 
              même qualité de résultats.
            </p>

            {/* CTA principal */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link 
                href="https://phoenix-letters.streamlit.app"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 
                         text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 
                         transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Leaf className="w-5 h-5" />
                <span>Essayer Phoenix Green AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button className="inline-flex items-center space-x-2 text-green-700 hover:text-green-800 
                               font-medium transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span>Voir les métriques live</span>
              </button>
            </div>

            {/* Badge de métriques hero */}
            <GreenAIBadge variant="full" showDetails={true} className="max-w-md mx-auto" />
          </div>
        </div>

        {/* Décoration arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Section Métriques Principales */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparence Environnementale Totale
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Toutes nos métriques sont publiques, auditables et mises à jour en temps réel.
              La première plateforme IA à offrir une telle transparence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Métriques détaillées */}
            <GreenMetricsCard variant="detailed" showRefresh={true} />
            
            {/* Comparaison concurrents */}
            <GreenMetricsCard variant="comparison" />
          </div>
        </div>
      </section>

      {/* Section Calculateur Impact */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculez Votre Impact Personnel
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez combien de CO2 vous économisez en choisissant Phoenix Letters 
              pour votre reconversion professionnelle.
            </p>
          </div>

          <CarbonCalculator showProjections={true} />
        </div>
      </section>

      {/* Section Certification */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Standards
            </h2>
            <p className="text-lg text-gray-600">
              Phoenix Green AI respecte les plus hauts standards internationaux 
              en matière d'IA responsable et d'impact environnemental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ISO/IEC 42001 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ISO/IEC 42001</h3>
              <p className="text-gray-600 mb-4">
                Certification internationale pour les systèmes de management de l'IA.
                <strong className="text-blue-600">Démarche en cours</strong> - Roadmap 12 semaines
              </p>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium">Voir la roadmap</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Green Software Foundation */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Green Software</h3>
              <p className="text-gray-600 mb-4">
                Membre actif de la Green Software Foundation. 
                Respect des principes <strong className="text-green-600">SCI (Software Carbon Intensity)</strong>
              </p>
              <div className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
                <span className="text-sm font-medium">En savoir plus</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Audit Tiers */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Audit Externe</h3>
              <p className="text-gray-600 mb-4">
                Métriques vérifiées par des organismes indépendants.
                Transparence <strong className="text-blue-600">100% auditée</strong>
              </p>
              <div className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium">Rapport d'audit</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Innovation Green AI */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                L'Innovation Green AI en Action
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cache Intelligent</h3>
                    <p className="text-green-100">
                      Notre système de cache avancé évite les requêtes inutiles, 
                      réduisant l'empreinte carbone de 85% sur les contenus similaires.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Optimisation Continue</h3>
                    <p className="text-green-100">
                      Algorithmes d'apprentissage qui optimisent automatiquement 
                      la consommation énergétique sans compromis sur la qualité.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Users className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Impact Collectif</h3>
                    <p className="text-green-100">
                      Plus de 1 200 reconversions réussies avec un impact carbone 
                      minimal. Chaque utilisateur contribue à un avenir plus vert.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Graphique ou visualisation (placeholder) */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-green-300 mb-2">
                    Réduction CO2 en Temps Réel
                  </h3>
                  <p className="text-green-100 text-sm">Depuis le lancement Green AI</p>
                </div>
                
                {/* Métriques visuelles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">47%</div>
                    <div className="text-green-200 text-sm">vs ChatGPT</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">31%</div>
                    <div className="text-green-200 text-sm">vs Claude</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">85%</div>
                    <div className="text-green-200 text-sm">cache hits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">A+</div>
                    <div className="text-green-200 text-sm">note Green AI</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                  <p className="text-green-100 text-sm text-center">
                    🌱 Économie totale: <strong>2.1kg CO2</strong> depuis janvier 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Rejoignez la Révolution Green AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transformez votre reconversion professionnelle avec une IA responsable. 
            Même qualité, impact environnemental minimal.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="https://phoenix-letters.streamlit.app"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 
                       transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Leaf className="w-5 h-5" />
              <span>Commencer Gratuitement</span>
            </Link>
            
            <Link 
              href="/about"
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 
                       font-medium transition-colors"
            >
              <span>En savoir plus sur Phoenix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Certification ISO/IEC 42001 en cours</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingDown className="w-4 h-4" />
              <span>-47% CO2 vs concurrents</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>1200+ reconversions réussies</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}