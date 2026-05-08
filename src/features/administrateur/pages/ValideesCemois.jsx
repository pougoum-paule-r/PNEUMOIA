import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MOCK_VALIDEES = [
  {
    id: 1,
    initiales: "AS",
    nom: "Dr. Aminata Sow",
    specialite: "Pneumologue",
    cnom: "CM-2024-1122",
    etablissement: "H. Laquintinie, Douala",
    ville: "Douala",
    dateDemande: "Auj. 08:00",
    dateValidation: "Auj. 11:30",
    validePar: "Super Admin",
    email: "aminata.sow@pneumo.cm",
    telephone: "+237 6 99 00 11 22",
  },
  {
    id: 2,
    initiales: "FK",
    nom: "Dr. Fatou Konate",
    specialite: "Pneumologue",
    cnom: "CM-2022-0765",
    etablissement: "H. Central, Bafoussam",
    ville: "Bafoussam",
    dateDemande: "18 mars",
    dateValidation: "19 mars",
    validePar: "Super Admin",
    email: "fatou.konate@pneumo.cm",
    telephone: "+237 6 87 20 05 10",
  },
  {
    id: 3,
    initiales: "MB",
    nom: "Dr. Martin Biya",
    specialite: "Pneumologue",
    cnom: "CM-2021-0543",
    etablissement: "Clinique Bleue, Douala",
    ville: "Douala",
    dateDemande: "15 mars",
    dateValidation: "16 mars",
    validePar: "Super Admin",
    email: "martin.biya@pneumo.cm",
    telephone: "+237 6 73 10 44 88",
  },
];

