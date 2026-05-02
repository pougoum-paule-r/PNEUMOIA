import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

const navSections = [

  {
    title: "", 
    items: [
      {
        label: "Tableau de bord",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        ),
        badge: null,
        key: "dashboard",
        path: "/administrateur/dashboard",
      },
    ],
  },

  {
    title: "INSCRIPTIONS",
    items: [
      {
        label: "Nouvelles demandes",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
        ),
        badge: 4,
        badgeColor: "bg-orange-500",
        key: "nouvelles",
        path: "/administrateur/inscriptions/nouvelles",
      },
      {
        label: "Validées ce mois",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        ),
        badge: 12,
        badgeColor: "bg-teal-500",
        key: "validees",
        path: "/administrateur/inscriptions/validees",
      },
      {
        label: "Refusées",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        ),
        badge: 3,
        badgeColor: "bg-red-500",
        key: "refusees",
        path: "/administrateur/inscriptions/refusees",
      },
    ],
  },
  {
    title: "MÉDECINS",
    items: [
      {
        label: "Médecins actifs",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        ),
        badge: 38,
        badgeColor: "bg-teal-500",
        key: "actifs",
        path: "/administrateur/medecins/actifs",
      },
      {
        label: "Suspendus",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        ),
        badge: 2,
        badgeColor: "bg-yellow-500",
        key: "suspendus",
        path: "/administrateur/medecins/suspendus",
      },
    ],
  },
  {
    title: "SYSTÈME",
    items: [
     
      {
        label: "Monitoring IA",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ),
        badge: null,
        key: "monitoring",
        path: "/administrateur/monitoring-ia",
      },
      {
        label: "Journal d'audit",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
        ),
        badge: null,
        key: "audit",
        path: "/administrateur/journal-audit",
      },
      {
        label: "Paramètres plateforme",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        ),
        badge: null,
        key: "parametres",
        path: "/administrateur/parametres",
      },
    ],
  },
];

export default function Sidebar({ activeKey, setActiveKey, darkMode, isMobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-30 w-[280px] max-w-[92vw] flex-shrink-0 flex flex-col overflow-hidden h-[100dvh]
        transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky lg:top-0 lg:z-10 lg:h-screen lg:w-64
        ${darkMode ? "bg-gray-900 border-gray-800" : "bg-teal-900"}
        border-r
      `}>

        {/* Logo */}
       <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${darkMode ? "bg-gray-900 border-white/10" : "bg-white border-gray-200"}`}>
             <img src={logo} alt="PneumoIA" className="w-25 h-25 object-contain" />
            <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-1 rounded-full">Administrateur</span>
       </div>  

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 px-2 mb-2">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.key}>
                    <Link to={item.path}
                      onClick={() => { setActiveKey(item.key); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                        activeKey === item.key
                          ? "bg-teal-600 text-white font-semibold shadow-sm"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className={`w-4 h-4 flex items-center justify-center flex-shrink-0 ${activeKey === item.key ? "text-white" : "text-white/50"}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge !== null && (
                        <span className={`inline-flex items-center justify-center text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full min-w-[22px] ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Admin info bas */}
        <div className="shrink-0 px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate leading-tight">Super Admin</p>
              <p className="text-white/45 text-[10px] truncate mt-0.5">admin@pneumoia.cm</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
