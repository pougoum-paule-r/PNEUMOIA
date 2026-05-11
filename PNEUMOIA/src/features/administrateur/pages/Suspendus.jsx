import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// ─── Données mockées ──────────────────────────────────────────────────────────
const MOCK_SUSPENDUS = [
  {
    id: 1,
    initiales: "DM",
    nom: "Dr. Mbang",
    specialite: "Pneumologue",
    etablissement: "Clinique Sud, Douala",
    cnom: "CM-2020-0345",
    raison: "Signalement d'un confrère — comportement non conforme à la déontologie",
    duree: "30 jours",
    dureeType: "limitee",
    suspenduLe: "Hier",
    suspenduPar: "Super Admin",
  },
  {
    id: 2,
    initiales: "TD",
    nom: "Dr. Tamba Diallo",
    specialite: "Pneumologue",
    etablissement: "Hôp. Laquintinie",
    cnom: "CM-2021-0789",
    raison: "Vérification d'identité requise — incohérence dans les documents soumis",
    duree: "Indéfinie",
    dureeType: "indefinie",
    suspenduLe: "Il y a 5j",
    suspenduPar: "Super Admin",
  },
];

// ─── Modale de confirmation suppression ───────────────────────────────────────
function ModaleSuppression({ medecin, onConfirm, onCancel, darkMode }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modale */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className={`relative w-full max-w-md rounded-2xl shadow-2xl pointer-events-auto
          ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}`}>

          {/* En-tête */}
          <div className={`flex items-center justify-between px-6 py-4 border-b
            ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <h2 className={`text-base font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              Supprimer le compte
            </h2>
            <button
              onClick={onCancel}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                ${darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Corps */}
          <div className="px-6 py-5 space-y-3">
            {/* Alerte principale */}
            <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border
              ${darkMode
                ? "bg-red-950/30 border-red-800/40 text-red-300"
                : "bg-red-50 border-red-100 text-red-700"
              }`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p className="text-sm leading-relaxed">
                Supprimer définitivement le compte de{" "}
                <span className="font-bold">{medecin.nom}</span> ? Toutes ses données seront effacées de la plateforme.
              </p>
            </div>

            {/* Avertissement irréversible */}
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
              ${darkMode ? "bg-red-950/20 text-red-400" : "bg-red-50 text-red-500"}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p className="text-xs font-medium">Cette action est irréversible.</p>
            </div>
          </div>

          {/* Pied */}
          <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t
            ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <button
              onClick={onCancel}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                ${darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Badge durée ──────────────────────────────────────────────────────────────
function DureeBadge({ duree, dureeType }) {
  const cls = dureeType === "indefinie"
    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
    : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${cls}`}>
      {duree}
    </span>
  );
}