function Avatar({ initiales, darkMode }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        darkMode ? "bg-gray-700 text-gray-300" : "bg-teal-700 text-white"
      }`}
    >
      {initiales}
    </div>
  );
}

function exportValideesCSV(rows) {
  const headers = [
    "Medecin",
    "Specialite",
    "CNOM",
    "Etablissement",
    "Ville",
    "Date demande",
    "Date validation",
    "Valide par",
  ];

  const lines = rows.map((r) => [
    r.nom,
    r.specialite,
    r.cnom,
    r.etablissement,
    r.ville,
    r.dateDemande,
    r.dateValidation,
    r.validePar,
  ]);

  const csv = [headers, ...lines]
    .map((line) => line.map((v) => `"${String(v).replaceAll("\"", "\"\"")}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "inscriptions-validees-ce-mois.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function ProfilModal({ medecin, onClose, darkMode }) {
  const stats = medecin.stats ?? {
    patientsActifs: 134,
    consultationsTotales: 4821,
    concordanceIA: "88%",
  };
  const activites = medecin.activites ?? [
    { libelle: "Consultation #247 enregistree", date: "Auj. 14:22" },
    { libelle: "Cas #241 partage sur la communaute", date: "Hier" },
    { libelle: `Acces accorde a ${medecin.nom}`, date: "Il y a 3j" },
    { libelle: "3 consultations - Pneumonie", date: "15 mars" },
  ];
  const compteCreeLe = medecin.compteCreeLe ?? "12/06/2024";
  const valideLe = medecin.valideLe ?? "15/06/2024";
  const rangCommunaute = medecin.rangCommunaute ?? "#7/38";
  const casPartages = medecin.casPartages ?? "247 cas publies";

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[3px]" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none">
        <div
          className={`w-full max-w-3xl rounded-2xl border shadow-2xl pointer-events-auto overflow-hidden ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-[#bfd8e2]"
          }`}
        >
          <div className={`flex items-center justify-between px-5 sm:px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <h2 className={`text-base font-bold ${darkMode ? "text-gray-100" : "text-[#1c2b33]"}`}>
              Profil - {medecin.nom}
            </h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-800 text-gray-400"
                  : "border-[#bfd8e2] hover:bg-[#eef7fb] text-[#6a8b9a]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="max-h-[66vh] overflow-y-auto px-4 sm:px-5 py-3 space-y-3">
            <div className={`rounded-xl border p-3 ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-[#bfd8e2] bg-[#f4fbfe]"}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-teal-700 text-white text-3xl font-bold flex items-center justify-center">
                    {medecin.initiales}
                  </div>
                  <div>
                    <p className={`text-xl font-bold leading-tight ${darkMode ? "text-gray-100" : "text-[#1b2d36]"}`}>{medecin.nom}</p>
                    <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#7193a5]"}`}>
                      {medecin.specialite} - {medecin.etablissement}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-100 text-green-700">Actif</span>
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-cyan-100 text-cyan-700">CNOM verifie</span>
                    </div>
                  </div>
                </div>

                <div className="md:text-right">
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>Compte cree le</p>
                  <p className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-[#1b2d36]"}`}>{compteCreeLe}</p>
                  <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>Valide le</p>
                  <p className="text-xl font-semibold text-emerald-600">{valideLe}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`rounded-xl border p-3.5 text-center ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-[#bfd8e2] bg-[#f4fbfe]"}`}>
                <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-[#1b2d36]"}`}>{stats.patientsActifs}</p>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>Patients actifs</p>
              </div>
              <div className={`rounded-xl border p-3.5 text-center ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-[#bfd8e2] bg-[#f4fbfe]"}`}>
                <p className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-[#1b2d36]"}`}>{stats.consultationsTotales}</p>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>Consultations totales</p>
              </div>
              <div className={`rounded-xl border p-3.5 text-center ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-[#bfd8e2] bg-[#f4fbfe]"}`}>
                <p className="text-3xl font-bold text-emerald-600">{stats.concordanceIA}</p>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>Concordance IA</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <p className={`text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-[#7293a4]"}`}>INFORMATIONS DU COMPTE</p>
                <div className={`rounded-xl border overflow-hidden ${darkMode ? "border-gray-700" : "border-[#bfd8e2]"}`}>
                  {[
                    ["N CNOM", medecin.cnom],
                    ["E-mail", medecin.email],
                    ["Telephone", medecin.telephone],
                    ["Etablissement", medecin.etablissement],
                    ["Ville", medecin.ville],
                    ["Rang communaute", rangCommunaute],
                    ["Cas partages", casPartages],
                    ["Statut compte", "Actif"],
                  ].map(([label, value], idx) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-4 py-3 ${
                        idx !== 7 ? (darkMode ? "border-b border-gray-700" : "border-b border-[#bfd8e2]") : ""
                      }`}
                    >
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>{label}</p>
                      {label === "Statut compte" ? (
                        <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-100 text-green-700">Actif</span>
                      ) : (
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-[#1b2d36]"}`}>{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={`text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-[#7293a4]"}`}>ACTIVITE RECENTE</p>
                <div className={`rounded-xl border overflow-hidden ${darkMode ? "border-gray-700" : "border-[#bfd8e2]"}`}>
                  {activites.map((item, idx) => (
                    <div
                      key={`${item.libelle}-${idx}`}
                      className={`flex items-center justify-between gap-3 px-4 py-3 ${
                        idx !== activites.length - 1 ? (darkMode ? "border-b border-gray-700" : "border-b border-[#bfd8e2]") : ""
                      }`}
                    >
                      <p className={`text-sm ${darkMode ? "text-gray-200" : "text-[#1b2d36]"}`}>{item.libelle}</p>
                      <p className={`text-sm whitespace-nowrap ${darkMode ? "text-gray-400" : "text-[#7293a4]"}`}>{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`px-5 sm:px-6 py-3 border-t flex flex-wrap items-center justify-end gap-2 ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                darkMode
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-[#bfd8e2] text-[#4f7080] hover:bg-[#eef7fb]"
              }`}
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={() => medecin.onSuspendRequest?.()}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
            >
              Suspendre
            </button>
            <button
              type="button"
              onClick={() => medecin.onDeleteRequest?.()}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-600 bg-red-50 hover:bg-red-100"
            >
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ConfirmationSuppressionModal({ medecin, onCancel, onConfirm, darkMode }) {
  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[3px]" onClick={onCancel} />

      <div className="fixed inset-0 z-[61] flex items-center justify-center p-3 pointer-events-none">
        <div
          className={`w-full max-w-lg rounded-2xl border shadow-2xl pointer-events-auto overflow-hidden ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-[#bfd8e2]"
          }`}
        >
          <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <h2 className={`text-base font-bold ${darkMode ? "text-gray-100" : "text-[#1c2b33]"}`}>Supprimer le compte</h2>
            <button
              onClick={onCancel}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-800 text-gray-400"
                  : "border-[#bfd8e2] hover:bg-[#eef7fb] text-[#6a8b9a]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="px-5 py-5 space-y-3">
            <div className={`rounded-xl border px-4 py-3 ${darkMode ? "bg-red-950/25 border-red-900/50 text-red-300" : "bg-red-50 border-red-200 text-red-500"}`}>
              <p className="text-sm leading-relaxed">
                Supprimer definitivement le compte de <span className="font-bold">{medecin.nom}</span> ? Toutes ses donnees seront effacees de la plateforme.
              </p>
            </div>

            <div className={`rounded-xl px-4 py-3 ${darkMode ? "bg-red-950/25 text-red-300" : "bg-red-50 text-red-500"}`}>
              <p className="text-sm">Cette action est irreversible.</p>
            </div>
          </div>

          <div className={`px-6 py-3 border-t flex items-center justify-end gap-3 ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#4f7080] hover:bg-[#eef7fb]"
              }`}
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-600 bg-red-50 hover:bg-red-100"
            >
              Supprimer definitivement
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SuspensionModal({ medecin, darkMode, onCancel, onConfirm }) {
  const [raison, setRaison] = useState("");
  const [duree, setDuree] = useState("30 jours");
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[3px]" onClick={onCancel} />

      <div className="fixed inset-0 z-[61] flex items-center justify-center p-3 pointer-events-none">
        <div
          className={`w-full max-w-xl rounded-2xl border shadow-2xl pointer-events-auto overflow-hidden ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-[#bfd8e2]"
          }`}
        >
          <div className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <h2 className={`text-base font-bold ${darkMode ? "text-gray-100" : "text-[#1c2b33]"}`}>Suspendre l'acces</h2>
            <button
              onClick={onCancel}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-800 text-gray-400"
                  : "border-[#bfd8e2] hover:bg-[#eef7fb] text-[#6a8b9a]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="px-5 py-5 space-y-3">
            <div className={`rounded-xl border px-4 py-3 ${darkMode ? "bg-red-950/25 border-red-900/50 text-red-300" : "bg-red-50 border-red-200 text-red-500"}`}>
              <p className="text-sm leading-relaxed">
                <span className="font-bold">ce medecin</span> ne pourra plus se connecter. La raison est enregistree dans le journal d'audit.
              </p>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-[#2f4450]"}`}>
                Raison de la suspension <span className="text-red-500">*</span>
              </label>
              <select
                value={raison}
                onChange={(e) => setRaison(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-[#9ec5d5] text-[#1b2d36]"
                }`}
              >
                <option value="">- Choisir une raison -</option>
                <option value="Comportement non conforme">Comportement non conforme</option>
                <option value="Documents non valides">Documents non valides</option>
                <option value="Signalement utilisateur">Signalement utilisateur</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-[#2f4450]"}`}>
                Duree de suspension
              </label>
              <select
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-[#9ec5d5] text-[#1b2d36]"
                }`}
              >
                <option>7 jours</option>
                <option>15 jours</option>
                <option>30 jours</option>
                <option>Indefinie</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-[#2f4450]"}`}>
                Message au medecin (optionnel)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Informations supplementaires envoyees par e-mail..."
                rows={4}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none resize-y ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
                    : "bg-white border-[#9ec5d5] text-[#1b2d36] placeholder:text-[#7a9aaa]"
                }`}
              />
            </div>
          </div>

          <div className={`px-6 py-3 border-t flex items-center justify-end gap-3 ${darkMode ? "border-gray-800" : "border-[#bfd8e2]"}`}>
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#4f7080] hover:bg-[#eef7fb]"
              }`}
            >
              Annuler
            </button>
            <button
              onClick={() => onConfirm({ medecin, raison, duree, message })}
              disabled={!raison}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer la suspension
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ValideesCemois({ darkMode: initialDarkMode }) {
  const [darkMode, setDarkMode] = useState(Boolean(initialDarkMode));
  const [activeKey, setActiveKey] = useState("validees");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState(null);
  const [medecinASupprimer, setMedecinASupprimer] = useState(null);
  const [medecinASuspendre, setMedecinASuspendre] = useState(null);
  const [rows, setRows] = useState(() => MOCK_VALIDEES);

  const pageCls = darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
  const cardCls = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const thCls = darkMode ? "bg-gray-800/80 text-gray-400" : "bg-gray-50 text-gray-500";
  const mutedCls = darkMode ? "text-gray-400" : "text-gray-500";
  const rowHover = darkMode ? "hover:bg-gray-800/60" : "hover:bg-gray-50";
  const divider = darkMode ? "divide-gray-800" : "divide-gray-100";

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${pageCls}`}>
      <Sidebar
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        darkMode={darkMode}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />

        <main className={`p-4 md:p-6 min-h-screen transition-colors duration-200 ${pageCls}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Inscriptions validees - Mars 2026</h1>
              <p className={`text-sm mt-0.5 ${mutedCls}`}>{rows.length} comptes medecins actives ce mois</p>
            </div>

            <button
              type="button"
              onClick={() => exportValideesCSV(rows)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                darkMode
                  ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1050px]">
                <thead>
                  <tr className={`text-xs border-b ${thCls} ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <th className="px-4 py-3 text-left font-semibold">Medecin</th>
                    <th className="px-4 py-3 text-left font-semibold">CNOM</th>
                    <th className="px-4 py-3 text-left font-semibold">Etablissement</th>
                    <th className="px-4 py-3 text-left font-semibold">Ville</th>
                    <th className="px-4 py-3 text-left font-semibold">Date demande</th>
                    <th className="px-4 py-3 text-left font-semibold">Date validation</th>
                    <th className="px-4 py-3 text-left font-semibold">Valide par</th>
                    <th className="px-4 py-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className={`divide-y ${divider}`}>
                  {rows.map((row) => (
                    <tr key={row.id} className={`transition-colors duration-100 ${rowHover}`}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar initiales={row.initiales} darkMode={darkMode} />
                          <div>
                            <p className="font-semibold text-sm">{row.nom}</p>
                            <p className={`text-xs ${mutedCls}`}>{row.specialite}</p>
                          </div>
                        </div>
                      </td>

                      <td className={`px-4 py-3.5 font-mono text-xs ${mutedCls}`}>{row.cnom}</td>
                      <td className="px-4 py-3.5 text-sm">{row.etablissement}</td>
                      <td className={`px-4 py-3.5 text-sm ${mutedCls}`}>{row.ville}</td>
                      <td className={`px-4 py-3.5 text-sm ${mutedCls}`}>{row.dateDemande}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-teal-600">{row.dateValidation}</td>
                      <td className="px-4 py-3.5 text-sm">{row.validePar}</td>
                      <td className="px-4 py-3.5 text-sm">
                        <button
                          type="button"
                          onClick={() => setSelectedMedecin(row)}
                          className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                            darkMode
                              ? "border-gray-600 text-gray-200 hover:bg-gray-800"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
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
          </div>

          {selectedMedecin && (
            <ProfilModal
              medecin={{
                ...selectedMedecin,
                onDeleteRequest: () => setMedecinASupprimer(selectedMedecin),
                onSuspendRequest: () => setMedecinASuspendre(selectedMedecin),
              }}
              darkMode={darkMode}
              onClose={() => setSelectedMedecin(null)}
            />
          )}

          {medecinASupprimer && (
            <ConfirmationSuppressionModal
              medecin={medecinASupprimer}
              darkMode={darkMode}
              onCancel={() => setMedecinASupprimer(null)}
              onConfirm={() => {
                setRows((prev) => prev.filter((item) => item.id !== medecinASupprimer.id));
                setMedecinASupprimer(null);
                setSelectedMedecin(null);
              }}
            />
          )}

          {medecinASuspendre && (
            <SuspensionModal
              medecin={medecinASuspendre}
              darkMode={darkMode}
              onCancel={() => setMedecinASuspendre(null)}
              onConfirm={() => {
                setMedecinASuspendre(null);
                setSelectedMedecin(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
