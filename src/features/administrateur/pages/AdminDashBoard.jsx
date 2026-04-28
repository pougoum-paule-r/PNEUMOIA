import React, { useState } from "react";

// Import des composants
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import InscriptionsUrgentes from "../components/InscriptionsUrgentes";
import ActivityChart from "../components/ActivityChart";
import ConcordanceIA from "../components/ConcordancesIA";
import GeographicMap from "../components/GeographicMap";

export default function AdminDashboard() {
  // État dark mode — false = mode clair par défaut
  const [darkMode, setDarkMode] = useState(false);

  // Clé de navigation active dans la sidebar
  const [activeKey, setActiveKey] = useState("dashboard");

  // État sidebar mobile ouverte/fermée
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${
      darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>

      {/* ═══ Sidebar ═══ */}
      <Sidebar
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        darkMode={darkMode}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ═══ Contenu principal ═══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">

        {/* Topbar sticky */}
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileOpen={setMobileOpen}
        />

        {/* Zone scrollable */}
        <main className="flex-1 px-3 sm:px-4 py-3">

          {/* Bannière d'alerte */}
          
          {/* Cartes de stats */}
          <div className="mb-3">
            <StatsCards darkMode={darkMode} />
          </div>

          {/* Layout principal : contenu gauche + panneau droit */}
          <div className="flex flex-col xl:flex-row gap-3">

            {/* Colonne gauche (contenu principal) */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">

              {/* Inscriptions urgentes */}
              <InscriptionsUrgentes darkMode={darkMode} />

              {/* Graphique activité */}
              <ActivityChart darkMode={darkMode} />
            </div>

            {/* Colonne droite — Concordance IA + Activité récente */}
            <div className="w-full xl:w-72 2xl:w-80 flex-shrink-0">
              <ConcordanceIA darkMode={darkMode} />
            </div>

          </div>

          {/* Répartition géographique pleine largeur */}
          <div className="mt-3">
            <GeographicMap darkMode={darkMode} compact />
          </div>
        </main>
      </div>
    </div>
  );
}

