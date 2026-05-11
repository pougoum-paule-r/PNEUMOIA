import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Activity, Thermometer, Droplets, Heart, User, MapPin, Calendar } from 'lucide-react';

export default function CaseDetailModal({ caseItem, onClose }) {
  if (!caseItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          {/* Header avec dégradé */}
          <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-80">Cas clinique</p>
                <h3 className="font-semibold">{caseItem.badge}</h3>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Titre principal */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {caseItem.title}
            </h2>
            
            {/* Informations patient */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-blue-500" />
                <span>{caseItem.patient.gender} • {caseItem.patient.age}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4 text-blue-500" />
                <span>{caseItem.patient.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{caseItem.patient.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{caseItem.patient.date}</span>
              </div>
            </div>

            {/* PRÉSENTATION CLINIQUE */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                PRÉSENTATION CLINIQUE
              </h3>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed">
                  Fièvre à 39.2°C, toux productive purulente, SaO₂ 91%. Diabétique type 2. 
                  Crépitants base droite. CRP 142 mg/L. Séroconversion pneumocoque positive.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <Thermometer className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Température</p>
                    <p className="font-semibold text-gray-700">39.2°C</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">SaO₂</p>
                    <p className="font-semibold text-gray-700">91%</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-5 h-5 text-pink-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">CRP</p>
                    <p className="font-semibold text-gray-700">142 mg/L</p>
                  </div>
                  <div className="text-center">
                    <Activity className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Toux</p>
                    <p className="font-semibold text-gray-700">Productive</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CRITÈRES À VALIDER */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                CRITÈRES À VALIDER
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Syndrome infectieux (fièvre + CRP élevée)",
                  "Opacité alvéolaire segmentaire à la radio",
                  "Désaturation oxymétrique (SaO₂ < 94%)",
                  "Séroconversion pneumocoque positive"
                ].map((criteria, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-700">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC IA */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                <h3 className="font-semibold mb-3">DIAGNOSTIC IA PRINCIPAL</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{caseItem.confidence}%</div>
                  <p className="text-sm opacity-80">Confiance</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                    <div className="bg-white rounded-full h-2" style={{ width: `${caseItem.confidence}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">DIAGNOSTICS DIFFÉRENTIELS</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Bronchite aigue
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Tuberculose
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Pneumonie virale
                  </li>
                </ul>
              </div>
            </div>

            {/* Méthodes de traitement */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                MÉTHODES DE TRAITEMENT
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Antibiothérapie", "Oxygénothérapie", "Surveillance glycémique", "Repos"].map((treatment, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                    {treatment}
                  </span>
                ))}
              </div>
            </div>

            {/* Médecin */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-400">Médecin référent</p>
                <p className="font-semibold text-gray-800">{caseItem.doctor}</p>
                <p className="text-sm text-gray-500">{caseItem.hospital}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Expérience</p>
                <p className="font-semibold text-gray-800">{caseItem.experience}</p>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-4 pt-6 mt-4 border-t">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all">
                Consulter les cas similaires
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}