// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import CasCliniquePage from './features/casClinique/CascliniquePage';
import Fonctionnalité from './features/fonctionnaliés/FeaturesPage';
import MainLayout from './layouts/MainLayout';


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
        <Route path="/administrateur/login" element={<AdminLogin />} />
        <Route path="/administrateur/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
