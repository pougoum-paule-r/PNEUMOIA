import React, { useState } from "react";

const CARD_DEFS = [
  {
    key: "actifs",
    label: "Médecins actifs",
    trend: (v) => v !== null ? `${v} sur la plateforme` : "Chargement...",
    trendUp: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    accent: "#0d9488",
    iconBg: "rgba(13,148,136,0.15)",
    urgent: false,
  },
  {
    key: "nouvelles",
    label: "Inscriptions en attente",
    trend: () => "Action requise",
    trendUp: false,
    trendAlert: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    accent: "#f97316",
    iconBg: "rgba(249,115,22,0.15)",
    urgent: true,
  },
  {
    key: "consultations",
    label: "Consultations totales",
    trend: () => "Ce mois",
    trendUp: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    accent: "#3b82f6",
    iconBg: "rgba(59,130,246,0.15)",
    urgent: false,
  },
];

function StatCard({ def, value, loading, darkMode }) {
  const cardBg = darkMode
    ? def.urgent ? "rgba(249,115,22,0.08)" : "#1e293b"
    : def.urgent ? "#fff7ed" : "#ffffff";

  const borderColor = darkMode
    ? def.urgent ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"
    : def.urgent ? "#fed7aa" : "#e5e7eb";

  const displayValue = loading
    ? "—"
    : value !== null && value !== undefined
    ? Number(value).toLocaleString("fr-FR")
    : "—";

  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${borderColor}`,
      borderTop: `3px solid ${def.accent}`,
      padding: "16px 18px 14px",
      background: cardBg,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      cursor: "pointer",
      transition: "box-shadow 0.2s ease, transform 0.15s ease",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${def.accent}22`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120, borderRadius: "50%",
        background: `${def.accent}0d`,
        pointerEvents: "none",
      }} />

      {/* Top row: icon + badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: def.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: def.accent,
          flexShrink: 0,
        }}>
          {def.icon}
        </div>
        {def.urgent && (
          <span style={{
            fontSize: 10, fontWeight: 800,
            background: def.accent, color: "#fff",
            padding: "3px 10px", borderRadius: 99,
            textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            Urgent
          </span>
        )}
      </div>

      {/* Value + label */}
      <div>
        <p style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          margin: 0,
          lineHeight: 1,
          color: def.urgent ? def.accent : darkMode ? "#ffffff" : "#0f172a",
          opacity: loading ? 0.4 : 1,
          transition: "opacity 0.3s",
        }}>
          {displayValue}
        </p>
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          margin: "6px 0 0",
          color: darkMode ? "rgba(255,255,255,0.85)" : "#374151",
          letterSpacing: "0.01em",
        }}>
          {def.label}
        </p>
        <p style={{
          fontSize: 12,
          margin: "4px 0 0",
          color: def.trendAlert
            ? def.accent
            : darkMode ? "rgba(255,255,255,0.45)" : "#9ca3af",
          fontWeight: def.trendAlert ? 600 : 400,
        }}>
          {def.trend(value)}
        </p>
      </div>
    </div>
  );
}

// TODO: remplacer par des vrais appels API quand le back est prêt
const MOCK_STATS = { actifs: 38, nouvelles: 4, consultations: 4821 };

export default function StatsCards({ darkMode }) {
  const [stats] = useState(MOCK_STATS);
  const loading = false;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 16,
      maxWidth: "100%",
    }}>
      {CARD_DEFS.map((def) => (
        <StatCard
          key={def.key}
          def={def}
          value={stats[def.key]}
          loading={loading}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}