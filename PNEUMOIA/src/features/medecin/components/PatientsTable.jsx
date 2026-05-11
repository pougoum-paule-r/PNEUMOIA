// src/features/medecin/components/PatientsTable.jsx
import { PatientCard } from './PatientsCard';
import { useFormatters } from '../hooks/useFormatters';

export function PatientsTable({
  patients,
  onSelectPatient,
  onEditPatient,
  onDeletePatient,
}) {
  const { formatDate, getInitials } = useFormatters();

  if (patients.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
        <p className="text-gray-500">Aucun patient trouvé</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Âge
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Pathologie
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Concordance IA
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Dernière visite
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Prochain suivi
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {patients.map((patient, idx) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                formatDate={formatDate}
                getInitials={getInitials}
                onSelect={onSelectPatient}
                onEdit={onEditPatient}
                onDelete={onDeletePatient}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}