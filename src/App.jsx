// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import CasCliniquePage from './features/casClinique/CascliniquePage';
import Fonctionnalité from './features/fonctionnaliés/FeaturesPage';
import MainLayout from './layouts/MainLayout';
import MonitoringIA from './features/administrateur/pages/MonitoringIA';


//SECTION MEDECIN 

import MedecinLayout from './features/medecin/layout/MedecinLayout';
import Dashboard from './features/medecin/pages/Dashboard';
import Consultation from './features/medecin/pages/Consultations';
import Patients from './features/medecin/pages/Patients';
import Notification from './features/medecin/pages/Notifications';
import Profil from './features/medecin/pages/Profil';
import Historique from './features/medecin/pages/Historique';


//SECTION ADMINISTRATEUR
import AdminLogin from './features/administrateur/authAdm/adminLogin';
import AdminDashboard from './features/administrateur/pages/AdminDashBoard';
import JournalAudit from './features/administrateur/pages/JournalAudit';



function App() {
  return (
    <BrowserRouter>  {/* Un seul Router ici */}
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/apropos" element={<AboutPage />} />
          <Route path="/cas-cliniques" element={<CasCliniquePage />} />
          <Route path="/fonctionnalites" element={<Fonctionnalité />} />
        </Route>

        {/* ROUTE CONCERNANT LA SECTION MEDECIN */}
        <Route path="/medecin" element={<MedecinLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="patients" element={<Patients />} />
          <Route path="partage" element={<div>Partage</div>} />
          <Route path="cas-cliniques" element={<div>Cas cliniques</div>} />
          <Route path="messagerie" element={<div>Messagerie</div>} />
          <Route path="notifications" element={<Notification/>} />
          <Route path="recherche" element={<div>Ma RECHERCHE</div>} />
          <Route path="profil" element={ <Profil/>} />
          <Route path="parametres" element={<div>Paramètres</div>} />
          <Route path="historique" element={<Historique/>} />
        </Route>



        {/* ROUTE ADMINISTRATEUR (AJOUTÉ UNIQUEMENT) */}
        <Route path="/login/admin" element={<Navigate replace to="/administrateur/login" />} />
        <Route path="/login/administrateur" element={<Navigate replace to="/administrateur/login" />} />
        <Route path="/admin/dashboard" element={<Navigate replace to="/administrateur/dashboard" />} />
        <Route path="/administrateur" element={<Navigate replace to="/administrateur/dashboard" />} />
        <Route path="/administrateur/login" element={<AdminLogin />} />
        <Route path="/administrateur/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/inscriptions/nouvelles" element={<Navigate replace to="/administrateur/inscriptions/nouvelles" />} />
        <Route path="/administrateur/inscriptions/nouvelles" element={<div>Nouvelles demandes</div>} />
        <Route path="/administrateur/inscriptions/validees" element={<div>Validées</div>} />
        <Route path="/administrateur/inscriptions/refusees" element={<div>Refusées</div>} />

        <Route path="/administrateur/medecins/actifs" element={<div>Médecins actifs</div>} />
        <Route path="/administrateur/medecins/suspendus" element={<div>Médecins suspendus</div>} />

        <Route path="/admin/monitoring-ia" element={<Navigate replace to="/administrateur/monitoring-ia" />} />
        <Route path="/administrateur/monitoring-ia" element={<MonitoringIA />} />
        <Route path="/admin/journal-audit" element={<Navigate replace to="/administrateur/journal-audit" />} />
        <Route path="/admin/parametres" element={<Navigate replace to="/administrateur/parametres" />} />
        <Route path="/administrateur/journal-audit" element={<JournalAudit />} />
        <Route path="/administrateur/parametres" element={<div>Paramètres</div>} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700">
              <div className="max-w-md text-center p-6 bg-white border border-gray-200 rounded-3xl shadow-sm">
                <h1 className="text-2xl font-bold mb-3">Page introuvable</h1>
                <p className="text-sm text-gray-500 mb-6">L'adresse n'existe pas ou a été modifiée.</p>
                <a href="/" className="inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
                  Retour à l'accueil
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
