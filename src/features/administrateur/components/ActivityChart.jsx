import React from "react";

// Données statiques — 7 derniers jours
const data = [
  { day: "L", value: 580 },
  { day: "M", value: 720 },
  { day: "M", value: 640 },
  { day: "J", value: 890 },
  { day: "V", value: 750 },
  { day: "S", value: 430 },
  { day: "D", value: 831 },
];

const total = data.reduce((acc, d) => acc + d.value, 0);
const maxVal = Math.max(...data.map((d) => d.value));

export default function ActivityChart({ darkMode }) {
  return (
    <div className={`rounded-2xl border p-5 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
            Activité consultations
          </h2>
          <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            7 derniers jours
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
          darkMode
            ? "bg-teal-900/30 text-teal-400 border-teal-800"
            : "bg-teal-50 text-teal-600 border-teal-100"
        }`}>
          {total.toLocaleString("fr-FR")} total
        </span>
      </div>

      {/* Barres */}
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => {
          const heightPct = (d.value / maxVal) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="relative w-full flex items-end justify-center" style={{ height: "100px" }}>
                {/* Tooltip */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-medium px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {d.value}
                </div>
                <div
                  className="w-full rounded-t-lg transition-all duration-500 cursor-pointer group-hover:opacity-80"
                  style={{
                    height: `${heightPct}%`,
                    background: darkMode
                      ? "linear-gradient(180deg, #2dd4bf 0%, #0d9488 100%)"
                      : "linear-gradient(180deg, #14b8a6 0%, #0d9488 100%)",
                    minHeight: "6px",
                  }}
                />
              </div>
              <span className={`text-[10px] font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className={`mt-4 pt-4 border-t flex items-center gap-4 ${
        darkMode ? "border-gray-700" : "border-gray-100"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-teal-500" />
          <span className={`text-[11px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Consultations / jour
          </span>
        </div>
        <div className={`ml-auto text-[11px] font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Moy. {Math.round(total / data.length).toLocaleString("fr-FR")} / jour
        </div>
      </div>
    </div>
  );
}
