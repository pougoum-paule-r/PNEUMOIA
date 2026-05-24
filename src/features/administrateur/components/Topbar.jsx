import React, { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminNotificationCount from "../hooks/useAdminNotificationCount";

const PAGE_TITLES = {
  "/administrateur/dashboard": { title: "Tableau de bord", sub: "Super Administration · PneumoIA CEMAC" },
  "/administrateur/inscriptions/nouvelles": { title: "Nouvelles demandes", sub: "Inscriptions en attente de validation" },
  "/administrateur/inscriptions/validees": { title: "Validées ce mois", sub: "Inscriptions approuvées" },
  "/administrateur/inscriptions/refusees": { title: "Refusées", sub: "Inscriptions rejetées" },
  "/administrateur/medecins/actifs": { title: "Médecins actifs", sub: "Praticiens sur la plateforme" },
  "/administrateur/medecins/suspendus": { title: "Médecins suspendus", sub: "Comptes temporairement désactivés" },
  "/administrateur/monitoring-ia": { title: "Monitoring IA", sub: "Supervision du moteur d'analyse" },
  "/administrateur/journal-audit": { title: "Journal d'audit", sub: "Historique des actions système" },
  "/administrateur/parametres": { title: "Paramètres plateforme", sub: "Configuration générale" },
};

export default function Topbar({ darkMode, setDarkMode, setMobileOpen, notificationCount }) {
  const [searchVal, setSearchVal] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminName, setAdminName] = useState("Super Admin");
  const [adminEmail, setAdminEmail] = useState("admin@pneumoia.cm");
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { count: storedNotificationCount } = useAdminNotificationCount();

  const resolvedNotificationCount =
    typeof notificationCount === "number" ? notificationCount : storedNotificationCount;

  const page = PAGE_TITLES[location.pathname] ?? { title: "Administration", sub: "PneumoIA CEMAC" };

  const adminInitials = useMemo(() => {
    const parts = adminName.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "SA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [adminName]);

  useEffect(() => {
    setAdminName(localStorage.getItem("admin_name") || "Super Admin");
    setAdminEmail(localStorage.getItem("admin_email") || "admin@pneumoia.cm");
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const bg = darkMode ? "#0f172a" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.07)" : "#e5e7eb";
  const inputBg = darkMode ? "rgba(255,255,255,0.06)" : "#f3f4f6";
  const inputBorder = darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb";
  const iconColor = darkMode ? "rgba(255,255,255,0.5)" : "#6b7280";
  const btnBg = darkMode ? "rgba(255,255,255,0.06)" : "#f3f4f6";
  const btnBorder = darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb";

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: bg,
          borderBottom: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "0 24px",
          height: 64,
          flexShrink: 0,
        }}
      >

        {/* ── Left: hamburger + title ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
            style={{
              padding: 8, borderRadius: 10,
              background: btnBg, border: `1px solid ${btnBorder}`,
              color: iconColor, cursor: "pointer",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div>
            <h1 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: darkMode ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}>
              {page.title}
            </h1>
            <p style={{
              margin: 0,
              fontSize: 12,
              color: darkMode ? "rgba(255,255,255,0.4)" : "#9ca3af",
              marginTop: 2,
            }}
            className="hidden sm:block"
            >
              {page.sub}
            </p>
          </div>
        </div>

        {/* ── Right: search + actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Search */}
          <div
            className="hidden sm:flex"
            style={{
              alignItems: "center", gap: 8,
              background: inputBg,
              border: `1px solid ${inputBorder}`,
              borderRadius: 12,
              padding: "8px 14px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher un médecin..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{
                background: "transparent", border: "none", outline: "none",
                width: 180, fontSize: 13,
                color: darkMode ? "rgba(255,255,255,0.85)" : "#374151",
              }}
            />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Mode clair" : "Mode sombre"}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: btnBg, border: `1px solid ${btnBorder}`,
              color: darkMode ? "#fbbf24" : iconColor,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {darkMode
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigate("/administrateur/inscriptions/nouvelles")}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: btnBg, border: `1px solid ${btnBorder}`,
              color: iconColor, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            {resolvedNotificationCount > 0 && (
              <span style={{
                position: "absolute", top: -5, right: -5,
                background: "#ef4444", color: "#fff",
                fontSize: 10, fontWeight: 700,
                minWidth: 18, height: 18,
                borderRadius: 99, display: "flex",
                alignItems: "center", justifyContent: "center",
                padding: "0 4px",
                border: `2px solid ${bg}`,
              }}>
                {resolvedNotificationCount > 99 ? "99+" : resolvedNotificationCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div ref={profileRef} style={{ position: "relative" }}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "#0d9488",
                border: profileOpen ? "2px solid #5eead4" : "2px solid transparent",
                color: "#fff",
                fontSize: 13, fontWeight: 700,
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "border-color 0.15s",
              }}
            >
              {adminInitials}
            </button>

            {profileOpen && (
              <div style={{
                position: "absolute", right: 0, top: "calc(100% + 8px)",
                width: 220,
                background: darkMode ? "#1e293b" : "#ffffff",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "#e5e7eb"}`,
                borderRadius: 16,
                boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                overflow: "hidden",
                zIndex: 50,
              }}>
                {/* Profile header */}
                <div style={{
                  padding: "16px 16px 12px",
                  borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "#f3f4f6"}`,
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#0d9488",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>
                    {adminInitials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: darkMode ? "#fff" : "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {adminName}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: darkMode ? "rgba(255,255,255,0.45)" : "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {adminEmail}
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <div style={{ padding: "10px 10px" }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      gap: 8, padding: "9px 12px", borderRadius: 10,
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      color: "#ef4444", fontSize: 13, fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

    </>
  );
}