// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import CasCliniquePage from './features/casClinique/CascliniquePage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>  {/* Un seul Router ici */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/apropos" element={<AboutPage />} />
          <Route path="/cas-cliniques" element={<CasCliniquePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;