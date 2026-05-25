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
    dateValidation: "Auj. 11:30",
    validePar: "Super Admin",
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
    dateValidation: "19 mars",
    validePar: "Super Admin",
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
    dateValidation: "16 mars",
    validePar: "Super Admin",
  },
];

export default function ValideesCemois() {
  const { darkMode, setDarkMode } = useAdminTheme();
  const [activeKey, setActiveKey] = useState("validees");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [rows] = useState(MOCK_VALIDEES);
  const { setCount: setGlobalNotificationCount } = useAdminNotificationCount();

  // Mise à jour du compteur global (optionnel)
  React.useEffect(() => {
    setGlobalNotificationCount(0); // Aucune notification ici
  }, [setGlobalNotificationCount]);

  const handleExportCSV = () => {
    const headers = ["Nom", "CNOM", "Spécialité", "Établissement", "Ville", "Email", "Téléphone", "Date Validation", "Validé par"];

    const csvRows = rows.map((d) => [
      d.name,
      d.cnom,
      d.specialite,
      d.hopital,
      d.ville,
      d.email,
      d.telephone,
      d.dateValidation,
      d.validePar,
    ]);

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
      <Sidebar
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        darkMode={darkMode}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileOpen={setMobileOpen}
        />

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Validées ce mois</h1>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Liste des médecins dont l’inscription a été validée ce mois-ci.
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
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
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
                  <tr key={doc.id} className={`transition-colors ${darkMode ? "hover:bg-gray-800/70" : "hover:bg-gray-50"}`}>
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
    </div>
  );
}