// ─── Avatar initiales ─────────────────────────────────────────────────────────
function Avatar({ initiales, darkMode }) {
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
      ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
      {initiales}
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonRow({ darkMode }) {
  return (
    <tr>
      {[180, 100, 220, 70, 70, 80, 120].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className={`h-4 rounded-md animate-pulse ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} style={{ width: `${w}px` }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function MedecinsSuspendus({ darkMode: initialDarkMode }) {
  const [darkMode, setDarkMode] = useState(Boolean(initialDarkMode));
  const [activeKey, setActiveKey] = useState("suspendus");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [suspendus, setSuspendus]     = useState(MOCK_SUSPENDUS);
  const [loading]                     = useState(false);
  const [modaleSuppr, setModaleSuppr] = useState(null); // médecin à supprimer
  const [toast, setToast]             = useState(null);

  // ── Réactiver ────────────────────────────────────────────────────────────
  const handleReactiver = useCallback((id) => {
    setSuspendus((prev) => prev.filter((m) => m.id !== id));
    setToast({ message: "Compte réactivé avec succès", type: "success" });
    setTimeout(() => setToast(null), 3000);
    // 🔁 En prod : fetch(`/api/admin/medecins/${id}/reactiver`, { method: "PUT" })
  }, []);

  // ── Supprimer ────────────────────────────────────────────────────────────
  const handleSupprimer = useCallback(() => {
    if (!modaleSuppr) return;
    setSuspendus((prev) => prev.filter((m) => m.id !== modaleSuppr.id));
    setToast({ message: `Compte de ${modaleSuppr.nom} supprimé définitivement`, type: "error" });
    setTimeout(() => setToast(null), 3500);
    setModaleSuppr(null);
    // 🔁 En prod : fetch(`/api/admin/medecins/${modaleSuppr.id}`, { method: "DELETE" })
  }, [modaleSuppr]);

  // ── Classes ───────────────────────────────────────────────────────────────
  const pageCls  = darkMode ? "bg-gray-950 text-white"      : "bg-gray-50 text-gray-900";
  const cardCls  = darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const thCls    = darkMode ? "bg-gray-800/80 text-gray-400" : "bg-gray-50 text-gray-500";
  const mutedCls = darkMode ? "text-gray-400" : "text-gray-500";
  const tdCls    = darkMode ? "text-gray-200" : "text-gray-800";
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
        <main className={`p-4 md:p-6 min-h-screen transition-colors duration-200 ${pageCls}`}>

      {/* ── En-tête ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Comptes suspendus</h1>
          <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {suspendus.length} compte{suspendus.length !== 1 ? "s" : ""} suspendu{suspendus.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── Tableau ────────────────────────────────────────────────────────── */}
      <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-xs uppercase tracking-wider border-b ${thCls}
                ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className="px-4 py-3 text-left font-semibold">Médecin</th>
                <th className="px-4 py-3 text-left font-semibold">CNOM</th>
                <th className="px-4 py-3 text-left font-semibold">Raison de la suspension</th>
                <th className="px-4 py-3 text-left font-semibold">Durée</th>
                <th className="px-4 py-3 text-left font-semibold">Suspendu le</th>
                <th className="px-4 py-3 text-left font-semibold">Suspendu par</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${divider}`}>
              {loading ? (
                <>
                  <SkeletonRow darkMode={darkMode} />
                  <SkeletonRow darkMode={darkMode} />
                </>
              ) : suspendus.length === 0 ? (
                <tr>
                  <td colSpan={7} className={`text-center py-16 ${mutedCls}`}>
                    <div className="flex flex-col items-center gap-3">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                        <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                      </svg>
                      <span className="text-sm">Aucun compte suspendu</span>
                    </div>
                  </td>
                </tr>
              ) : (
                suspendus.map((m) => (
                  <tr key={m.id} className={`transition-colors duration-100 ${rowHover}`}>

                    {/* Médecin */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initiales={m.initiales} darkMode={darkMode} />
                        <div>
                          <p className={`font-semibold text-sm ${tdCls}`}>{m.nom}</p>
                          <p className={`text-xs ${mutedCls}`}>{m.specialite} · {m.etablissement}</p>
                        </div>
                      </div>
                    </td>

                    {/* CNOM */}
                    <td className={`px-4 py-3.5 font-mono text-xs ${mutedCls}`}>
                      {m.cnom}
                    </td>

                    {/* Raison */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <span className="text-orange-500 dark:text-orange-400 text-xs font-medium leading-snug">
                        {m.raison}
                      </span>
                    </td>

                    {/* Durée */}
                    <td className="px-4 py-3.5">
                      <DureeBadge duree={m.duree} dureeType={m.dureeType} />
                    </td>

                    {/* Suspendu le */}
                    <td className={`px-4 py-3.5 text-xs whitespace-nowrap ${mutedCls}`}>
                      {m.suspenduLe}
                    </td>

                    {/* Suspendu par */}
                    <td className={`px-4 py-3.5 text-xs whitespace-nowrap ${mutedCls}`}>
                      {m.suspenduPar}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleReactiver(m.id)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-teal-400 text-teal-600
                            hover:bg-teal-50 dark:border-teal-600 dark:text-teal-400 dark:hover:bg-teal-900/20
                            font-medium transition-colors whitespace-nowrap"
                        >
                          Réactiver
                        </button>
                        <button
                          onClick={() => setModaleSuppr(m)}
                          className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-600
                            hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20
                            font-medium transition-colors whitespace-nowrap"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pied ───────────────────────────────────────────────────────────── */}
      {!loading && suspendus.length > 0 && (
        <p className={`text-xs mt-3 text-right ${mutedCls}`}>
          Dernière mise à jour : {new Date().toLocaleString("fr-FR")}
        </p>
      )}

      {/* ── Modale suppression ─────────────────────────────────────────────── */}
      {modaleSuppr && (
        <ModaleSuppression
          medecin={modaleSuppr}
          onConfirm={handleSupprimer}
          onCancel={() => setModaleSuppr(null)}
          darkMode={darkMode}
        />
      )}

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
          ${toast.type === "success" ? "bg-teal-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.type === "success"
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 12 8 9 12 20 16 9 19 12 21 6"/></svg>
          }
          {toast.message}
        </div>
      )}
        </main>
      </div>
    </div>
  );
}
