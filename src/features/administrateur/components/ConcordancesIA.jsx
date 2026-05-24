import React from "react";

export default function ConcordancesIA({ darkMode }) {
  return (
    <div className={`rounded-2xl border p-5 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
      <h3 className="font-semibold text-sm">Concordances IA</h3>
      <p className="text-xs text-gray-500 mt-2">Statistiques de concordance IA (placeholder)</p>
    </div>
  );
}
