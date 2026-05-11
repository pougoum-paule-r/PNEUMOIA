// src/features/features/components/DiagnosticIA.jsx
import { motion } from 'framer-motion';
import { Brain, Activity, Zap, Shield, TrendingUp, Microscope, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiagnosticIA() {
  const scrollToCasCliniques = () => {
    const element = document.getElementById('bibliotheque-cas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>01 — Intelligence artificielle</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Un diagnostic pulmonaire augmenté par l'IA
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Colonne gauche - Métriques */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Microscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2 millions</p>
                <p className="text-gray-600">de clichés radiologiques annotés par des experts</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">99.2%</p>
                <p className="text-gray-600">de concordance avec le consensus d'experts seniors</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{'< 3 secondes'}</p>
                <p className="text-gray-600">pour une analyse complète et segmentée</p>
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Pathologies détectées */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Spectre de détection</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Pneumonie", "Tuberculose", "Asthme", "BPCO",
                "Cancer bronchique", "Bronchite", "Fibrose", "COVID-19"
              ].map((patho, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>{patho}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button 
                onClick={scrollToCasCliniques}
                className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
              >
                Voir les cas cliniques <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}