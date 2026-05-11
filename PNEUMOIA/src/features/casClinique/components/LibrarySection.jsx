import { Search } from 'lucide-react';

export default function LibrarySection({ 
  selectedFilter = "Toute", 
  onFilterChange = () => {}, 
  searchTerm = "", 
  onSearchChange = () => {} 
}) {
  const filters = ["Toute", "Tuberculose", "Asthme", "BPCO", "Pneumonie", "Cancer"];

  const handleFilterChange = (filter) => {
    console.log("Filtre cliqué:", filter); // Vérifie dans la console
    onFilterChange(filter);
  };

  const handleSearchChange = (e) => {
    console.log("Recherche tapée:", e.target.value); // Vérifie dans la console
    onSearchChange(e.target.value);
  };

  return (
    <section className="py-8 px-4 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2">Bibliothèque</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Explorer les cas cliniques</h2>
          <div className="w-16 h-0.5 bg-linear-to-r from-blue-500 to-indigo-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Cliquez sur un cas pour voir la démarche IA complète. 
            <span className="text-blue-600"> Connectez-vous</span> pour accéder à tous les détails.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center justify-center max-w-4xl mx-auto">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Rechercher un cas..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <span className="text-gray-300 hidden lg:block">|</span>
          <span className="text-xs text-gray-500 hidden lg:block">Filtrer :</span>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}