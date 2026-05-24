import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

function EyeOpen() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// Indicateur de force du mot de passe
function PasswordStrength({ password }) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;

  const levels = [
    { label: "Très faible", color: "bg-red-400" },
    { label: "Faible",      color: "bg-orange-400" },
    { label: "Moyen",       color: "bg-yellow-400" },
    { label: "Fort",        color: "bg-teal-400" },
    { label: "Très fort",   color: "bg-teal-600" },
  ];
  const level = levels[score] || levels[0];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? level.color : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      <p className={`text-[11px] font-medium ${
        score <= 1 ? "text-red-500" : score === 2 ? "text-yellow-500" : "text-teal-600"
      }`}>
        {level.label}
      </p>
    </div>
  );
}

export default function AdminResetPassword() {
  const [form, setForm] = useState({ phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      // --- Mode frontend-only : simulation ---
      // Remplacer par l'appel API réel :
      /*
      const response = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, new_password: form.password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Erreur lors de la réinitialisation.");
      }
      */
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess(true);
      setTimeout(() => navigate('/administrateur/login'), 3000);
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-sm">

        {/* Logo + titre */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              <span className="text-blue-600">Pneumo</span>IA
            </h1>
            <p className="text-gray-400 text-xs tracking-widest uppercase mt-0.5">Espace Administrateur</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-8">

          {/* En-tête */}
          <div className="mb-7 text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Nouveau mot de passe</h2>
            <p className="text-gray-400 text-sm mt-1">Réinitialisez votre accès administrateur</p>
          </div>

          {/* Message de succès */}
          {success ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">Mot de passe réinitialisé !</p>
                <p className="text-sm text-gray-400 mt-1">Redirection vers la connexion dans quelques instants…</p>
              </div>
            </div>
          ) : (
            <>
              {/* Erreur */}
              {error && (
                <div className="mb-5 flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Téléphone */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Numéro de téléphone
                  </label>
                  <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-150 bg-white ${
                    phoneFocus ? "border-teal-500 ring-2 ring-teal-500/10" : "border-gray-200"
                  }`}>
                    <span className="text-sm text-gray-400 font-medium flex-shrink-0 border-r border-gray-200 pr-2.5">+237</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setPhoneFocus(true)}
                      onBlur={() => setPhoneFocus(false)}
                      required
                      autoComplete="tel"
                      className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
                      placeholder="6XX XXX XXX"
                      pattern="[0-9]{9}"
                      maxLength={9}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                    Numéro associé à votre compte administrateur
                  </p>
                </div>

                {/* Nouveau mot de passe */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-150 bg-white ${
                    pwdFocus ? "border-teal-500 ring-2 ring-teal-500/10" : "border-gray-200"
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                      <circle cx="12" cy="16" r="1" fill="#9ca3af"/>
                    </svg>
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      required
                      autoComplete="new-password"
                      className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
                      placeholder="Minimum 8 caractères"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                      {showPwd ? <EyeOff /> : <EyeOpen />}
                    </button>
                  </div>
                  <PasswordStrength password={form.password} />
                </div>

                {/* Confirmation */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all duration-150 bg-white ${
                    confirmFocus
                      ? "border-teal-500 ring-2 ring-teal-500/10"
                      : form.confirm && form.confirm !== form.password
                      ? "border-red-300 ring-2 ring-red-200/40"
                      : "border-gray-200"
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M9 12l2 2 4-4"/>
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      onFocus={() => setConfirmFocus(true)}
                      onBlur={() => setConfirmFocus(false)}
                      required
                      autoComplete="new-password"
                      className="flex-1 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
                      placeholder="Répétez le mot de passe"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                      {showConfirm ? <EyeOff /> : <EyeOpen />}
                    </button>
                  </div>
                  {form.confirm && form.confirm !== form.password && (
                    <p className="text-[11px] text-red-500 mt-1.5 ml-1">Les mots de passe ne correspondent pas</p>
                  )}
                  {form.confirm && form.confirm === form.password && form.confirm.length >= 8 && (
                    <p className="text-[11px] text-teal-600 mt-1.5 ml-1 flex items-center gap-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Les mots de passe correspondent
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all duration-150 shadow-sm shadow-teal-200 mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                      </svg>
                      Réinitialisation…
                    </>
                  ) : (
                    <>
                      Réinitialiser le mot de passe
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Retour connexion */}
        <div className="flex items-center justify-center mt-5 gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <Link
            to="/administrateur/login"
            className="text-xs text-gray-400 hover:text-teal-600 transition-colors font-medium"
          >
            Retour à la connexion
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} PneumoIA · Tous droits réservés
        </p>
      </div>
    </div>
  );
}