import React from "react";

export default function SystemIndicators({
  stats,
  darkMode,
}) {
  return (
    <div className={`rounded-2xl border p-6 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    }`}>
      <h3 className={`font-semibold text-lg mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Indicateurs système
      </h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Version modèle</span>
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{stats.modelVersion}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Dernière MAJ</span>
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{stats.lastUpdate}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Cas d’entraînement</span>
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
            {stats.trainingCases.toLocaleString("fr-FR")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Médecins contributeurs</span>
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{stats.contributors}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Concordance globale</span>
          <span className="font-bold text-emerald-600">{stats.globalConcordance}%</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Statut API</span>
          <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">
            {stats.apiStatus}
          </span>
        </div>
      </div>
    </div>
  );
}