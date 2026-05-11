import React, { useEffect, useMemo, useState } from "react";
import useAdminTheme from "../hooks/useAdminTheme";
import useAdminNotificationCount from "../hooks/useAdminNotificationCount";
import RefusModal from "../components/RefusModal";
import DossierModal from "../components/DossierModal";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
const MOCK_DEMANDES = [
  {
    id: 1,
    initials: "AS",
    name: "Dr. Aminata Sow",
    specialite: "Pneumologue",
    hopital: "H. Laquintinie, Douala",
    ville: "Douala",
    email: "a.sow@laquintinie.cm",
    telephone: "+237 677 111 222",
    cnom: "CM-2024-1122",
    soumisLe: "Auj. 08:00",
    time: "Auj. 08:00",
    docsStatus: "OK",
    status: "pending",
    avatarIndex: 0,
    documents: [
      { label: "Diplome de pneumologie 2019", status: "verified" },
      { label: "Carte CNOM 2024", status: "verified" },
      { label: "Attestation d'exercice", status: "verified" }
    ]
  },
  {
    id: 2,
    initials: "PE",
    name: "Dr. Paul Essomba",
    specialite: "Pneumologue",
    hopital: "CHU de Yaounde",
    ville: "Yaounde",
    email: "p.essomba@chuyde.cm",
    telephone: "+237 699 333 444",
    cnom: "CM-2023-0988",
    soumisLe: "Hier 14:22",
    time: "Hier 14:22",
    docsStatus: "WAIT",
    status: "pending",
    avatarIndex: 1,
    documents: [
      { label: "Diplome de pneumologie", status: "pending" },
      { label: "Carte CNOM 2023", status: "verified" },
      { label: "Attestation d'exercice", status: "verified" }
    ]
  },
  {
    id: 3,
    initials: "FK",
    name: "Dr. Fatou Konate",
    specialite: "Pneumologue",
    hopital: "H. Central, Bafoussam",
    ville: "Bafoussam",
    email: "f.konate@hcb.cm",
    telephone: "+237 655 789 012",
    cnom: "CM-2024-0311",
    soumisLe: "Il y a 2j",
    time: "Il y a 2j",
    docsStatus: "OK",
    status: "pending",
    avatarIndex: 2,
    documents: [
      { label: "Diplome de pneumologie 2020", status: "verified" },
      { label: "Carte CNOM 2024", status: "verified" },
      { label: "Attestation d'exercice", status: "verified" }
    ]
  },
  {
    id: 4,
    initials: "MB",
    name: "Dr. Michel Biya",
    specialite: "Radiologue",
    hopital: "Clinique de l'Estuaire, Libreville",
    ville: "Libreville",
    email: "m.biya@estuaire.ga",
    telephone: "+241 077 456 789",
    cnom: "GA-2024-0099",
    soumisLe: "Il y a 3j",
    time: "Il y a 3j",
    docsStatus: "MISS",
    status: "pending",
    avatarIndex: 3,
    documents: [
      { label: "Diplome de radiologie 2021", status: "missing" },
      { label: "Carte CNOM 2024", status: "missing" }
    ]
  }
];

function DocumentsTags({ documents }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {documents.map((d, index) => {
        const ok = d.status === "verified";
        const pending = d.status === "pending";
        const statusLabel = ok ?"OK" : pending ?"WAIT" : "MISS";

        return (
          <span
            key={`${d.label}-${index}`}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
              ok
                ?"bg-emerald-50 text-emerald-700"
                : pending
                ?"bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            [{statusLabel}] {d.label}
          </span>
        );
      })}
    </div>
  );
}

