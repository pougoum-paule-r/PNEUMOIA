import React, { useState } from "react";
import RefusModal from "./RefusModal";

const inscriptions = [
  {
    id: 1, initials: "AS", name: "Dr. Aminata Sow", specialite: "Pneumologue",
    hopital: "H. Laquintinie, Douala", ville: "Douala", email: "a.sow@laquintinie.cm",
    telephone: "+237 677 111 222", cnom: "CM-2024-1122", soumisLe: "Auj. 08:00",
    docs: true, docsStatus: "✓", time: "Auj, 08:00", timeColor: "text-teal-500", status: "pending",
    documents: [
      { label: "Diplôme de pneumologie 2019", status: "verified" },
      { label: "Carte CNOM 2024", status: "verified" },
      { label: "Attestation d'exercice", status: "verified" },
    ],
  },
  {
    id: 2, initials: "PE", name: "Dr. Paul Essomba", specialite: "Pneumologue",
    hopital: "CHU de Yaoundé", ville: "Yaoundé", email: "p.essomba@chuy.cm",
    telephone: "+237 699 234 567", cnom: "CM-2023-0874", soumisLe: "Hier 14:22",
    docs: true, docsStatus: "⚠", time: "Hier 14:22", timeColor: "text-orange-400", status: "pending",
    documents: [
      { label: "Diplôme de pneumologie 2018", status: "verified" },
      { label: "Carte CNOM 2023", status: "pending" },
      { label: "Attestation d'exercice", status: "verified" },
    ],
  },
  {
    id: 3, initials: "FK", name: "Dr. Fatou Konaté", specialite: "Pneumologue",
    hopital: "H. Central, Bafoussam", ville: "Bafoussam", email: "f.konate@hcb.cm",
    telephone: "+237 655 789 012", cnom: "CM-2024-0311", soumisLe: "Il y a 2j",
    docs: true, docsStatus: "✓", time: "Il y a 2j", timeColor: "text-gray-400", status: "pending",
    documents: [
      { label: "Diplôme de pneumologie 2020", status: "verified" },
      { label: "Carte CNOM 2024", status: "verified" },
      { label: "Attestation d'exercice", status: "verified" },
    ],
  },
  {
    id: 4, initials: "MB", name: "Dr. Michel Biya", specialite: "Radiologue",
    hopital: "Clinique de l'Estuaire, Libreville", ville: "Libreville", email: "m.biya@estuaire.ga",
    telephone: "+241 077 456 789", cnom: "GA-2024-0099", soumisLe: "Il y a 3j",
    docs: false, docsStatus: "✗", time: "Il y a 3j", timeColor: "text-gray-400", status: "pending",
    documents: [
      { label: "Diplôme de radiologie 2021", status: "missing" },
      { label: "Carte CNOM 2024", status: "missing" },
    ],
  },
];

const avatarColors = ["bg-teal-600", "bg-blue-600", "bg-purple-600", "bg-orange-600"];

