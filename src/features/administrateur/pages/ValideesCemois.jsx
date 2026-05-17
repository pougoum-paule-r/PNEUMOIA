import React, { useState } from "react";
import useAdminTheme from "../hooks/useAdminTheme";
import useAdminNotificationCount from "../hooks/useAdminNotificationCount";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const MOCK_VALIDEES = [
  {
    id: 1,
    initials: "AS",
    name: "Dr. Aminata Sow",
    specialite: "Pneumologue",
    hopital: "H. Laquintinie, Douala",
    ville: "Douala",
    email: "aminata.sow@pneumo.cm",
    telephone: "+237 6 99 00 11 22",
    cnom: "CM-2024-1122",
    dateCreation: "12/01/2024",
    dateValidation: "Auj. 11:30",
    dateValidationComplete: "15/01/2024",
    validePar: "Super Admin",
    patientsActifs: 134,
    consultationsTotales: 4821,
    concordanceIA: 88,
    rangCommunaute: "#7/38",
    casPartages: 247,
  },
  {
    id: 2,
    initials: "FK",
    name: "Dr. Fatou Konate",
    specialite: "Pneumologue",
    hopital: "H. Central, Bafoussam",
    ville: "Bafoussam",
    email: "fatou.konate@hcb.cm",
    telephone: "+237 6 87 20 05 10",
    cnom: "CM-2022-0765",
    dateCreation: "10/03/2024",
    dateValidation: "19 mars",
    dateValidationComplete: "15/03/2024",
    validePar: "Super Admin",
    patientsActifs: 87,
    consultationsTotales: 2340,
    concordanceIA: 82,
    rangCommunaute: "#14/38",
    casPartages: 128,
  },
  {
    id: 3,
    initials: "MB",
    name: "Dr. Martin Biya",
    specialite: "Pneumologue",
    hopital: "Clinique Bleue, Douala",
    ville: "Douala",
    email: "martin.biya@pneumo.cm",
    telephone: "+237 6 73 10 44 88",
    cnom: "CM-2021-0543",
    dateCreation: "01/06/2021",
    dateValidation: "16 mars",
    dateValidationComplete: "10/06/2021",
    validePar: "Super Admin",
    patientsActifs: 210,
    consultationsTotales: 6100,
    concordanceIA: 91,
    rangCommunaute: "#3/38",
    casPartages: 389,
  },
];

const RAISONS_SUSPENSION = [
  "Informations CNOM incorrectes",
  "Activité suspecte",
  "Demande du médecin",
  "Non-conformité aux CGU",
  "Vérification en cours",
];

const DUREES_SUSPENSION = ["7 jours", "15 jours", "30 jours", "Indéfinie"];