export default function NouvellesDemandes() {
  const { darkMode, setDarkMode } = useAdminTheme();
  const [activeKey, setActiveKey] = useState("nouvelles");
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [demandes, setDemandes] = useState(MOCK_DEMANDES);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [refusDoc, setRefusDoc] = useState(null);
  const { setCount: setGlobalNotificationCount } = useAdminNotificationCount();

  const pending = useMemo(() => demandes.filter((item) => item.status === "pending"), [demandes]);

  useEffect(() => {
    setGlobalNotificationCount(pending.length);
  }, [pending.length, setGlobalNotificationCount]);

  const handleAction = (id, action) => {
    setDemandes((prev) => prev.map((item) => (item.id === id ?{ ...item, status: action } : item)));
  };

  const handleExportCSV = () => {
    const headers = ["Nom", "CNOM", "Specialite", "Etablissement", "Ville", "Email", "Telephone", "Statut", "Soumis le"];
    const rows = pending.map((d) => [d.name, d.cnom, d.specialite, d.hopital, d.ville, d.email, d.telephone, d.docsStatus, d.soumisLe]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `nouvelles_demandes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className={`min-h-screen flex admin-theme transition-colors duration-300 ${darkMode ?"bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar activeKey={activeKey} setActiveKey={setActiveKey} darkMode={darkMode} isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} notificationCount={pending.length} />

        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Nouvelles demandes</h1>
              <p className={`text-sm mt-1 ${darkMode ?"text-gray-400" : "text-gray-500"}`}>
                Validation manuelle obligatoire. Chaque dossier est verifie avant activation du compte.
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                darkMode
                  ?"border-gray-700 text-gray-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:bg-teal-600 hover:border-teal-600 hover:text-white"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
          </div>

          <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${darkMode ?"bg-teal-900/20 border-teal-700/40 text-teal-200" : "bg-teal-50 border-teal-200 text-teal-700"}`}>
            Verifier : <span className="font-semibold">N degre CNOM</span>, <span className="font-semibold">diplome de specialite</span>, <span className="font-semibold">attestation d'exercice en cours de validite</span>.
            Le medecin recoit un e-mail automatique a chaque decision.
          </div>

          <div className="space-y-4">
            {pending.length === 0 ?(
              <div className={`rounded-2xl border p-12 text-center ${darkMode ?"border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
                <p className={`text-sm ${darkMode ?"text-gray-400" : "text-gray-500"}`}>Toutes les demandes ont ete traitees.</p>
              </div>
            ) : (
              pending.map((doc) => {
                const hasMissing = doc.documents.some((d) => d.status === "missing" || d.status === "pending");

                return (
                  <article
                    key={doc.id}
                    className={`rounded-2xl border p-4 sm:p-5 ${
                      hasMissing
                        ?darkMode
                          ?"border-amber-700/60 bg-amber-950/10"
                          : "border-amber-300 bg-white"
                        : darkMode
                        ?"border-teal-800/60 bg-teal-950/10"
                        : "border-teal-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center">{doc.initials}</div>
                        <div>
                          <h3 className="text-2xl font-semibold">{doc.name}</h3>
                          <p className={`text-base ${darkMode ?"text-gray-300" : "text-gray-600"}`}>{doc.specialite} - {doc.hopital}</p>
                          <p className={`text-sm ${darkMode ?"text-gray-400" : "text-gray-500"}`}>CNOM : {doc.cnom} - {doc.email} - {doc.telephone}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-sm ${darkMode ?"text-gray-400" : "text-gray-500"}`}>{doc.time}</p>
                        <span className={`mt-2 inline-flex px-3 py-1 rounded-lg text-sm font-medium ${hasMissing ?"bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {hasMissing ?"Document manquant" : "Dossier complet"}
                        </span>
                      </div>
                    </div>

                    {hasMissing && (
                      <div className={`mt-4 rounded-xl border px-4 py-3 text-base ${darkMode ?"bg-amber-900/20 border-amber-700/50 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                        Document manquant : la validation ne peut pas etre effectuee.
                      </div>
                    )}

                    <div className={`mt-4 rounded-xl border p-4 ${darkMode ?"bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                      <p className={`text-base ${darkMode ?"text-gray-300" : "text-gray-600"}`}>Documents soumis - cliquez pour visualiser</p>
                      <DocumentsTags documents={doc.documents} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {!hasMissing ?(
                        <button onClick={() => handleAction(doc.id, "validated")} className="inline-flex items-center gap-1.5 text-base font-semibold text-teal-700 border border-teal-300 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-xl transition-colors">
                          Valider l'inscription
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1.5 text-base font-semibold text-amber-700 border border-amber-300 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors">
                          Relancer par e-mail
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedDossier(doc)}
                        className={`inline-flex items-center gap-1.5 text-base font-semibold border px-4 py-2 rounded-xl transition-colors ${
                          darkMode ?"border-gray-700 text-gray-200 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Voir dossier complet
                      </button>

                      <button
                        onClick={() => setRefusDoc(doc)}
                        className="inline-flex items-center gap-1.5 text-base font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
                      >
                        Refuser ce dossier
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </main>
      </div>

      {selectedDossier && (
        <DossierModal
          doc={selectedDossier}
          darkMode={darkMode}
          onClose={() => setSelectedDossier(null)}
          onValidate={(id) => handleAction(id, "validated")}
          onRefuse={(doc) => setRefusDoc(doc)}
        />
      )}

      {refusDoc && (
        <RefusModal
          doctorName={refusDoc.name}
          darkMode={darkMode}
          onClose={() => setRefusDoc(null)}
          onConfirm={() => {
            handleAction(refusDoc.id, "refused");
            setRefusDoc(null);
          }}
        />
      )}
    </div>
  );
}