function DossierModal({ doc, darkMode, onClose, onValidate, onRefuse }) {
  const [activeDoc, setActiveDoc] = useState(doc.documents[0]?.label ?? null);
  const docStatusColor = { verified: "text-teal-500", pending: "text-orange-400", missing: "text-red-400" };
  const docStatusLabel = { verified: "Reçu et vérifiable", pending: "En attente de vérification", missing: "Document manquant" };
  const docStatusIcon = { verified: "✓", pending: "⚠", missing: "✗" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <div className={`px-6 pt-6 pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-base">Dossier d'inscription — {doc.name}</h2>
              <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{doc.specialite} · {doc.hopital}</p>
            </div>
            <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className={`rounded-xl p-4 flex items-center gap-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColors[inscriptions.findIndex(i => i.id === doc.id) % avatarColors.length]}`}>
              {doc.initials}
            </div>
            <div>
              <p className="font-bold text-sm">{doc.name}</p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{doc.specialite} · {doc.hopital}</p>
              <p className="text-xs text-teal-500 mt-1">✓ Dossier {doc.docsStatus === "✓" ? "complet" : doc.docsStatus === "⚠" ? "incomplet" : "manquant"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Informations personnelles</p>
              <div className={`rounded-xl overflow-hidden border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                {[
                  { label: "N° CNOM", value: doc.cnom, highlight: true },
                  { label: "E-mail", value: doc.email },
                  { label: "Téléphone", value: doc.telephone },
                  { label: "Établissement", value: doc.hopital },
                  { label: "Ville", value: doc.ville },
                  { label: "Soumis le", value: doc.soumisLe },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center px-3 py-2 text-xs ${i % 2 === 0 ? darkMode ? "bg-gray-800/60" : "bg-gray-50/60" : darkMode ? "bg-gray-800/20" : "bg-white"}`}>
                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>{row.label}</span>
                    <span className={`font-medium ${row.highlight ? "text-teal-500" : darkMode ? "text-white" : "text-gray-800"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Vérification des documents</p>
              <div className="space-y-2">
                {doc.documents.map((d, i) => (
                  <button key={i} onClick={() => setActiveDoc(d.label)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${activeDoc === d.label ? darkMode ? "border-teal-500/50 bg-teal-900/20" : "border-teal-300 bg-teal-50" : darkMode ? "border-gray-700 bg-gray-800/40 hover:bg-gray-800" : "border-gray-100 bg-gray-50 hover:bg-gray-100"}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={darkMode ? "text-gray-400" : "text-gray-400"}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${darkMode ? "text-white" : "text-gray-800"}`}>{d.label}</p>
                      <p className={`text-[10px] ${docStatusColor[d.status]}`}>{docStatusIcon[d.status]} {docStatusLabel[d.status]}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>Visualiser</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className={`text-[10px] uppercase tracking-widest font-semibold mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Justificatifs soumis — prévisualisation</p>
            <div className={`rounded-xl border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
              <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? "border-gray-700 bg-gray-800/40" : "border-gray-100 bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span className={`text-xs font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{activeDoc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-teal-500 font-medium">✓ Vérifié</span>
                  <button className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"}`}>Ouvrir</button>
                </div>
              </div>
              <div className={`h-32 flex flex-col items-center justify-center gap-2 ${darkMode ? "bg-gray-800/20" : "bg-gray-50/50"}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={darkMode ? "text-gray-600" : "text-gray-300"}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Aperçu du document PDF — cliquez sur "Ouvrir" pour visualiser et télécharger</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <button onClick={onClose} className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"}`}>Fermer</button>
          <button onClick={() => { onRefuse(doc); onClose(); }} className="text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Refuser ce dossier
          </button>
          <button onClick={() => { onValidate(doc.id); onClose(); }} className="text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Valider l'inscription
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InscriptionsUrgentes({ darkMode }) {
  const [items, setItems] = useState(inscriptions);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [refusDoc, setRefusDoc] = useState(null); // ← nouveau

  const handleAction = (id, action) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, status: action } : item));
  };

  // Ouvre la modal de refus (depuis la liste ou depuis DossierModal)
  const openRefus = (doc) => {
    setSelectedDossier(null); // ferme DossierModal si ouverte
    setRefusDoc(doc);
  };

  const handleConfirmRefus = ({ motif, message }) => {
    handleAction(refusDoc.id, "refused");
    setRefusDoc(null);
    // Ici vous pourriez envoyer motif+message à votre API
    console.log("Refus confirmé:", { doctorId: refusDoc.id, motif, message });
  };

  const pending = items.filter((i) => i.status === "pending");
  const visiblePending = pending.slice(0, 2);

  return (
    <>
      <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b flex items-center justify-between ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div>
            <h2 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>Inscriptions urgentes</h2>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>En attente de décision</p>
          </div>
          <button className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            Tout traiter
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Liste */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {pending.length === 0 ? (
            <div className="py-12 text-center">
              <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>✓ Toutes les inscriptions ont été traitées</p>
            </div>
          ) : (
            visiblePending.map((doc, idx) => (
              <div key={doc.id} className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 transition-colors ${darkMode ? "hover:bg-gray-750 border-gray-700" : "hover:bg-gray-50/60 border-gray-100"} border-b last:border-b-0`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                    {doc.initials}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-gray-900"}`}>{doc.name}</p>
                    <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-400"}`}>{doc.specialite} · {doc.hopital}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-12 sm:ml-0 sm:mr-4">
                  <span className={`text-xs ${doc.docsStatus === "✓" ? "text-teal-500" : doc.docsStatus === "⚠" ? "text-orange-400" : "text-red-400"}`}>
                    Docs {doc.docsStatus}
                  </span>
                  <span className={`text-xs ${doc.timeColor}`}>{doc.time}</span>
                </div>
                <div className="flex items-center gap-2 ml-12 sm:ml-0 flex-shrink-0">
                  <button onClick={() => handleAction(doc.id, "validated")} className="text-xs font-semibold text-teal-600 border border-teal-300 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Valider
                  </button>
                  <button onClick={() => setSelectedDossier(doc)} className={`text-xs font-medium border px-3 py-1.5 rounded-lg transition-colors ${darkMode ? "text-gray-300 border-gray-600 hover:bg-gray-700" : "text-gray-500 border-gray-200 hover:bg-gray-50"}`}>
                    Voir dossier
                  </button>
                  {/* ✅ Refuser → ouvre RefusModal */}
                  <button onClick={() => openRefus(doc)} className="text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Refuser
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal dossier */}
      {selectedDossier && (
        <DossierModal
          doc={selectedDossier}
          darkMode={darkMode}
          onClose={() => setSelectedDossier(null)}
          onValidate={(id) => handleAction(id, "validated")}
          onRefuse={openRefus}
        />
      )}

      {/* ✅ Modal refus */}
      {refusDoc && (
        <RefusModal
          doctorName={refusDoc.name}
          darkMode={darkMode}
          onClose={() => setRefusDoc(null)}
          onConfirm={handleConfirmRefus}
        />
      )}
    </>
  );
}
