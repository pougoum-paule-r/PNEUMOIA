// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import{ ThemeProvider } from './features/medecin/contexts/ThemeContext';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import CasCliniquePage from './features/casClinique/CascliniquePage';
import Fonctionnalité from './features/fonctionnaliés/FeaturesPage';
import MainLayout from './layouts/MainLayout';
// MonitoringIA page removed from admin section


//SECTION MEDECIN 

import MedecinLayout from './features/medecin/layout/MedecinLayout';
import Dashboard from './features/medecin/pages/Dashboard';
import Consultation from './features/medecin/pages/Consultations';
import Patients from './features/medecin/pages/Patients';
import Notification from './features/medecin/pages/Notifications';
import Profil from './features/medecin/pages/Profil';
import Historique from './features/medecin/pages/Historique';
import Partage from './features/medecin/pages/Partage';
import Parametre from './features/medecin/pages/Parametres';
import CasClinique from './features/medecin/pages/CasCliniques';
import Recherche from './features/medecin/pages/Recherche';
import Messagerie from './features/medecin/pages/Messagerie';


//SECTION ADMINISTRATEUR
import AdminLogin from './features/administrateur/authAdm/adminLogin';
import AdminResetPassword from './features/administrateur/authAdm/resetPassword';
import AdminDashboard from './features/administrateur/pages/AdminDashBoard';
import JournalAudit from './features/administrateur/pages/JournalAudit';
import ParametresPlateforme from './features/administrateur/pages/ParametrePLateforme';
import MedecinsSuspendus from './features/administrateur/pages/Suspendus';
import MedecinsActifs from './features/administrateur/pages/MedecinsActifs';
import Refusees from './features/administrateur/pages/Refusees';
import ValideesCemois from './features/administrateur/pages/ValideesCemois';
import NouvellesDemandes from './features/administrateur/pages/nouvellesDemandes';



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
          <Route path="partage" element={<Partage />} />
          <Route path="cas-cliniques" element={<CasClinique />} />
          <Route path="messagerie" element={<Messagerie />} />
          <Route path="notifications" element={<Notification/>} />
          <Route path="recherche" element={<Recherche />} />
          <Route path="profil" element={ <Profil/>} />
          <Route path="parametres" element={<Parametre/>} />
          <Route path="historique" element={<Historique/>} />
        </Route>

        {/* ROUTE CONCERNANT LA SECTION ADMINISTRATEUR */}
        <Route path="/administrateur">
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="reset-password" element={<AdminResetPassword />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inscriptions">
            <Route path="nouvelles" element={<NouvellesDemandes />} />
            <Route path="validees" element={<ValideesCemois />} />
            <Route path="refusees" element={<Refusees />} />
          </Route>
          <Route path="medecins">
            <Route path="actifs" element={<MedecinsActifs />} />
            <Route path="suspendus" element={<MedecinsSuspendus />} />
          </Route>
          <Route path="journal-audit" element={<JournalAudit />} />
          <Route path="parametres" element={<ParametresPlateforme />} />
        </Route>
      </Routes>
       
    </BrowserRouter>
  );
}

export default App;




