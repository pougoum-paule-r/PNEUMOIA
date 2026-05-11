import React from "react";

const concordanceItems = [
  { label: "Asthme severe", value: 88, color: "bg-teal-500" },
  { label: "Pneumonie bacterienne", value: 85, color: "bg-teal-500" },
  { label: "BPCO", value: 83, color: "bg-teal-500" },
  { label: "Tuberculose", value: 82, color: "bg-blue-500" },
  { label: "Epanchement pleural", value: 76, color: "bg-orange-400" },
  { label: "Normal (pas de pathologie)", value: 57, color: "bg-red-400" },
];

const activityItems = [
  { color: "bg-teal-500", time: "Auj, 11:30", text: "Dr. Sow - inscription validee" },
  { color: "bg-blue-500", time: "Auj, 09:15", text: "Mise a jour IA v2.4.1 deployee" },
  { color: "bg-orange-400", time: "Hier, 16:30", text: "Dr. Mbang - acces suspendu" },
  { color: "bg-red-500", time: "14 mars", text: "Dr. Tabi - inscription refusee (CNOM invalide)" },
];

export default function ConcordanceIA({ darkMode }) {
  const visibleActivity = activityItems.slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`rounded-2xl border p-4 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
            Concordance IA
          </h2>
          <span className="text-xs font-bold text-teal-500 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
            v2.4.1
          </span>
        </div>

        <div className="space-y-2.5">
          {concordanceItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.label}</span>
                <span className={`text-xs font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{item.value}%</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`rounded-2xl border p-4 max-h-[300px] overflow-y-auto ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <h2 className={`font-semibold text-sm mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Activite recente
        </h2>

        <div className="space-y-3">
          {visibleActivity.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${item.color}`} />
                {i < visibleActivity.length - 1 && (
                  <div className={`w-px flex-1 mt-1 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`} style={{ minHeight: "20px" }} />
                )}
              </div>
              <div className="pb-2">
                <p className={`text-[10px] font-medium uppercase tracking-wide ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {item.time}
                </p>
                <p className={`text-xs mt-0.5 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
