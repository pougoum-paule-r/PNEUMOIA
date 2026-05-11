import { useState, useEffect, useRef } from "react";
import {
  LayoutGrid, UserRound, Stethoscope, Share2, MessageSquare,
  Bell, Search, Settings, ShieldCheck, History, Activity,
  FileText, Pill, AlertTriangle, CheckCircle2, XCircle,
  ChevronRight, X, Download, Edit3, Trash2, Plus,
  Clock, MapPin, Phone, Calendar, FileScan, Eye,
  TrendingUp, Users, AlertCircle, FolderOpen,
  Heart, Thermometer, Wind, Scale, Droplets,
  MoreHorizontal, ChevronDown, Lock, UserCheck,
  ClipboardList, Microscope, ArrowUpRight, Zap,
  LogOut, Moon, Sun, Filter, SlidersHorizontal
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────
const PATIENTS = {
  1: {
    name: "TAMO Bernard", init: "TB", age: "47 ans", sex: "Masculin",
    id: "PNEU-004821", dob: "15/03/1977", city: "Douala", tel: "+237 699 123 456",
    created: "12/01/2025", shared: false, status: "actif",
    diag: "Pneumonie bactérienne", diagSince: "Diagnostiqué le 09/03/2026", iaPct: 85,
    antecedents: ["Tabagisme sevré 2020", "Hypertension artérielle", "Chirurgie appendice 2015"],
    allergies: ["Aucune allergie connue"],
    treatments: [
      { name: "Amoxicilline", dose: "1g × 3/j — 7 jours" },
      { name: "Paracétamol", dose: "1g si fièvre > 38.5°C" },
      { name: "Amlodipine", dose: "5mg/j — HTA" }
    ],
    vitals: { spo2: 94, fr: 22, temp: 38.7, pa: "125/82", fc: 98, poids: "78 kg" },
    docs: [
      { name: "Radio thorax — 09/03/2026", date: "Auj." },
      { name: "NFS + CRP — 09/03/2026", date: "Auj." },
      { name: "Consultation 15/10/2025", date: "Oct. 25" }
    ],
    notes: "Patient coopératif. Toux productive depuis 48h. Réévaluation J+2.",
    iaDiags: [
      { date: "09/03/2026", diag: "Pneumonie bactérienne", pct: 85, conc: "Concordant" },
      { date: "15/10/2025", diag: "Bronchite aiguë", pct: 78, conc: "Concordant" },
      { date: "02/05/2025", diag: "Bilan normal", pct: 62, conc: "Concordant" }
    ],
    iaDiffs: [
      { diag: "Tuberculose", pct: 28 },
      { diag: "Pneumopathie virale", pct: 15 },
      { diag: "Epanchement pleural", pct: 8 }
    ],
    iaCriteria: [
      { label: "Fièvre > 38.5°C", ok: true }, { label: "Opacité alvéolaire radio", ok: true },
      { label: "Crépitants", ok: true }, { label: "SpO₂ < 95%", ok: true },
      { label: "Durée 1–3j", ok: true }, { label: "Hémoptysie", ok: false }
    ],
    tl: [
      { date: "09/03/2026 · Dr. Dupont", title: "Pneumonie bactérienne", note: "Amoxicilline 1g × 3/j. Suivi J+7.", ia: 85, color: "#1D6FEB", conc: "Concordant" },
      { date: "15/10/2025", title: "Bronchite aiguë", note: "Guérison J+10.", ia: 78, color: "#059669", conc: "Concordant" },
      { date: "02/05/2025", title: "Bilan normal", note: "Aucune pathologie.", ia: 62, color: "#94A3B8", conc: "Concordant" }
    ]
  },
  2: {
    name: "FOUDA Marie", init: "FM", age: "52 ans", sex: "Féminin",
    id: "PNEU-001234", dob: "12/07/1972", city: "Douala", tel: "+237 677 234 567",
    created: "03/06/2024", shared: true, status: "actif",
    diag: "BPCO stade II", diagSince: "Suivi depuis mars 2024", iaPct: 83,
    antecedents: ["Tabagisme actif 25 PA", "Asthme enfance", "Rhinite chronique"],
    allergies: ["Aspirine (urticaire)", "AINS"],
    treatments: [
      { name: "Salbutamol inh.", dose: "2 bouffées si dyspnée" },
      { name: "Tiotropium inh.", dose: "18µg/j — fond" },
      { name: "N-acétylcystéine", dose: "600mg/j" }
    ],
    vitals: { spo2: 92, fr: 24, temp: 37.1, pa: "138/86", fc: 88, poids: "63 kg" },
    docs: [
      { name: "EFR — 15/02/2026", date: "Fév. 26" },
      { name: "Scanner thorax 01/2026", date: "Jan. 26" },
      { name: "Gazéométrie Nov.25", date: "Nov. 25" }
    ],
    notes: "BPCO stable. SpO₂ légèrement basse. Sevrage tabagique recommandé.",
    iaDiags: [
      { date: "10/03/2026", diag: "BPCO stade II", pct: 83, conc: "Concordant" },
      { date: "15/12/2025", diag: "BPCO exacerbation", pct: 79, conc: "Concordant" }
    ],
    iaDiffs: [
      { diag: "Asthme sévère", pct: 22 },
      { diag: "Insuffisance cardiaque", pct: 12 },
      { diag: "Bronchite chronique", pct: 9 }
    ],
    iaCriteria: [
      { label: "VEMS/CVF < 0.70", ok: true }, { label: "Tabagisme > 20 PA", ok: true },
      { label: "Dyspnée chronique", ok: true }, { label: "Obstruction persist.", ok: true },
      { label: "SpO₂ < 94%", ok: true }, { label: "Hypercapnie", ok: false }
    ],
    tl: [
      { date: "10/03/2026", title: "BPCO bilan trim.", note: "Stable. SpO₂ 92%.", ia: 83, color: "#1D6FEB", conc: "Concordant" },
      { date: "15/12/2025", title: "BPCO exacerbation", note: "Cortico 5j.", ia: 79, color: "#D97706", conc: "Concordant" },
      { date: "03/06/2024", title: "1ère consultation", note: "Diagnostic BPCO.", ia: 77, color: "#94A3B8", conc: "Concordant" }
    ]
  },
  3: {
    name: "KAMGA Jean", init: "KJ", age: "71 ans", sex: "Masculin",
    id: "PNEU-009876", dob: "04/11/1953", city: "Yaoundé", tel: "+237 655 345 678",
    created: "15/11/2025", shared: false, status: "urgent",
    diag: "Tuberculose pulmonaire", diagSince: "Diagnostiqué le 15/11/2025", iaPct: 82,
    antecedents: ["Diabète type 2", "Immunodépression cortico", "Contact TB confirmé"],
    allergies: ["Streptomycine (ototoxicité)"],
    treatments: [
      { name: "Rifampicine", dose: "600mg/j RHZE phase intensive" },
      { name: "Isoniazide", dose: "300mg/j" },
      { name: "Pyrazinamide", dose: "2000mg/j" },
      { name: "Metformine", dose: "1000mg × 2/j" }
    ],
    vitals: { spo2: 89, fr: 26, temp: 37.8, pa: "142/91", fc: 104, poids: "61 kg" },
    docs: [
      { name: "BK crachat positif", date: "Nov. 25" },
      { name: "Radio thorax initiale", date: "Nov. 25" },
      { name: "Antibiogramme", date: "Nov. 25" }
    ],
    notes: "SUIVI DÉPASSÉ depuis 28/02/2026. Phase intensive TB. Bilan hépatique obligatoire.",
    iaDiags: [
      { date: "15/11/2025", diag: "Tuberculose pulmonaire", pct: 82, conc: "Concordant" },
      { date: "28/02/2026", diag: "TB suivi phase intensive", pct: 79, conc: "Concordant" }
    ],
    iaDiffs: [
      { diag: "Pneumonie bactérienne", pct: 18 },
      { diag: "Cancer bronchique", pct: 14 },
      { diag: "Aspergillome", pct: 7 }
    ],
    iaCriteria: [
      { label: "BK crachat positif", ok: true }, { label: "Opacités bilatérales", ok: true },
      { label: "Contact TB connu", ok: true }, { label: "Immunodépression", ok: true },
      { label: "Perte poids > 5kg", ok: true }, { label: "Culture BAAR+", ok: true }
    ],
    tl: [
      { date: "28/02/2026", title: "TB suivi J+105", note: "BK négatif. Bonne tolérance.", ia: 79, color: "#059669", conc: "Concordant" },
      { date: "15/11/2025", title: "TB diagnostic", note: "BK+ confirmé. RHZE démarré.", ia: 82, color: "#DC2626", conc: "Concordant" }
    ]
  },
  4: {
    name: "NGUEMA Paul", init: "NP", age: "63 ans", sex: "Masculin",
    id: "PNEU-002891", dob: "22/08/1961", city: "Douala", tel: "+237 699 456 789",
    created: "08/09/2023", shared: true, status: "actif",
    diag: "Asthme sévère persistant", diagSince: "Suivi depuis sept. 2023", iaPct: 91,
    antecedents: ["Asthme depuis enfance", "Rhinosinusite chronique", "Dermatite atopique", "RGO"],
    allergies: ["Acariens (allergique)", "Aspirine CI", "Bêtabloqu. CI"],
    treatments: [
      { name: "Fluticasone/Salmétérol", dose: "500/50µg × 2/j CSI+LABA" },
      { name: "Montélukast", dose: "10mg/j" },
      { name: "Salbutamol spray", dose: "1–2 bouffées si crise" }
    ],
    vitals: { spo2: 96, fr: 16, temp: 36.8, pa: "118/74", fc: 74, poids: "82 kg" },
    docs: [
      { name: "EFR 05/03/2026", date: "Mars 26" },
      { name: "Test allergie 2024", date: "2024" },
      { name: "Radio thorax contrôle", date: "Fév. 26" }
    ],
    notes: "Asthme bien contrôlé. VEMS 78%. Pas de crise. Suivi J+90.",
    iaDiags: [
      { date: "05/03/2026", diag: "Asthme sévère contrôlé", pct: 91, conc: "Concordant" },
      { date: "12/11/2025", diag: "Asthme partiel", pct: 88, conc: "Concordant" }
    ],
    iaDiffs: [
      { diag: "BPCO", pct: 12 },
      { diag: "Trachéobronchite", pct: 6 },
      { diag: "Hyperinflation", pct: 4 }
    ],
    iaCriteria: [
      { label: "Obstruction réversible", ok: true }, { label: "Variabilité VEMS > 12%", ok: true },
      { label: "Symptômes nocturnes", ok: true }, { label: "Terrain atopique", ok: true },
      { label: "Réponse cortico inh.", ok: true }, { label: "Éosinophilie", ok: false }
    ],
    tl: [
      { date: "05/03/2026", title: "Asthme contrôlé", note: "VEMS 78%. Pas de crise.", ia: 91, color: "#059669", conc: "Concordant" },
      { date: "12/11/2025", title: "Asthme partiel", note: "CSI majoré.", ia: 88, color: "#D97706", conc: "Concordant" },
      { date: "18/06/2025", title: "Exacerbation mod.", note: "Hospit. 48h. Cortico IV.", ia: 85, color: "#DC2626", conc: "Concordant" }
    ]
  },
  5: {
    name: "MBOMA Éric", init: "ME", age: "55 ans", sex: "Masculin",
    id: "PNEU-003412", dob: "30/05/1969", city: "Bafoussam", tel: "+237 677 567 890",
    created: "20/04/2025", shared: true, status: "attente",
    diag: "BPCO stade III", diagSince: "Diagnostiqué le 20/04/2025", iaPct: 81,
    antecedents: ["Tabagisme 35 PA en cours", "Silicose professionnelle", "HTA traitée"],
    allergies: ["Codéine (nausées)"],
    treatments: [
      { name: "Indacatérol/Glycopyrronium", dose: "110/50µg/j LABA+LAMA" },
      { name: "Amlodipine", dose: "10mg/j HTA" },
      { name: "N-acétylcystéine", dose: "600mg/j" }
    ],
    vitals: { spo2: 88, fr: 28, temp: 37.2, pa: "148/95", fc: 102, poids: "70 kg" },
    docs: [
      { name: "EFR VEMS 38%", date: "Avr. 25" },
      { name: "TDM thorax haute rés.", date: "Mai 25" },
      { name: "Bilan préop en attente", date: "—" }
    ],
    notes: "BPCO très sévère. SpO₂ 88%. OLT en discussion. Résultats TDM en attente.",
    iaDiags: [
      { date: "22/02/2026", diag: "BPCO stade III sévère", pct: 81, conc: "Concordant" },
      { date: "10/10/2025", diag: "BPCO exacerbation", pct: 77, conc: "Concordant" }
    ],
    iaDiffs: [
      { diag: "Silicose évoluée", pct: 31 },
      { diag: "Emphysème bulleux", pct: 22 },
      { diag: "Cancer bronchique", pct: 11 }
    ],
    iaCriteria: [
      { label: "VEMS < 50%", ok: true }, { label: "Obstruction sévère", ok: true },
      { label: "Tabagisme > 30 PA", ok: true }, { label: "SpO₂ < 90%", ok: true },
      { label: "Exposition silice", ok: true }, { label: "Polyglobulie", ok: false }
    ],
    tl: [
      { date: "22/02/2026", title: "BPCO aggravation", note: "VEMS 38%. OLT discussion.", ia: 81, color: "#DC2626", conc: "Concordant" },
      { date: "10/10/2025", title: "BPCO exacerbation", note: "Hospit. 3j.", ia: 77, color: "#D97706", conc: "Concordant" }
    ]
  }
};


const STATUS_CONFIG = {
  actif: { label: "Actif", color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500", border: "border-emerald-200", ring: "bg-emerald-500" },
  urgent: { label: "Urgent", color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", border: "border-red-200", ring: "bg-red-500" },
  attente: { label: "En attente", color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-500", border: "border-amber-200", ring: "bg-amber-500" },
  cloture: { label: "Clôturé", color: "text-slate-500", bg: "bg-slate-100", dot: "bg-slate-400", border: "border-slate-200", ring: "bg-slate-400" },
};

// ─── HELPERS ───────────────────────────────────────────────────────────
function Avatar({ initials, size = "md", color = "bg-blue-600" }) {
  const sizes = { xs: "w-6 h-6 text-[10px]", sm: "w-7 h-7 text-xs", md: "w-8 h-8 text-sm", lg: "w-10 h-10 text-sm", xl: "w-12 h-12 text-base" };
  return <div className={`${sizes[size]} ${color} text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 tracking-tight`}>{initials}</div>;
}

function Badge({ children, variant = "blue" }) {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    red: "bg-red-50 text-red-700 border border-red-200",
    slate: "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${variants[variant]}`}>{children}</span>;
}

function PillTag({ label, variant = "slate", onRemove }) {
  const variants = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${variants[variant]}`}>
      {label}
      {onRemove && <button onClick={onRemove} className="ml-0.5 opacity-50 hover:opacity-100"><X size={10} /></button>}
    </span>
  );
}

function ProgressBar({ value, color = "bg-blue-600" }) {
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function IARing({ pct, size = 72 }) {
  const [displayed, setDisplayed] = useState(0);
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (circumference * pct) / 100;
  const color = pct >= 80 ? "#059669" : pct >= 70 ? "#1D6FEB" : "#D97706";

  useEffect(() => {
    setDisplayed(0);
    const iv = setInterval(() => {
      setDisplayed(prev => { if (prev >= pct) { clearInterval(iv); return pct; } return prev + 2; });
    }, 16);
    return () => clearInterval(iv);
  }, [pct]);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 72 72" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx="36" cy="36" r="30" fill="none" stroke="#F1F5F9" strokeWidth="6" />
        <circle cx="36" cy="36" r="30" fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * displayed) / 100}
          style={{ transition: "stroke-dashoffset 0.05s" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-black text-slate-800">{displayed}%</span>
      </div>
    </div>
  );
}

// ─── KPI CARD ──────────────────────────────────────────────────────────
function KpiCard({ label, value, delta, deltaUp, accent }) {
  const accents = {
    blue: "from-blue-500/10 to-transparent border-blue-100",
    green: "from-emerald-500/10 to-transparent border-emerald-100",
    red: "from-red-500/10 to-transparent border-red-100",
    slate: "from-slate-200/60 to-transparent border-slate-100",
  };
  const lineColor = {
    blue: "bg-blue-500", green: "bg-emerald-500", red: "bg-red-500", slate: "bg-slate-300"
  };
  return (
    <div className={`bg-white border rounded-xl p-4 relative overflow-hidden bg-gradient-to-br ${accents[accent]}`}>
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${lineColor[accent]} rounded-t-xl`} />
      <p className="text-[12px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{value}</p>
      {delta && <p className={`text-[11.5px] font-medium ${deltaUp ? "text-emerald-600" : "text-red-500"}`}>{delta}</p>}
    </div>
  );
}

// ─── PATIENT TABLE ROW ─────────────────────────────────────────────────
function PatientRow({ patient, selected, onClick }) {
  const st = STATUS_CONFIG[patient.status] || STATUS_CONFIG.actif;
  const avatarColors = { actif: "bg-blue-600", urgent: "bg-red-500", attente: "bg-amber-500", cloture: "bg-slate-400" };
  const iaBadge = patient.iaPct >= 80 ? "green" : patient.iaPct >= 70 ? "blue" : "amber";

  return (
    <tr onClick={onClick}
      className={`border-b border-slate-100 cursor-pointer transition-colors text-[13px]
        ${selected ? "bg-blue-50 border-blue-100" : "hover:bg-slate-50/70"}`}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar initials={patient.init} size="sm" color={avatarColors[patient.status]} />
          <div>
            <div className="font-semibold text-slate-900">{patient.name}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{patient.age} · {patient.city}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-slate-600">{patient.diag}</td>
      <td className="px-4 py-3">
        <Badge variant={iaBadge}>IA {patient.iaPct}%</Badge>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11.5px] font-semibold ${st.bg} ${st.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
          {st.label}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-500 text-[12.5px]">
        {patient.shared && <span className="inline-flex items-center gap-1 text-blue-600 text-[11px] font-medium"><Share2 size={11} />Partagé</span>}
      </td>
      <td className="px-4 py-3">
        <ChevronRight size={15} className={`transition-colors ${selected ? "text-blue-500" : "text-slate-300"}`} />
      </td>
    </tr>
  );
}

// ─── VITAL CARD ────────────────────────────────────────────────────────
function VitalCard({ label, value, unit, warn }) {
  return (
    <div className={`rounded-lg p-3 border ${warn ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</div>
      <div className={`text-[17px] font-black leading-none tracking-tight ${warn ? "text-red-600" : "text-emerald-700"}`}>
        {value}<span className="text-[11px] font-medium ml-0.5 opacity-70">{unit}</span>
      </div>
    </div>
  );
}

// ─── TREATMENT ROW ─────────────────────────────────────────────────────
function TreatmentRow({ name, dose }) {
  return (
    <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg mb-2">
      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
      <div>
        <div className="text-[13px] font-semibold text-slate-800">{name}</div>
        <div className="text-[11.5px] text-slate-500 mt-0.5">{dose}</div>
      </div>
    </div>
  );
}

// ─── SECTION HEADER ────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.6px] text-slate-400 mb-2.5 mt-4 first:mt-0">
      <Icon size={12} strokeWidth={2} />
      {label}
    </div>
  );
}

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-[12px] font-medium text-slate-400">{label}</span>
      <span className={`text-[12.5px] font-semibold text-slate-800 text-right ${mono ? "font-mono text-[11.5px] text-slate-500" : ""}`}>{value}</span>
    </div>
  );
}

// ─── DETAIL PANEL TABS ─────────────────────────────────────────────────
const TABS = [
  { id: "dossier", label: "Dossier", icon: FolderOpen },
  { id: "ia", label: "IA & Diag.", icon: Zap },
  { id: "history", label: "Historique", icon: History },
  { id: "status", label: "Statut", icon: Activity },
  { id: "access", label: "Accès", icon: Lock },
];

// ─── DOSSIER TAB ───────────────────────────────────────────────────────
function DossierTab({ p }) {
  const vitals = [
    { label: "SpO₂", value: p.vitals.spo2, unit: "%", warn: p.vitals.spo2 < 93 },
    { label: "Fréq. resp.", value: p.vitals.fr, unit: "c/min", warn: p.vitals.fr > 25 },
    { label: "Temp.", value: p.vitals.temp, unit: "°C", warn: p.vitals.temp > 38 },
    { label: "Pression art.", value: p.vitals.pa, unit: "", warn: false },
    { label: "Fréq. card.", value: p.vitals.fc, unit: "bpm", warn: p.vitals.fc > 100 },
    { label: "Poids", value: p.vitals.poids, unit: "", warn: false },
  ];

  return (
    <div className="p-4 space-y-1">
      {/* Identité */}
      <SectionHeader icon={UserRound} label="Identité" />
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4">
        <InfoRow label="ID dossier" value={p.id} mono />
        <InfoRow label="Date de naissance" value={p.dob} />
        <InfoRow label="Âge" value={p.age} />
        <InfoRow label="Sexe" value={p.sex} />
        <InfoRow label="Téléphone" value={p.tel} />
        <InfoRow label="Ville" value={p.city} />
        <InfoRow label="Médecin référent" value="Dr. Dupont" />
        <InfoRow label="Créé le" value={p.created} />
      </div>

      {/* Pathologie */}
      <SectionHeader icon={Stethoscope} label="Pathologie principale" />
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 mb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[14px] font-bold text-slate-900">{p.diag}</div>
            <div className="text-[12px] text-slate-500 mt-1">{p.diagSince}</div>
          </div>
          <Badge variant={p.iaPct >= 80 ? "green" : "blue"}>IA {p.iaPct}%</Badge>
        </div>
      </div>

      {/* Antécédents */}
      <SectionHeader icon={ClipboardList} label="Antécédents médicaux" />
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.antecedents.map((a, i) => <Pill key={i} label={a} variant="slate" />)}
      </div>

      {/* Allergies */}
      <SectionHeader icon={AlertTriangle} label="Allergies connues" />
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.allergies.map((a, i) => (
          <PillTag key={i} label={a} variant={a.toLowerCase().includes("aucune") ? "green" : "red"} />
        ))}
      </div>

      {/* Traitements */}
      <SectionHeader icon={Pill} label="Traitements en cours" />
      <div className="mb-4">
        {p.treatments.map((t, i) => <TreatmentRow key={i} {...t} />)}
      </div>

      {/* Vitaux */}
      <SectionHeader icon={Heart} label="Paramètres vitaux (dernière consultation)" />
      <div className="grid grid-cols-2 gap-2 mb-4">
        {vitals.map((v, i) => <VitalCard key={i} {...v} />)}
      </div>

      {/* Documents */}
      <SectionHeader icon={FileText} label="Documents & imagerie" />
      <div className="space-y-2 mb-4">
        {p.docs.map((d, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-white transition-colors group">
            <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <FileScan size={13} className="text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-slate-800 truncate">{d.name}</div>
            </div>
            <span className="text-[11px] text-slate-400 flex-shrink-0">{d.date}</span>
            <button className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100">
              <Download size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Notes */}
      <SectionHeader icon={MessageSquare} label="Notes cliniques" />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[12.5px] text-slate-700 leading-relaxed">
        {p.notes}
      </div>
    </div>
  );
}

// ─── IA TAB ────────────────────────────────────────────────────────────
function IATab({ p }) {
  const confLabel = p.iaPct >= 85 ? "Haute confiance" : p.iaPct >= 75 ? "Confiance moyenne" : "Confiance faible";
  const confVariant = p.iaPct >= 85 ? "green" : p.iaPct >= 75 ? "blue" : "amber";

  return (
    <div className="p-4">
      {/* Global score */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4 mb-5">
        <IARing pct={p.iaPct} size={72} />
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Concordance IA globale</div>
          <div className="text-[17px] font-black text-slate-900 leading-tight">{p.diag}</div>
          <div className="text-[11.5px] text-slate-500 mb-2">{p.iaDiags.length} analyses · {p.tl.length} consultations</div>
          <Badge variant={confVariant}>{confLabel}</Badge>
        </div>
      </div>

      {/* Diag history */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Tous les diagnostics IA</p>
      <div className="space-y-2 mb-5">
        {p.iaDiags.map((d, i) => (
          <div key={i} className={`p-3 rounded-xl border ${i === 0 ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200"}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-slate-900">{d.diag}</span>
              <Badge variant={d.pct >= 80 ? "green" : d.pct >= 70 ? "blue" : "amber"}>{d.pct}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{d.date}</span>
              <Badge variant="slate">{d.conc}</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Differentials */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Différentiels (dernière analyse)</p>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-5">
        {p.iaDiffs.map((d, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-[13px] font-medium text-slate-700 flex-1">{d.diag}</span>
            <ProgressBar value={d.pct} color={d.pct > 25 ? "bg-amber-400" : "bg-slate-300"} />
            <span className="text-[12px] font-bold text-slate-600 w-8 text-right">{d.pct}%</span>
          </div>
        ))}
      </div>

      {/* Criteria */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Critères retenus</p>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {p.iaCriteria.map((c, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-[12.5px] text-slate-700">{c.label}</span>
            {c.ok
              ? <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md"><CheckCircle2 size={11} />Présent</span>
              : <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md"><XCircle size={11} />Absent</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HISTORY TAB ───────────────────────────────────────────────────────
function HistoryTab({ p }) {
  return (
    <div className="p-4">
      {p.tl.map((t, i) => (
        <div key={i} className="flex gap-3 pb-5 last:pb-0">
          <div className="flex flex-col items-center w-5 flex-shrink-0 pt-0.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
            {i < p.tl.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
          </div>
          <div className="flex-1 pb-1">
            <div className="text-[11px] text-slate-400 mb-1">{t.date}</div>
            <div className="text-[13px] font-bold text-slate-900 mb-0.5">{t.title}</div>
            <div className="text-[12px] text-slate-500 leading-relaxed mb-2">{t.note}</div>
            <div className="flex gap-1.5">
              <Badge variant={t.ia >= 80 ? "green" : t.ia >= 70 ? "blue" : "amber"}>IA {t.ia}%</Badge>
              <Badge variant="slate">{t.conc}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STATUS TAB ────────────────────────────────────────────────────────
function StatusTab({ p, onStatusChange }) {
  const st = STATUS_CONFIG[p.status];
  const allStatuses = ["actif", "urgent", "attente", "cloture"];
  const statusLabels = { actif: "Actif", urgent: "Suivi urgent", attente: "En attente", cloture: "Clôturé" };
  const statusDesc = {
    actif: "Suivi médical en cours",
    urgent: "Consultation requise immédiatement",
    attente: "Examens complémentaires en cours",
    cloture: "Dossier fermé"
  };

  return (
    <div className="p-4">
      {/* Current status */}
      <div className={`${st.bg} ${st.border} border rounded-xl p-4 mb-5`}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${st.dot}`} />
          <span className={`text-[14px] font-bold ${st.color}`}>{st.label}</span>
        </div>
        <p className="text-[12.5px] text-slate-600">{statusDesc[p.status]}</p>
      </div>

      {/* Change status */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Changer le statut</p>
      <div className="space-y-2 mb-6">
        {allStatuses.map(s => {
          const cfg = STATUS_CONFIG[s];
          const active = s === p.status;
          return (
            <button key={s} onClick={() => onStatusChange(s)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all
                ${active ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}>
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <div>
                <div className="text-[13px] font-semibold">{statusLabels[s]}</div>
                <div className={`text-[11.5px] mt-0.5 ${active ? "opacity-70" : "text-slate-400"}`}>{statusDesc[s]}</div>
              </div>
              {active && <CheckCircle2 size={16} className="ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Next visit */}
      <div className="border-t border-slate-100 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Prochain suivi</p>
        <div className="flex gap-2">
          <input type="date" defaultValue="2026-03-26"
            className="flex-1 px-3 py-2 text-[13px] bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          <button className="px-4 py-2 bg-blue-600 text-white text-[13px] font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ACCESS TAB ────────────────────────────────────────────────────────
function AccessTab() {
  const [martinVisible, setMartinVisible] = useState(true);
  return (
    <div className="p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Médecins ayant accès</p>
      {/* Owner */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl mb-2">
        <Avatar initials="JD" size="sm" color="bg-blue-600" />
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-slate-900">Dr. Jean Dupont (vous)</div>
          <div className="text-[11px] text-slate-500">Propriétaire · Pneumologue, Douala</div>
        </div>
        <Badge variant="blue">Propriétaire</Badge>
      </div>
      {/* Martin */}
      {martinVisible && (
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-2">
          <Avatar initials="DM" size="sm" color="bg-slate-400" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-900">Dr. Martin</div>
            <div className="text-[11px] text-slate-500">Accès depuis le 07/03/2026</div>
          </div>
          <button onClick={() => setMartinVisible(false)}
            className="text-[11.5px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors">
            Révoquer
          </button>
        </div>
      )}
      {/* Add */}
      <div className="border-t border-slate-100 mt-4 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Ajouter un accès</p>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-dashed border-slate-300 rounded-xl text-[13px] font-semibold text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
          <Plus size={14} />Envoyer une demande de partage
        </button>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ──────────────────────────────────────────────────────
function DetailPanel({ patient, onClose, onStatusChange }) {
  const [tab, setTab] = useState("dossier");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => { setTab("dossier"); setEditMode(false); }, [patient?.id]);

  if (!patient) return null;

  const st = STATUS_CONFIG[patient.status];

  return (
    <div className="w-[450px] flex-shrink-0 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-200 flex items-center gap-3 flex-shrink-0">
        <div className="relative flex-shrink-0">
          <Avatar initials={patient.init} size="lg" color={patient.status === "urgent" ? "bg-red-500" : patient.status === "attente" ? "bg-amber-500" : "bg-blue-600"} />
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${st.ring}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold text-slate-900 leading-tight">{patient.name}</div>
          <div className="text-[12px] text-slate-400 mt-0.5">{patient.age} · {patient.sex} · {patient.city}</div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Actions */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[12.5px] font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <Stethoscope size={12} />Consulter
        </a>
        <button onClick={() => setEditMode(!editMode)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-[12.5px] font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          <Edit3 size={12} />Modifier
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-[12.5px] font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          <Download size={12} />Télécharger
        </button>
        <button className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors">
          <Trash2 size={13} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-2 flex-shrink-0 overflow-x-auto">
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-medium border-b-2 whitespace-nowrap transition-all
                ${tab === t.id ? "border-blue-600 text-blue-700" : "border-transparent text-slate-400 hover:text-slate-700"}`}>
              <Icon size={13} strokeWidth={1.8} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab body */}
      <div className="flex-1 overflow-y-auto">
        {tab === "dossier" && <DossierTab p={patient} />}
        {tab === "ia" && <IATab p={patient} />}
        {tab === "history" && <HistoryTab p={patient} />}
        {tab === "status" && <StatusTab p={patient} onStatusChange={onStatusChange} />}
        {tab === "access" && <AccessTab />}
      </div>
    </div>
  );
}

// ─── TOAST ─────────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 flex items-start gap-3 min-w-[240px] max-w-[300px] animate-in slide-in-from-right-4 duration-200">
          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${t.type === "success" ? "bg-emerald-500" : t.type === "error" ? "bg-red-500" : "bg-blue-500"}`} />
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-slate-800">{t.title}</div>
            {t.msg && <div className="text-[12px] text-slate-500 mt-0.5">{t.msg}</div>}
          </div>
          <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-600 mt-0.5"><X size={13} /></button>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [patients, setPatients] = useState(PATIENTS);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [toasts, setToasts] = useState([]);
  let toastId = useRef(0);

  const addToast = (type, title, msg) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, type, title, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  };

  const handleStatusChange = (newStatus) => {
    if (!selected) return;
    setPatients(prev => ({ ...prev, [selected]: { ...prev[selected], status: newStatus } }));
    addToast("success", "Statut mis à jour", STATUS_CONFIG[newStatus]?.label);
  };

  const filteredPatients = Object.entries(patients).filter(([, p]) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.diag.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "urgent" && p.status === "urgent") || (filter === "shared" && p.shared);
    return matchSearch && matchFilter;
  });

  const currentPatient = selected ? patients[selected] : null;

  return (
    <div className={`flex h-screen overflow-hidden font-sans antialiased ${dark ? "dark bg-slate-950" : "bg-slate-50"}`}
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      <Toast toasts={toasts} remove={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* List pane */}
          <div className="flex-1 min-w-0 overflow-y-auto p-5">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              <KpiCard label="Total patients" value="134" delta="↑ +12 ce trimestre" deltaUp accent="blue" />
              <KpiCard label="Consultés ce mois" value="28" delta="↑ +5 vs février" deltaUp accent="green" />
              <KpiCard label="Suivis urgents" value="3" delta="Action requise" deltaUp={false} accent="red" />
              <KpiCard label="Dossiers partagés" value="7" delta="Actifs" deltaUp accent="slate" />
            </div>

            {/* Filters + actions */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                {[
                  { id: "all", label: "Tous", count: 134 },
                  { id: "urgent", label: "Urgents", count: 3 },
                  { id: "shared", label: "Partagés" },
                ].map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)}
                    className={`px-3 py-1.5 rounded-md text-[12.5px] font-semibold transition-all
                      ${filter === f.id ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
                    {f.label}
                    {f.count && <span className={`ml-1.5 text-[11px] font-normal ${filter === f.id ? "text-blue-200" : "text-slate-400"}`}>{f.count}</span>}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download size={13} />Exporter CSV
                </button>
                <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-semibold text-white bg-blue-600 border border-blue-700 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={13} />Nouveau patient
                </a>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Patient</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Pathologie</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Concordance</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Partage</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map(([id, p]) => (
                    <PatientRow key={id} patient={p} selected={selected === id}
                      onClick={() => setSelected(selected === id ? null : id)} />
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400 text-[13.5px]">Aucun patient trouvé</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          {currentPatient && (
            <DetailPanel
              patient={currentPatient}
              onClose={() => setSelected(null)}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}