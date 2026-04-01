import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/**
 * Layout principal qui enveloppe toutes les pages
 * Contient la barre de navigation et le footer communs
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu de la page
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;