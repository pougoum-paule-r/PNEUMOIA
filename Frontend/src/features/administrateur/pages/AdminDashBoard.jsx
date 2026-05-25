import React, { useState } from "react";
import useAdminTheme from "../hooks/useAdminTheme";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import InscriptionsUrgentes from "../components/InscriptionsUrgentes";
import ActivityChart from "../components/ActivityChart";
import ConcordanceIA from "../components/ConcordancesIA";
import GeographicMap from "../components/GeographicMap";

export default function AdminDashboard() {
  const { darkMode, setDarkMode } = useAdminTheme();
  const [activeKey, setActiveKey] = useState("dashboard");
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`min-h-screen flex admin-theme transition-colors duration-300 ${
      darkMode ?"bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Sidebar
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        darkMode={darkMode}
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />

        <main className="flex-1 px-3 sm:px-4 py-3">
          <div className="mb-3">
            <StatsCards darkMode={darkMode} />
          </div>

          <div className="flex flex-col xl:flex-row gap-3">
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              <InscriptionsUrgentes darkMode={darkMode} />
              <ActivityChart darkMode={darkMode} />
            </div>

            <div className="w-full xl:w-72 2xl:w-80 flex-shrink-0">
              <ConcordanceIA darkMode={darkMode} />
            </div>
          </div>

          <div className="mt-3">
            <GeographicMap darkMode={darkMode} compact />
          </div>
        </main>
      </div>
    </div>
  );
}

