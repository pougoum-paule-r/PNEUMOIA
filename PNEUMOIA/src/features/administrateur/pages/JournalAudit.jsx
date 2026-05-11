import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// ─── Données fictives (à supprimer quand le backend est prêt) ───────────────
const MOCK_LOGS = [
  { id: 1, horodatage: "Auj. 11:30", action: "Inscription validée", cible: "Dr. Sow",         detail: "Compte activé — tous documents vérifiés",              ip: "105.235.x.x" },
  { id: 2, horodatage: "Auj. 09:15", action: "IA déployée",         cible: "Modèle v2.4.1",   detail: "Concordance globale +1.2 pts",                         ip: "105.235.x.x" },
  { id: 3, horodatage: "Hier 16:30", action: "Compte suspendu",     cible: "Dr. Mbang",       detail: "Raison : Signalement d'un confrère — 30 jours",        ip: "105.235.x.x" },
  { id: 4, horodatage: "15 mars",    action: "Inscription refusée", cible: "Dr. Tabi",        detail: "Motif : N° CNOM CM-2024-9999 invalide ou introuvable", ip: "105.235.x.x" },
  { id: 5, horodatage: "14 mars",    action: "Rapport généré",      cible: "Rapport mensuel", detail: "38 médecins · 4 821 consultations",                    ip: "105.235.x.x" },
  { id: 6, horodatage: "11 mars",    action: "Inscription refusée", cible: "Dr. Bella Martin",detail: "Motif : Spécialité non couverte (médecine générale)",  ip: "105.235.x.x" },
  { id: 7, horodatage: "10 mars",    action: "Inscription validée", cible: "Dr. Nkeng",       detail: "Compte activé — dossier complet",                      ip: "105.235.x.x" },
  { id: 8, horodatage: "09 mars",    action: "Compte suspendu",     cible: "Dr. Essama",      detail: "Raison : Inactivité prolongée — 90 jours",             ip: "105.235.x.x" },
];