// ─── Modale Profil ────────────────────────────────────────────────────────────
function ModalProfil({ doc, darkMode, onClose, onSuspendre, onSupprimer }) {
  if (!doc) return null;

  const card = `rounded-xl border p-4 ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}`;
  const label = `text-xs font-medium uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`;
  const value = `text-sm ${darkMode ? "text-gray-100" : "text-gray-800"}`;
  const rowClass = `flex items-center justify-between py-2 border-b last:border-0 ${darkMode ? "border-gray-700" : "border-gray-100"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${darkMode ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <h2 className="text-base font-semibold">Profil — {doc.name}</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Hero */}
          <div className={`${card} flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-base flex-shrink-0">
                {doc.initials}
              </div>
              <div>
                <p className="font-semibold text-base">{doc.name}</p>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{doc.specialite} · {doc.hopital}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-medium">Actif</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">CNOM vérifié</span>
                </div>
              </div>
            </div>
            <div className={`text-right text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} space-y-1`}>
              <p>Compte créé le</p>
              <p className="text-sm font-semibold text-teal-500">{doc.dateCreation}</p>
              <p>Validé le</p>
              <p className="text-sm font-semibold text-teal-500">{doc.dateValidationComplete}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Patients actifs", value: doc.patientsActifs, color: false },
              { label: "Consultations totales", value: doc.consultationsTotales, color: false },
              { label: "Concordance IA", value: `${doc.concordanceIA}%`, color: true },
            ].map((s) => (
              <div key={s.label} className={`${card} text-center`}>
                <p className={`text-2xl font-bold ${s.color ? "text-teal-500" : (darkMode ? "text-white" : "text-gray-900")}`}>{s.value}</p>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Infos + Activité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Informations du compte */}
            <div>
              <p className={`${label} mb-3`}>Informations du compte</p>
              <div className={`rounded-xl border overflow-hidden ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                {[
                  { k: "N° CNOM", v: doc.cnom, blue: true },
                  { k: "E-mail", v: doc.email },
                  { k: "Téléphone", v: doc.telephone },
                  { k: "Établissement", v: doc.hopital },
                  { k: "Ville", v: doc.ville },
                  { k: "Rang communauté", v: doc.rangCommunaute },
                  { k: "Cas partagés", v: `${doc.casPartages} cas publiés` },
                  { k: "Statut compte", v: "Actif", green: true },
                ].map(({ k, v, blue, green }) => (
                  <div key={k} className={`${rowClass} px-3`}>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{k}</span>
                    <span className={`text-xs font-medium ${blue ? "text-blue-500" : green ? "text-teal-500" : (darkMode ? "text-gray-200" : "text-gray-800")}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activité récente */}
            <div>
              <p className={`${label} mb-3`}>Activité récente</p>
              <div className={`rounded-xl border overflow-hidden ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                {[
                  { text: "Consultation #247 enregistrée", time: "Auj. 14:22" },
                  { text: "Cas #241 partagé sur la communauté", time: "Hier" },
                  { text: "Accès accordé à Dr. Martin", time: "Il y a 3j" },
                  { text: "3 consultations — Pneumonie", time: "15 mars" },
                ].map(({ text, time }) => (
                  <div key={text} className={`${rowClass} px-3 gap-2`}>
                    <span className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{text}</span>
                    <span className={`text-xs whitespace-nowrap ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className={`flex justify-end gap-3 px-6 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <button onClick={onClose} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
            Fermer
          </button>
          <button onClick={onSuspendre} className="px-4 py-2 rounded-xl border border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100 text-sm font-medium transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            Suspendre
          </button>
          <button onClick={onSupprimer} className="px-4 py-2 rounded-xl border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 text-sm font-medium transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modale Suspendre ─────────────────────────────────────────────────────────
function ModalSuspendre({ doc, darkMode, onClose, onConfirm }) {
  const [raison, setRaison] = useState("");
  const [duree, setDuree] = useState("30 jours");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState(false);

  if (!doc) return null;

  const handleConfirm = () => {
    if (!raison) { setErreur(true); return; }
    onConfirm({ raison, duree, message });
  };

  const inputClass = `w-full rounded-xl border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 ${
    darkMode ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl ${darkMode ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <h2 className="text-base font-semibold">Suspendre l'accès</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Alerte */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-800">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span><strong className="text-red-700">ce médecin</strong> ne pourra plus se connecter. La raison est enregistrée dans le journal d'audit.</span>
          </div>

          {/* Raison */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Raison de la suspension <span className="text-red-500">*</span>
            </label>
            <select
              value={raison}
              onChange={(e) => { setRaison(e.target.value); setErreur(false); }}
              className={`${inputClass} ${erreur ? "border-red-400 ring-1 ring-red-400" : ""}`}
            >
              <option value="">— Choisir une raison —</option>
              {RAISONS_SUSPENSION.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {erreur && <p className="text-xs text-red-500 mt-1">Veuillez choisir une raison.</p>}
          </div>

          {/* Durée */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Durée de suspension</label>
            <select value={duree} onChange={(e) => setDuree(e.target.value)} className={inputClass}>
              {DUREES_SUSPENSION.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Message au médecin (optionnel)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Informations supplémentaires envoyées par e-mail…"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-3 px-6 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <button onClick={onClose} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
            Annuler
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
            Confirmer la suspension
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modale Supprimer ─────────────────────────────────────────────────────────
function ModalSupprimer({ doc, darkMode, onClose, onConfirm }) {
  if (!doc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl ${darkMode ? "bg-gray-950 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <h2 className="text-base font-semibold">Supprimer le compte</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-6 space-y-3">
          {/* Alerte principale */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-800">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>Supprimer définitivement le compte de <strong className="text-red-700">{doc.name}</strong> ? Toutes ses données seront effacées de la plateforme.</span>
          </div>

          {/* Alerte secondaire */}
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            <svg className="flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Cette action est irréversible.
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end gap-3 px-6 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <button onClick={onClose} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
            Annuler
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ValideesCemois() {
  const { darkMode, setDarkMode } = useAdminTheme();
  const [activeKey, setActiveKey] = useState("validees");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [rows, setRows] = useState(MOCK_VALIDEES);
  const { setCount: setGlobalNotificationCount } = useAdminNotificationCount();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modal, setModal] = useState(null); // null | "profil" | "suspendre" | "supprimer"

  React.useEffect(() => {
    setGlobalNotificationCount(0);
  }, [setGlobalNotificationCount]);

  const openProfil = (doc) => { setSelectedDoc(doc); setModal("profil"); };
  const closeAll = () => { setModal(null); setSelectedDoc(null); };

  const handleSuspendre = ({ raison, duree, message }) => {
    // Ici vous pouvez appeler votre API
    console.log("Suspension:", { doc: selectedDoc?.name, raison, duree, message });
    setRows((prev) => prev.filter((d) => d.id !== selectedDoc?.id));
    closeAll();
  };

  const handleSupprimer = () => {
    // Ici vous pouvez appeler votre API
    console.log("Suppression:", selectedDoc?.name);
    setRows((prev) => prev.filter((d) => d.id !== selectedDoc?.id));
    closeAll();
  };

  const handleExportCSV = () => {
    const headers = ["Nom", "CNOM", "Spécialité", "Établissement", "Ville", "Email", "Téléphone", "Date Validation", "Validé par"];
    const csvRows = rows.map((d) => [d.name, d.cnom, d.specialite, d.hopital, d.ville, d.email, d.telephone, d.dateValidation, d.validePar]);
    const csv = [headers, ...csvRows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `validees_ce_mois_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className={`min-h-screen flex admin-theme transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar activeKey={activeKey} setActiveKey={setActiveKey} darkMode={darkMode} isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Validées ce mois</h1>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Liste des médecins dont l'inscription a été validée ce mois-ci.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                darkMode
                  ? "border-gray-700 text-gray-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>

          {/* Info box */}
          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${darkMode ? "bg-teal-900/20 border-teal-700/40 text-teal-200" : "bg-teal-50 border-teal-200 text-teal-700"}`}>
            Total validé ce mois : <span className="font-semibold">{rows.length} médecins</span>
          </div>

          {/* Tableau */}
          <div className={`rounded-2xl border overflow-hidden ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "bg-gray-900 border-b border-gray-800" : "bg-gray-50 border-b border-gray-200"}>
                  <th className="px-6 py-4 text-left font-medium">Médecin</th>
                  <th className="px-6 py-4 text-left font-medium">Spécialité</th>
                  <th className="px-6 py-4 text-left font-medium">CNOM</th>
                  <th className="px-6 py-4 text-left font-medium">Établissement</th>
                  <th className="px-6 py-4 text-left font-medium">Validé le</th>
                  <th className="px-6 py-4 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                {rows.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`transition-colors cursor-pointer ${darkMode ? "hover:bg-gray-800/70" : "hover:bg-gray-50"}`}
                    onClick={() => openProfil(doc)}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                          {doc.initials}
                        </div>
                        <div>
                          <p className="font-semibold">{doc.name}</p>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">{doc.specialite}</td>
                    <td className="px-6 py-5 font-mono text-sm">{doc.cnom}</td>
                    <td className="px-6 py-5">{doc.hopital}</td>
                    <td className="px-6 py-5">{doc.dateValidation}</td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); openProfil(doc); }}
                        className={`px-5 py-2 text-sm font-medium rounded-xl border transition-all ${
                          darkMode
                            ? "border-gray-700 hover:bg-gray-800 text-gray-200"
                            : "border-gray-300 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        Voir profil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {rows.length === 0 && (
            <div className={`mt-8 rounded-2xl border p-12 text-center ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Aucune validation ce mois-ci.</p>
            </div>
          )}
        </main>
      </div>

      {/* Modales */}
      {modal === "profil" && (
        <ModalProfil
          doc={selectedDoc}
          darkMode={darkMode}
          onClose={closeAll}
          onSuspendre={() => setModal("suspendre")}
          onSupprimer={() => setModal("supprimer")}
        />
      )}
      {modal === "suspendre" && (
        <ModalSuspendre
          doc={selectedDoc}
          darkMode={darkMode}
          onClose={() => setModal("profil")}
          onConfirm={handleSuspendre}
        />
      )}
      {modal === "supprimer" && (
        <ModalSupprimer
          doc={selectedDoc}
          darkMode={darkMode}
          onClose={() => setModal("profil")}
          onConfirm={handleSupprimer}
        />
      )}
    </div>
  );
}