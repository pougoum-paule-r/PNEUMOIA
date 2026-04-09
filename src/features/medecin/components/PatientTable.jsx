// src/features/medecin/components/PatientTable.jsx
import { Eye, Trash2, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  actif: { label: 'Actif', class: 'bg-green-100 text-green-700' },
  urgent: { label: 'Urgent', class: 'bg-red-100 text-red-700' },
  attente: { label: 'En attente', class: 'bg-orange-100 text-orange-700' }
};

export default function PatientTable({ patients, onViewPatient, onDeletePatient }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pathologie</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Concordance IA</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dernière consultation</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Prochain suivi</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {patients.map((patient) => (
              <tr 
                key={patient.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group"
                onClick={() => onViewPatient(patient)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-sm">
                      {patient.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {patient.name}
                      </div>
                      <div className="text-xs text-gray-500">{patient.age} ans · {patient.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    patient.pathologie.includes('Pneumonie') ? 'bg-red-100 text-red-700' :
                    patient.pathologie.includes('BPCO') ? 'bg-orange-100 text-orange-700' :
                    patient.pathologie.includes('Tuberculose') ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {patient.pathologie}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${patient.iaConfidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {patient.iaConfidence}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(patient.lastConsultation).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4">
                  {patient.nextAppointment ? (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(patient.nextAppointment).toLocaleDateString('fr-FR')}
                    </span>
                  ) : (
                    <span className="text-sm text-red-500">Non planifié</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/medecin/consultation/${patient.id}`);
                      }}
                      className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                      title="Consulter"
                    >
                      <Stethoscope className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewPatient(patient);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePatient(patient);
                      }}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}