// ─── Badge coloré selon le type d'action ────────────────────────────────────
function ActionBadge({ action }) {
  const map = {
    "Inscription validée": { bg: "bg-teal-100   dark:bg-teal-900/40",   text: "text-teal-700   dark:text-teal-300"   },
    "Inscription refusée": { bg: "bg-red-100    dark:bg-red-900/40",    text: "text-red-600    dark:text-red-400"    },
    "Compte suspendu":     { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-600 dark:text-orange-400" },
    "IA déployée":         { bg: "bg-blue-100   dark:bg-blue-900/40",   text: "text-blue-600   dark:text-blue-400"   },
    "Rapport généré":      { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-400" },
  };
  const style = map[action] ?? { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-600 dark:text-gray-300" };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${style.bg} ${style.text}`}>
      {action}
    </span>
  );
}

// ─── Icône selon le type d'action ───────────────────────────────────────────
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
  return icons[action] ?? null;
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function SkeletonRow({ darkMode }) {
  return (
    <tr>
      {[60, 120, 80, 200, 70].map((w, i) => (
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

// ─── Composant principal ─────────────────────────────────────────────────────
export default function JournalAudit({ darkMode: initialDarkMode }) {
  const [darkMode, setDarkMode] = useState(Boolean(initialDarkMode));
  const [activeKey, setActiveKey] = useState("audit");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [logs, setLogs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [filterAction, setFilter] = useState("Tous");
  const [search, setSearch]       = useState("");

  // ── Fetch backend ──────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);

    // 🔁 Remplace cette URL par ton vrai endpoint backend
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
        // ⚠️ Données fictives en attendant le backend — supprime cette ligne en prod
        setLogs(MOCK_LOGS);
        setLoading(false);
        // Décommente la ligne suivante en production :
        // setError("Impossible de charger les données du journal.");
      });
  }, []);

  // ── Filtres ────────────────────────────────────────────────────────────────
  const actionTypes  = ["Tous", ...Array.from(new Set(logs.map((l) => l.action)))];

  const filteredLogs = logs.filter((l) => {
    const matchAction = filterAction === "Tous" || l.action === filterAction;
    const q           = search.toLowerCase();
    const matchSearch =
      !q ||
      l.cible.toLowerCase().includes(q)  ||
      l.detail.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q);
    return matchAction && matchSearch;
  });

  // ── Export CSV ─────────────────────────────────────────────────────────────
  const handleExportCSV = useCallback(() => {
    const headers = ["Horodatage", "Action", "Cible", "Détail / Raison", "IP"];
    const rows    = filteredLogs.map((l) => [
      l.horodatage,
      l.action,
      l.cible,
      `"${l.detail}"`,
      l.ip,
    ]);
    const csv  = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `audit_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredLogs]);

  // ── Classes CSS réutilisables ──────────────────────────────────────────────
  const cardCls  = darkMode ? "bg-gray-900  border-gray-800"  : "bg-white border-gray-200";
  const inputCls = darkMode
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500"
    : "bg-gray-50  border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500";

  const tdCls    = darkMode ? "text-gray-200"  : "text-gray-800";   // texte principal (Cible)
  const mutedCls = darkMode ? "text-gray-400"  : "text-gray-600";   // texte secondaire (Horodatage, Détail, IP)
  const thCls    = darkMode ? "bg-gray-800/80 text-gray-400" : "bg-gray-50 text-gray-500";
  const rowHover = darkMode ? "hover:bg-gray-800/60" : "hover:bg-gray-50";
  const divider  = darkMode ? "divide-gray-800" : "divide-gray-100";

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
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
        <main className={`p-4 md:p-6 min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>

      {/* ── En-tête ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Journal d'audit</h1>
          <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Traçabilité complète des actions admin
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150 shrink-0
            ${darkMode
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

      {/* ── Filtres ──────────────────────────────────────────────────────────── */}
      <div className={`rounded-2xl border p-4 mb-4 flex flex-col sm:flex-row gap-3 ${cardCls}`}>

        {/* Barre de recherche */}
        <div className="relative flex-1">
          <svg
            className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${mutedCls}`}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher une cible, action, détail…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none transition-colors ${inputCls}`}
          />
        </div>

        {/* Filtre par type d'action */}
        <select
          value={filterAction}
          onChange={(e) => setFilter(e.target.value)}
          className={`px-3 py-2 rounded-xl border text-sm outline-none transition-colors cursor-pointer ${inputCls}`}
        >
          {actionTypes.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        {/* Compteur de résultats */}
        <div className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
          {filteredLogs.length} entrée{filteredLogs.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ── Message d'erreur ─────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      {/* ── Tableau ──────────────────────────────────────────────────────────── */}
      <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* En-têtes */}
            <thead>
              <tr className={`text-xs uppercase tracking-wider border-b ${thCls} ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className="px-4 py-3 text-left font-semibold">Horodatage</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
                <th className="px-4 py-3 text-left font-semibold">Cible</th>
                <th className="px-4 py-3 text-left font-semibold">Détail / Raison</th>
                <th className="px-4 py-3 text-left font-semibold">IP</th>
              </tr>
            </thead>

            {/* Corps */}
            <tbody className={`divide-y ${divider}`}>
              {loading ? (
                // Skeleton pendant le chargement
                <>
                  <SkeletonRow darkMode={darkMode} />
                  <SkeletonRow darkMode={darkMode} />
                  <SkeletonRow darkMode={darkMode} />
                  <SkeletonRow darkMode={darkMode} />
                  <SkeletonRow darkMode={darkMode} />
                </>
              ) : filteredLogs.length === 0 ? (
                // Aucun résultat
                <tr>
                  <td colSpan={5} className={`text-center py-16 ${mutedCls}`}>
                    <div className="flex flex-col items-center gap-3">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                      <span className="text-sm">Aucune entrée trouvée</span>
                    </div>
                  </td>
                </tr>
              ) : (
                // Lignes de données
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`transition-colors duration-100 ${rowHover}`}
                  >
                    {/* Horodatage */}
                    <td className={`px-4 py-3.5 whitespace-nowrap text-xs ${mutedCls}`}>
                      {log.horodatage}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <ActionIcon action={log.action} />
                        <ActionBadge action={log.action} />
                      </div>
                    </td>

                    {/* Cible */}
                    <td className={`px-4 py-3.5 font-semibold whitespace-nowrap ${tdCls}`}>
                      {log.cible}
                    </td>

                    {/* Détail */}
                    <td className={`px-4 py-3.5 ${mutedCls}`}>
                      {log.detail}
                    </td>

                    {/* IP */}
                    <td className={`px-4 py-3.5 font-mono text-xs ${mutedCls}`}>
                      {log.ip}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pied de page ─────────────────────────────────────────────────────── */}
      {!loading && filteredLogs.length > 0 && (
        <p className={`text-xs mt-3 text-right ${mutedCls}`}>
          Dernière mise à jour : {new Date().toLocaleString("fr-FR")}
        </p>
      )}

        </main>
      </div>
    </div>
  );
}
