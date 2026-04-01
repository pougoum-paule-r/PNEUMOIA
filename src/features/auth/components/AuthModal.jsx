import React from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si c'est pas ouvert, on n'affiche rien

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-100">
      <div className="bg-white p-8 rounded-lg w-96 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">✕</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Connexion Médicale</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email professionnel" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded font-bold">Se connecter</button>
        </form>
        <p className="mt-4 text-sm text-center">
          Pas de compte ? <span className="text-blue-600 cursor-pointer">S'inscrire</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;