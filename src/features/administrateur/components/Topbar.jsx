import React, { useState } from "react";

export default function Topbar({ darkMode, setDarkMode, setMobileOpen }) {
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className={`
      sticky top-0 z-10 flex items-center justify-between gap-4
      px-4 sm:px-6 py-3 border-b
      ${darkMode
        ? "bg-gray-900 border-gray-800 text-white"
        : "bg-white border-gray-100 text-gray-900"
      }
      shadow-sm
    `}>

      {/* Gauche : burger + titre */}
      <div className="flex items-center gap-3">
        {/* Burger mobile */}
        <button
          onClick={() => setMobileOpen(true)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div>
          <h1 className={`text-base sm:text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Tableau de bord
          </h1>
          <p className={`text-[11px] hidden sm:block ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Super Administration — PneumoIA CEMAC
          </p>
        </div>
      </div>

      {/* Droite : recherche + dark mode + profil */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Barre de recherche */}
        <div className={`
          hidden sm:flex items-center gap-2 rounded-xl px-3 py-2 text-sm
          border transition-all duration-150
          ${darkMode
            ? "bg-gray-800 border-gray-700 text-gray-300"
            : "bg-gray-50 border-gray-200 text-gray-500"
          }
        `}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un médecin..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={`bg-transparent outline-none w-44 text-sm placeholder:text-gray-400 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          />
        </div>

        {/* Toggle dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-xl border transition-all duration-150 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
          }`}
          title={darkMode ? "Mode clair" : "Mode sombre"}
        >
          {darkMode ? (
            /* Soleil */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Lune */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button className={`relative p-2 rounded-xl border transition-all ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
            : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
        }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          SA
        </div>
      </div>
    </header>
  );
}
