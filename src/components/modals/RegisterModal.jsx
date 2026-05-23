// src/components/modals/RegisterModal.jsx
import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, Camera, FileText, CheckCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from './ConfirmationModal';

// ─── 6 documents obligatoires ────────────────────────────────────────────────
const DOCUMENTS_REQUIS = [
  { id: 'diplome_specialisation', label: 'Diplôme de spécialisation en pneumologie',       accept: '.pdf,.jpg,.jpeg,.png' },
  { id: 'diplome_medecine',       label: 'Diplôme de docteur en médecine',                  accept: '.pdf,.jpg,.jpeg,.png' },
  { id: 'inscription_ordre',      label: "Inscription à l'ordre / registre des médecins",   accept: '.pdf,.jpg,.jpeg,.png' },
  { id: 'autorisation_exercice',  label: "Autorisation d'exercice en pneumologie",          accept: '.pdf,.jpg,.jpeg,.png' },
  { id: 'carte_professionnelle',  label: 'Carte professionnelle de médecin',                accept: '.pdf,.jpg,.jpeg,.png' },
  { id: 'cni',                    label: "Carte nationale d'identité (CNI)",                accept: '.pdf,.jpg,.jpeg,.png' },
];

const MAX_MB = 10;

export default function RegisterModal({ isOpen, onClose }) {
  const [step, setStep]                     = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [photoPreview, setPhotoPreview]     = useState(null);
  const [documents, setDocuments]           = useState({}); // { [docId]: File }
  const [errors, setErrors]                 = useState({});
  const photoRef                            = useRef(null);

  const [form, setForm] = useState({
    civilite: '', nom: '', prenom: '',
    specialite: 'Pneumologie', numeroRPPS: '', etablissement: '',
    photoProfil: null,
    emailPro: '', motDePasse: '', confirmationMdp: '',
    cgu: false, confidentialite: false, donnees: false,
  });

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const reset = () => {
    setStep(1); setPhotoPreview(null); setDocuments({}); setErrors({});
    setForm({ civilite:'', nom:'', prenom:'', specialite:'Pneumologie', numeroRPPS:'', etablissement:'',
              photoProfil:null, emailPro:'', motDePasse:'', confirmationMdp:'', cgu:false, confidentialite:false, donnees:false });
  };

  // ── Photo ────────────────────────────────────────────────────────────────
  const handlePhoto = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    upd('photoProfil', f);
    const r = new FileReader();
    r.onloadend = () => setPhotoPreview(r.result);
    r.readAsDataURL(f);
  };

  // ── Document — chaque input a son propre id HTML unique ─────────────────
  const handleDoc = (docId, e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) {
      setErrors(p => ({ ...p, [docId]: `Fichier trop lourd (max ${MAX_MB} Mo)` }));
      // reset l'input pour permettre de rechoisir
      e.target.value = '';
      return;
    }
    setErrors(p => { const n = { ...p }; delete n[docId]; return n; });
    setDocuments(p => ({ ...p, [docId]: f }));
    // NE PAS reset e.target.value ici — on veut garder la sélection visible
  };

  const removeDoc = (docId) => {
    setDocuments(p => { const n = { ...p }; delete n[docId]; return n; });
    // Reset l'input natif en changeant sa key (voir inputKey)
    setInputKeys(p => ({ ...p, [docId]: (p[docId] || 0) + 1 }));
  };
  const [inputKeys, setInputKeys] = useState({});

  const docsOk = DOCUMENTS_REQUIS.every(d => documents[d.id]);
  const uploadedCount = Object.keys(documents).length;

  const steps = [
    { n: 1, label: 'ID'        },
    { n: 2, label: 'PRATIQUE'  },
    { n: 3, label: 'DOCUMENTS' },
    { n: 4, label: 'ACCÈS'     },
  ];

  const inputClass = "w-full px-3 py-2.5 border border-(--ln) rounded-xl bg-(--sf2) text-(--t1) text-sm placeholder:text-(--t4) focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelClass = "block text-sm font-medium text-(--t2) mb-1.5";

  return (
    <>
      <AnimatePresence>
        {isOpen && !showConfirmation && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

            <motion.div
              initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}}
              exit={{opacity:0, scale:0.95, y:20}} transition={{duration:0.2}}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                         w-full max-w-lg bg-(--sf) rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* ── Header ── */}
              <div className="px-6 pt-5 pb-3">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-6" />
                  <h2 className="text-lg font-bold text-blue-700 dark:text-blue-400">Inscription médecin</h2>
                  <button onClick={onClose} className="p-1.5 hover:bg-(--sf2) rounded-lg transition-colors">
                    <X className="w-4 h-4 text-(--t3)" />
                  </button>
                </div>

                {/* Stepper */}
                <div className="flex items-center">
                  {steps.map((s, i) => (
                    <div key={s.n} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step > s.n  ? 'bg-emerald-500 text-white'
                          : step === s.n ? 'bg-blue-600 text-white'
                          : 'bg-(--sf3) text-(--t4)'
                        }`}>
                          {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
                        </div>
                        <span className={`text-[10px] mt-1 font-semibold ${step >= s.n ? 'text-blue-600 dark:text-blue-400' : 'text-(--t4)'}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-0.5 bg-(--sf3) mx-2 mb-4">
                          <div className={`h-full bg-blue-600 transition-all duration-300 ${step > s.n ? 'w-full' : 'w-0'}`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Contenu ── */}
              <div className="px-6 pb-2 max-h-[56vh] overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{opacity:0, x:12}} animate={{opacity:1, x:0}}
                    exit={{opacity:0, x:-12}} transition={{duration:0.18}}
                    className="space-y-4 py-2"
                  >

                    {/* ── ÉTAPE 1 : Identité ── */}
                    {step === 1 && (
                      <>
                        <div>
                          <label className={labelClass}>Civilité *</label>
                          <select value={form.civilite} onChange={e => upd('civilite', e.target.value)} className={inputClass}>
                            <option value="">Sélectionner</option>
                            <option>Dr</option><option>Pr</option><option>Mme</option><option>M</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Nom *</label>
                          <input type="text" value={form.nom} onChange={e => upd('nom', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Prénom *</label>
                          <input type="text" value={form.prenom} onChange={e => upd('prenom', e.target.value)} className={inputClass} />
                        </div>

                        {/* Photo */}
                        <div>
                          <label className={labelClass}>Photo de profil</label>
                          <div className="flex items-center gap-4">
                            {photoPreview ? (
                              <div className="relative shrink-0">
                                <img src={photoPreview} alt="Aperçu" className="w-14 h-14 rounded-full object-cover border-2 border-blue-500" />
                                <button type="button" onClick={() => { setPhotoPreview(null); upd('photoProfil', null); photoRef.current.value=''; }}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="w-14 h-14 bg-(--sf3) rounded-full flex items-center justify-center border-2 border-dashed border-(--ln2) shrink-0">
                                <Camera className="w-5 h-5 text-(--t4)" />
                              </div>
                            )}
                            <label className="flex items-center gap-2 px-3 py-2 border border-(--ln) rounded-xl hover:bg-(--sf2) text-sm text-(--t2) transition-colors cursor-pointer">
                              <Upload className="w-4 h-4" />
                              {photoPreview ? 'Changer' : 'Télécharger'}
                              <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                            </label>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── ÉTAPE 2 : Pratique ── */}
                    {step === 2 && (
                      <>
                        <div>
                          <label className={labelClass}>Spécialité *</label>
                          <select value={form.specialite} onChange={e => upd('specialite', e.target.value)} className={inputClass}>
                            <option>Pneumologie</option>
                            <option>Médecine générale</option>
                            <option>Cardiologie</option>
                            <option>Pédiatrie</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Numéro RPPS *</label>
                          <input type="text" value={form.numeroRPPS} onChange={e => upd('numeroRPPS', e.target.value)}
                            placeholder="12345678901" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Établissement *</label>
                          <input type="text" value={form.etablissement} onChange={e => upd('etablissement', e.target.value)}
                            placeholder="Hôpital ou cabinet" className={inputClass} />
                        </div>
                      </>
                    )}

                    {/* ── ÉTAPE 3 : Documents ── */}
                    {step === 3 && (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-(--t1)">Pièces justificatives</p>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            docsOk
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {uploadedCount}/{DOCUMENTS_REQUIS.length} uploadé{uploadedCount > 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-xs text-(--t4) -mt-1">
                          PDF, JPG, PNG — max {MAX_MB} Mo par fichier. Tous les documents sont obligatoires.
                        </p>

                        <div className="space-y-2">
                          {DOCUMENTS_REQUIS.map(doc => {
                            const uploaded = documents[doc.id];
                            const hasErr   = errors[doc.id];
                            const inputId  = `file-input-${doc.id}-${inputKeys[doc.id] || 0}`;
                            return (
                              <div key={doc.id} className={`rounded-xl border p-3 transition-colors ${
                                uploaded ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-900/10'
                                : hasErr  ? 'border-red-300 bg-red-50/60 dark:border-red-800 dark:bg-red-900/10'
                                          : 'border-(--ln) bg-(--sf2)'
                              }`}>
                                <div className="flex items-center gap-2">
                                  {/* Indicateur */}
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                    uploaded ? 'bg-emerald-500' : 'bg-(--sf3)'
                                  }`}>
                                    {uploaded
                                      ? <CheckCircle className="w-3 h-3 text-white" />
                                      : <span className="text-[10px] text-(--t4) font-bold">?</span>
                                    }
                                  </div>

                                  {/* Label */}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-(--t1) leading-tight">{doc.label}</p>
                                    {hasErr && <p className="text-[10px] text-red-500 mt-0.5">{hasErr}</p>}
                                    {uploaded && (
                                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                                        ✓ {uploaded.name} ({(uploaded.size/1024/1024).toFixed(1)} Mo)
                                      </p>
                                    )}
                                  </div>

                                  {/* Bouton upload (LABEL natif — pas de .click() JS) */}
                                  <label
                                    htmlFor={inputId}
                                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                                      uploaded
                                        ? 'border border-(--ln2) text-(--t3) hover:bg-(--sf3)'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                  >
                                    <Upload className="w-3 h-3" />
                                    {uploaded ? 'Remplacer' : 'Choisir'}
                                  </label>
                                  <input
                                    key={inputId}
                                    id={inputId}
                                    type="file"
                                    accept={doc.accept}
                                    onChange={e => handleDoc(doc.id, e)}
                                    className="hidden"
                                  />

                                  {/* Supprimer */}
                                  {uploaded && (
                                    <button type="button" onClick={() => removeDoc(doc.id)}
                                      className="p-1 text-red-400 hover:text-red-600 transition-colors shrink-0">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {docsOk && (
                          <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                              Tous les documents sont prêts. Cliquez sur Suivant.
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* ── ÉTAPE 4 : Accès & Engagement ── */}
                    {step === 4 && (
                      <>
                        <div>
                          <label className={labelClass}>Email professionnel *</label>
                          <input type="email" value={form.emailPro} onChange={e => upd('emailPro', e.target.value)}
                            placeholder="nom@hopital.cm" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Mot de passe *</label>
                          <input type="password" value={form.motDePasse} onChange={e => upd('motDePasse', e.target.value)}
                            placeholder="••••••••" className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Confirmation du mot de passe *</label>
                          <input type="password" value={form.confirmationMdp} onChange={e => upd('confirmationMdp', e.target.value)}
                            placeholder="••••••••" className={inputClass} />
                        </div>

                        <div className="space-y-3 pt-1">
                          {[
                            { k: 'cgu',            label: "J'accepte les Conditions Générales d'Utilisation" },
                            { k: 'confidentialite', label: "J'accepte la Politique de confidentialité" },
                            { k: 'donnees',         label: "J'accepte le traitement des données de santé" },
                          ].map(({ k, label }) => (
                            <label key={k} className="flex items-start gap-3 cursor-pointer group">
                              <input type="checkbox" checked={form[k]} onChange={e => upd(k, e.target.checked)}
                                className="w-4 h-4 mt-0.5 text-blue-600 rounded border-(--ln) bg-(--sf2) focus:ring-blue-500 shrink-0" />
                              <span className="text-xs text-(--t2) group-hover:text-(--t1) transition-colors leading-relaxed">{label}</span>
                            </label>
                          ))}
                        </div>

                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900">
                          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                            <strong>ℹ️</strong> Un administrateur examinera vos documents sous <strong>24–48h</strong>.
                            Vous recevrez un email avec votre lien de connexion si votre dossier est validé.
                          </p>
                        </div>
                      </>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Footer ── */}
              <div className="px-6 py-4 border-t border-(--ln)">
                <div className="flex items-center justify-between">
                  {step > 1 ? (
                    <button onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-1 px-4 py-2 border border-(--ln) text-(--t2) rounded-xl hover:bg-(--sf2) text-sm transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Précédent
                    </button>
                  ) : <div />}

                  {step === 3 && !docsOk && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      {DOCUMENTS_REQUIS.length - uploadedCount} document(s) manquant(s)
                    </p>
                  )}

                  {step < 4 ? (
                    <button onClick={() => setStep(s => s + 1)}
                      disabled={step === 3 && !docsOk}
                      className="flex items-center gap-1 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed ml-auto text-sm transition-colors">
                      Suivant <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={() => setShowConfirmation(true)}
                      disabled={!form.cgu || !form.confidentialite || !form.donnees}
                      className="px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed ml-auto text-sm transition-colors">
                      Soumettre ma demande
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmationModal isOpen={showConfirmation} onClose={() => { setShowConfirmation(false); onClose(); reset(); }} />
    </>
  );
}
