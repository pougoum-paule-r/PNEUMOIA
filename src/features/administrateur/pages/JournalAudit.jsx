import { useEffect, useState, useCallback, useMemo } from "react";
import useAdminTheme from "../hooks/useAdminTheme";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

// Données fictives
const MOCK_LOGS = [
  { id: 1, horodatage: "Auj. 11:30", action: "Inscription validée", cible: "Dr. Sow", detail: "Compte activé — tous documents vérifiés", ip: "105.235.x.x" },
  { id: 2, horodatage: "Auj. 09:15", action: "IA déployée", cible: "Modèle v2.4.1", detail: "Concordance globale +1.2 pts", ip: "105.235.x.x" },
  { id: 3, horodatage: "Hier 16:30", action: "Compte suspendu", cible: "Dr. Mbang", detail: "Raison : Signalement d'un confrère — 30 jours", ip: "105.235.x.x" },
  { id: 4, horodatage: "15 mars", action: "Inscription refusée", cible: "Dr. Tabi", detail: "Motif : N° CNOM CM-2024-9999 invalide ou introuvable", ip: "105.235.x.x" },
  { id: 5, horodatage: "14 mars", action: "Rapport généré", cible: "Rapport mensuel", detail: "38 médecins · 4 821 consultations", ip: "105.235.x.x" },
  { id: 6, horodatage: "11 mars", action: "Inscription refusée", cible: "Dr. Bella Martin", detail: "Motif : Spécialité non couverte (médecine générale)", ip: "105.235.x.x" },
  { id: 7, horodatage: "10 mars", action: "Inscription validée", cible: "Dr. Nkeng", detail: "Compte activé — dossier complet", ip: "105.235.x.x" },
  { id: 8, horodatage: "09 mars", action: "Compte suspendu", cible: "Dr. Essama", detail: "Raison : Inactivité prolongée — 90 jours", ip: "105.235.x.x" },
];

// ====================== ActionBadge ======================
function ActionBadge({ action }) {
  const styles = {
    "Inscription validée": { bg: "bg-teal-100 dark:bg-teal-900/40", text: "text-teal-700 dark:text-teal-300" },
    "Inscription refusée": { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-600 dark:text-red-400" },
    "Compte suspendu": { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-600 dark:text-orange-400" },
    "IA déployée": { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-600 dark:text-blue-400" },
    "Rapport généré": { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-400" },
  };

  const style = styles[action] || { 
    bg: "bg-gray-100 dark:bg-gray-700", 
    text: "text-gray-600 dark:text-gray-300" 
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${style.bg} ${style.text}`}>
      {action}
    </span>
  );
}

// ====================== ActionIcon ======================
function ActionIcon({ action }) {
  const icons = {
    "Inscription validée": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    "Inscription refusée": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    "Compte suspendu": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
      </svg>
    ),
    "IA déployée": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    "Rapport généré": (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  };

  return icons[action] || null;
}

// ====================== Skeleton ======================
function SkeletonRow({ darkMode }) {
  return (
    <tr>
      {[60, 100, 130, 280, 90].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className={`h-4 rounded-md animate-pulse ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
            style={{ width: `${w}px` }}
          />
        </td>
      ))}
    </tr>
  );
}

// ====================== Main Component ======================
export default function JournalAudit() {
  const { darkMode, setDarkMode } = useAdminTheme();
  const [activeKey, setActiveKey] = useState("audit");
  const [isMobileOpen, setMobileOpen] = useState(false);
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filterAction, setFilterAction] = useState("Tous");
  const [search, setSearch] = useState("");

  // Fetch
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/api/admin/audit-logs")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => {
        setLogs(MOCK_LOGS); // fallback dev
        setLoading(false);
        // setError("Impossible de charger les logs d'audit.");
      });
  }, []);

  // Filtres (optimisé avec useMemo)
  const actionTypes = useMemo(() => {
    return ["Tous", ...new Set(logs.map((l) => l.action))];
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const q = search.toLowerCase().trim();
    
    return logs.filter((log) => {
      const matchAction = filterAction === "Tous" || log.action === filterAction;
      const matchSearch = !q || 
        log.cible.toLowerCase().includes(q) ||
        log.detail.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q);
      
      return matchAction && matchSearch;
    });
  }, [logs, filterAction, search]);

  // Export CSV
  const handleExportCSV = useCallback(() => {
    const headers = ["Horodatage", "Action", "Cible", "Détail / Raison", "IP"];
    const rows = filteredLogs.map((log) => [
      log.horodatage,
      log.action,
      log.cible,
      `"${log.detail.replace(/"/g, '""')}"`, // échappement CSV
      log.ip,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filteredLogs]);

  const cardCls = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputCls = darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500";

  return (
    <div className={`min-h-screen flex admin-theme transition-colors ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar activeKey={activeKey} setActiveKey={setActiveKey} darkMode={darkMode} isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />

        <main className={`p-4 md:p-6 flex-1 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Journal d'audit</h1>
              <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Traçabilité complète des actions administrateur
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all
                ${darkMode 
                  ? "border-gray-700 hover:bg-teal-600 hover:border-teal-600" 
                  : "border-gray-300 hover:bg-teal-600 hover:text-white"}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>

          {/* Filtres */}
          <div className={`rounded-2xl border p-4 mb-6 flex flex-col sm:flex-row gap-3 ${cardCls}`}>
            <div className="relative flex-1">
              <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Rechercher une cible, action ou détail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none transition-colors ${inputCls}`}
              />
            </div>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className={`px-4 py-2 rounded-xl border text-sm outline-none cursor-pointer ${inputCls}`}
            >
              {actionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <div className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
              {filteredLogs.length} entrée{filteredLogs.length > 1 ? "s" : ""}
            </div>
          </div>

          {/* Tableau */}
          <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`text-xs uppercase tracking-wider border-b ${darkMode ? "bg-gray-800/80 text-gray-400 border-gray-700" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                    <th className="px-4 py-3.5 text-left font-semibold">Horodatage</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Action</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Cible</th>
                    <th className="px-4 py-3.5 text-left font-semibold">Détail / Raison</th>
                    <th className="px-4 py-3.5 text-left font-semibold">IP</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} darkMode={darkMode} />)
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-20 text-gray-500">
                        Aucune entrée trouvée
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60`}>
                        <td className={`px-4 py-3.5 whitespace-nowrap text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {log.horodatage}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <ActionIcon action={log.action} />
                            <ActionBadge action={log.action} />
                          </div>
                        </td>
                        <td className={`px-4 py-3.5 font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {log.cible}
                        </td>
                        <td className={`px-4 py-3.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {log.detail}
                        </td>
                        <td className={`px-4 py-3.5 font-mono text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                          {log.ip}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {!loading && filteredLogs.length > 0 && (
            <p className={`text-xs mt-4 text-right ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Dernière mise à jour : {new Date().toLocaleString("fr-FR")}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}