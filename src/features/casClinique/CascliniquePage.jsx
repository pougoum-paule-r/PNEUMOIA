// src/features/casClinique/CasCliniquePage.jsx
import HeroCasClinique from './components/HeroCasClinique';
import Statscard from './components/StatsCards';
import Librarie from './components/LibrarySection';
import Footer from '../../components/layout/Footer';

// Pas d'import Footer

export default function CasCliniquePage() {
  return (
    <div>
      <HeroCasClinique />
      <Statscard />
      <Librarie />
      {/* Pas de Footer ici */}
      <Footer/>
    </div>
  );
}