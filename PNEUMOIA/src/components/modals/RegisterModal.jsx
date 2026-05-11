// src/components/modals/RegisterModal.jsx
import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, Camera, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';

export default function RegisterModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const photoInputRef = useRef(null);
  const documentInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    specialite: 'Pneumologie',
    numeroRPPS: '',
    etablissement: '',
    photoProfil: null,
    justificatif: null,
    emailPro: '',
    confirmationMdp: '',
    consentementCGU: false,
    politiqueConfidentialite: false,
    validationDonnees: false,
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    onClose();
    setStep(1);
    setPhotoPreview(null);
    setDocumentName(null);
    setFormData({
      civilite: '',
      nom: '',
      prenom: '',
      specialite: 'Pneumologie',
      numeroRPPS: '',
      etablissement: '',
      photoProfil: null,
      justificatif: null,
      emailPro: '',
      confirmationMdp: '',
      consentementCGU: false,
      politiqueConfidentialite: false,
      validationDonnees: false,
    });
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photoProfil: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, justificatif: file }));
      setDocumentName(file.name);
    }
  };

  const steps = [
    { number: 1, label: 'ID' },
    { number: 2, label: 'PRATIQUE' },
    { number: 3, label: 'ACCÈS' },
    { number: 4, label: 'ENGAGEMENT' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && !showConfirmation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header - titre centré */}
              <div className="p-6 pb-2">
                <div className="flex justify-between items-center">
                  <div className="w-8"></div>
                  <h2 className="text-xl font-bold m-5  text-blue-900">Inscription</h2>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between">
                  {steps.map((s, idx) => (
                    <div key={s.number} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                            step >= s.number
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {s.number}
                        </div>
                        <span
                          className={`text-xs mt-1 ${
                            step >= s.number ? 'text-blue-600 font-medium' : 'text-gray-400'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="w-full h-0.5 bg-gray-200 mx-2">
                          <div
                            className={`h-full bg-blue-600 transition-all duration-300 ${
                              step > s.number ? 'w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Zone de contenu scrollable */}
              <div className="px-6 py-2 max-h-[60vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {step === 1 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Civilité *
                          </label>
                          <select
                            value={formData.civilite}
                            onChange={(e) => updateField('civilite', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="">Sélectionner</option>
                            <option value="Dr">Dr</option>
                            <option value="Pr">Pr</option>
                            <option value="Mme">Mme</option>
                            <option value="M">M</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom *
                          </label>
                          <input
                            type="text"
                            value={formData.nom}
                            onChange={(e) => updateField('nom', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            value={formData.prenom}
                            onChange={(e) => updateField('prenom', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Spécialité *
                          </label>
                          <select
                            value={formData.specialite}
                            onChange={(e) => updateField('specialite', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="Pneumologie">Pneumologie</option>
                            <option value="Médecine générale">Médecine générale</option>
                            <option value="Cardiologie">Cardiologie</option>
                            <option value="Pédiatrie">Pédiatrie</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Numéro RPPS *
                          </label>
                          <input
                            type="text"
                            value={formData.numeroRPPS}
                            onChange={(e) => updateField('numeroRPPS', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="12345678901"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Établissement *
                          </label>
                          <input
                            type="text"
                            value={formData.etablissement}
                            onChange={(e) => updateField('etablissement', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Nom de l'hôpital ou cabinet"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo de profil *
                          </label>
                          <div className="flex items-center gap-4">
                            {photoPreview ? (
                              <div className="relative">
                                <img
                                  src={photoPreview}
                                  alt="Aperçu"
                                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhotoPreview(null);
                                    updateField('photoProfil', null);
                                  }}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                                <Camera className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => photoInputRef.current.click()}
                              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                            >
                              <Upload className="w-4 h-4" />
                              Télécharger
                            </button>
                            <input
                              ref={photoInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG (max. 5 Mo)</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Justificatif d'exercice *
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                            <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            {documentName ? (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-gray-700 truncate">{documentName}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDocumentName(null);
                                    updateField('justificatif', null);
                                  }}
                                  className="text-red-500 text-xs"
                                >
                                  Supprimer
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="text-xs text-gray-500 mb-2">Carte pro, diplôme, attestation</p>
                                <button
                                  type="button"
                                  onClick={() => documentInputRef.current.click()}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                                >
                                  <Upload className="w-3 h-3" />
                                  Choisir un fichier
                                </button>
                              </>
                            )}
                            <input
                              ref={documentInputRef}
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleDocumentUpload}
                              className="hidden"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max. 10 Mo)</p>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Pro *
                          </label>
                          <input
                            type="email"
                            value={formData.emailPro}
                            onChange={(e) => updateField('emailPro', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="nom@hopital.fr"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmation du mot de passe *
                          </label>
                          <input
                            type="password"
                            value={formData.confirmationMdp}
                            onChange={(e) => updateField('confirmationMdp', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.consentementCGU}
                              onChange={(e) => updateField('consentementCGU', e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-xs text-gray-700">Consentement aux CGU</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.politiqueConfidentialite}
                              onChange={(e) => updateField('politiqueConfidentialite', e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-xs text-gray-700">Politique de confidentialité</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.validationDonnees}
                              onChange={(e) => updateField('validationDonnees', e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-xs text-gray-700">Validations des données de santé</span>
                          </label>
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <div className="text-center py-4">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800 mb-2">ENGAGEMENT</h3>
                        <p className="text-sm text-gray-600 mb-3">En tant que professionnel de santé :</p>
                        <ul className="text-left text-xs text-gray-600 space-y-2">
                          <li className="flex items-start gap-2">✓ Utiliser la plateforme conformément à la réglementation</li>
                          <li className="flex items-start gap-2">✓ Respecter la confidentialité des données patients</li>
                          <li className="flex items-start gap-2">✓ Fournir des informations exactes et vérifiées</li>
                          <li className="flex items-start gap-2">✓ Maintenir à jour mes documents justificatifs</li>
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer avec boutons - toujours visibles */}
              <div className="p-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </button>
                  )}
                  {step < 4 && (
                    <button
                      onClick={nextStep}
                      className="flex items-center gap-1 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto text-sm"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {step === 4 && (
                    <button
                      onClick={handleSubmit}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto text-sm"
                    >
                      Soumettre
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmationModal 
        isOpen={showConfirmation} 
        onClose={handleCloseConfirmation} 
      />
    </>
  );
}