// src/features/medecin/pages/Search.jsx
import { useState, useEffect } from 'react';
import { 
  Search, Filter, X, Calendar, User, Stethoscope, 
  FileText, Clock, ChevronRight, Eye, Download,
  Activity, Heart, Brain, Users, MessageCircle,
  SlidersHorizontal, ChevronDown, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    patients: [],
    consultations: [],
    cas: [],
    total: 0
  });
  const [filteredResults, setFilteredResults] = useState({
    patients: [],
    consultations: [],
    cas: [],
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');
  
  // Filtres
  const [filters, setFilters] = useState({
    type: 'all',
    date: '',
    status: 'all',
    pathology: ''
  });

  // RÉCUPÉRATION DES DONNÉES DEPUIS LE STOCKAGE
  const getPatients = () => {
    const stored = localStorage.getItem('medecin_patients');
    if (stored) return JSON.parse(stored);
    // Données par défaut
    return [
      { id: 1, name: 'Tamo Bernard', age: 47, pathology: 'Pneumonie bactérienne', lastVisit: '2026-04-08', status: 'actif', avatar: 'TB', phone: '+237 6XX XXX XXX', email: 'bernard.tamo@email.com' },
      { id: 2, name: 'Fouda Marie', age: 52, pathology: 'BPCO stade 3', lastVisit: '2026-04-08', status: 'actif', avatar: 'FM', phone: '+237 6XX XXX XXX', email: 'marie.fouda@email.com' },
      { id: 3, name: 'Nguema Paul', age: 63, pathology: 'Asthme sévère', lastVisit: '2026-04-07', status: 'actif', avatar: 'NP', phone: '+237 6XX XXX XXX', email: 'paul.nguema@email.com' },
      { id: 4, name: 'Mboma Éric', age: 35, pathology: 'Bronchite aiguë', lastVisit: '2026-04-07', status: 'en_attente', avatar: 'MÉ', phone: '+237 6XX XXX XXX', email: 'eric.mboma@email.com' },
      { id: 5, name: 'Kamga Jean', age: 71, pathology: 'Tuberculose', lastVisit: '2026-04-06', status: 'critique', avatar: 'KJ', phone: '+237 6XX XXX XXX', email: 'jean.kamga@email.com' },
      { id: 6, name: 'Manga Honorine', age: 58, pathology: 'Fibrose pulmonaire', lastVisit: '2026-04-05', status: 'actif', avatar: 'MH', phone: '+237 6XX XXX XXX', email: 'honorine.manga@email.com' },
      { id: 7, name: 'Essomba Patrice', age: 44, pathology: 'Apnée du sommeil', lastVisit: '2026-04-04', status: 'actif', avatar: 'EP', phone: '+237 6XX XXX XXX', email: 'patrice.essomba@email.com' },
      { id: 8, name: 'Biya Christine', age: 29, pathology: 'Pneumonie', lastVisit: '2026-04-03', status: 'en_attente', avatar: 'BC', phone: '+237 6XX XXX XXX', email: 'christine.biya@email.com' }
    ];
  };

  const getConsultations = () => {
    const stored = localStorage.getItem('medecin_consultations');
    if (stored) return JSON.parse(stored);
    return [
      { id: 1, patient: 'Tamo Bernard', patientId: 1, date: '2026-04-08', time: '14:30', type: 'presentiel', status: 'completed', pathology: 'Pneumonie', doctor: 'Dr. Jean Tagne', notes: 'Patient réactif au traitement' },
      { id: 2, patient: 'Fouda Marie', patientId: 2, date: '2026-04-08', time: '11:20', type: 'presentiel', status: 'completed', pathology: 'BPCO', doctor: 'Dr. Jean Tagne', notes: 'Stable' },
      { id: 3, patient: 'Nguema Paul', patientId: 3, date: '2026-04-07', time: '09:15', type: 'presentiel', status: 'completed', pathology: 'Asthme', doctor: 'Dr. Jean Tagne', notes: 'Crise maîtrisée' },
      { id: 4, patient: 'Mboma Éric', patientId: 4, date: '2026-04-07', time: '16:45', type: 'presentiel', status: 'cancelled', pathology: 'Bronchite', doctor: 'Dr. Jean Tagne', notes: 'Annulé par patient' },
      { id: 5, patient: 'Kamga Jean', patientId: 5, date: '2026-04-06', time: '10:00', type: 'presentiel', status: 'completed', pathology: 'Tuberculose', doctor: 'Dr. Jean Tagne', notes: 'Début traitement' }
    ];
  };

  const getCasCliniques = () => {
    const stored = localStorage.getItem('medecin_cas');
    if (stored) return JSON.parse(stored);
    return [
      { id: 1, title: 'BPCO stade avancé', author: 'Dr. Jean Tagne', date: '2026-04-01', comments: 12, shares: 5, views: 89, pathology: 'BPCO', content: 'Cas détaillé de BPCO...' },
      { id: 2, title: 'Pneumonie résistante aux antibiotiques', author: 'Dr. Jean Tagne', date: '2026-03-25', comments: 8, shares: 3, views: 67, pathology: 'Pneumonie', content: 'Cas de pneumonie...' },
      { id: 3, title: 'Asthme sévère chez l\'adulte', author: 'Dr. Jean Tagne', date: '2026-03-20', comments: 15, shares: 7, views: 124, pathology: 'Asthme', content: 'Prise en charge asthme...' },
      { id: 4, title: 'Tuberculose multirésistante', author: 'Dr. Jean Tagne', date: '2026-03-15', comments: 10, shares: 4, views: 56, pathology: 'Tuberculose', content: 'Cas complexe de tuberculose...' }
    ];
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, []);

  useEffect(() => {
    if (searchResults.patients.length > 0 || searchResults.consultations.length > 0 || searchResults.cas.length > 0) {
      applyFilters();
    }
  }, [filters, searchResults]);

  const performSearch = (query) => {
    setLoading(true);
    setTimeout(() => {
      const searchLower = query.toLowerCase();
      
      const allPatients = getPatients();
      const allConsultations = getConsultations();
      const allCas = getCasCliniques();
      
      const filteredPatients = allPatients.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.pathology.toLowerCase().includes(searchLower)
      );
      
      const filteredConsultations = allConsultations.filter(c => 
        c.patient.toLowerCase().includes(searchLower) || 
        c.pathology.toLowerCase().includes(searchLower)
      );
      
      const filteredCas = allCas.filter(c => 
        c.title.toLowerCase().includes(searchLower) || 
        c.pathology.toLowerCase().includes(searchLower)
      );
      
      const results = {
        patients: filteredPatients,
        consultations: filteredConsultations,
        cas: filteredCas,
        total: filteredPatients.length + filteredConsultations.length + filteredCas.length
      };
      
      setSearchResults(results);
      setFilteredResults(results);
      setLoading(false);
    }, 300);
  };

  const applyFilters = () => {
    let filteredPatients = [...searchResults.patients];
    let filteredConsultations = [...searchResults.consultations];
    let filteredCas = [...searchResults.cas];
    
    // Filtre par statut
    if (filters.status !== 'all') {
      filteredPatients = filteredPatients.filter(p => p.status === filters.status);
      filteredConsultations = filteredConsultations.filter(c => c.status === filters.status);
    }
    
    // Filtre par pathologie
    if (filters.pathology) {
      const pathoLower = filters.pathology.toLowerCase();
      filteredPatients = filteredPatients.filter(p => p.pathology.toLowerCase().includes(pathoLower));
      filteredConsultations = filteredConsultations.filter(c => c.pathology.toLowerCase().includes(pathoLower));
      filteredCas = filteredCas.filter(c => c.pathology.toLowerCase().includes(pathoLower));
    }
    
    // Filtre par date
    if (filters.date) {
      filteredConsultations = filteredConsultations.filter(c => c.date === filters.date);
      filteredCas = filteredCas.filter(c => c.date === filters.date);
      filteredPatients = filteredPatients.filter(p => p.lastVisit === filters.date);
    }
    
    setFilteredResults({
      patients: filteredPatients,
      consultations: filteredConsultations,
      cas: filteredCas,
      total: filteredPatients.length + filteredConsultations.length + filteredCas.length
    });
  };

  const resetFilters = () => {
    setFilters({ type: 'all', date: '', status: 'all', pathology: '' });
    setFilteredResults(searchResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      window.history.pushState({}, '', `/medecin/recherche?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      actif: 'bg-emerald-50 text-emerald-700',
      en_attente: 'bg-amber-50 text-amber-700',
      critique: 'bg-red-50 text-red-700',
      completed: 'bg-emerald-50 text-emerald-700',
      cancelled: 'bg-red-50 text-red-700'
    };
    return badges[status] || 'bg-slate-50 text-slate-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      actif: 'Actif',
      en_attente: 'En attente',
      critique: 'Critique',
      completed: 'Terminée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  const tabs = [
    { id: 'patients', label: 'Patients', icon: Users, count: filteredResults.patients?.length || 0 },
    { id: 'consultations', label: 'Consultations', icon: Stethoscope, count: filteredResults.consultations?.length || 0 },
    { id: 'cas', label: 'Cas cliniques', icon: FileText, count: filteredResults.cas?.length || 0 }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Recherche</h1>
        <p className="text-sm text-slate-500 mt-1">Recherchez des patients, consultations ou cas cliniques</p>
      </div>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un patient, une pathologie, un cas clinique..."
            className="w-full pl-12 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all"
        >
          Rechercher
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border transition-all ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </form>

      {/* Filtres */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Filtres avancés</h3>
            <button onClick={resetFilters} className="text-sm text-blue-600 hover:underline">
              Réinitialiser
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Statut</label>
              <select 
                value={filters.status} 
                onChange={(e) => setFilters({ ...filters, status: e.target.value })} 
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="en_attente">En attente</option>
                <option value="critique">Critique</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
              <input 
                type="date" 
                value={filters.date} 
                onChange={(e) => setFilters({ ...filters, date: e.target.value })} 
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Pathologie</label>
              <input 
                type="text" 
                value={filters.pathology} 
                onChange={(e) => setFilters({ ...filters, pathology: e.target.value })} 
                placeholder="Pneumonie, BPCO..." 
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <div className="text-xs text-slate-400">
                {(filters.status !== 'all' || filters.date || filters.pathology) ? (
                  <span className="text-emerald-600">✓ Filtres actifs</span>
                ) : (
                  <span>Aucun filtre actif</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultats */}
      {searchQuery && (
        <>
          {/* Tabs */}
          <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                      {tab.count}
                    </span>
                  )}
                  {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                </button>
              );
            })}
          </div>

          {/* Contenu */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <>
              {/* PATIENTS */}
              {activeTab === 'patients' && (
                <div className="space-y-3">
                  {filteredResults.patients?.length > 0 ? (
                    filteredResults.patients.map((patient) => (
                      <Link key={patient.id} to={`/medecin/patients/${patient.id}`} className="block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            {patient.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                                <p className="text-sm text-slate-500">{patient.age} ans • {patient.pathology}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(patient.status)}`}>
                                {getStatusLabel(patient.status)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                              <span>📅 Dernière visite : {formatDate(patient.lastVisit)}</span>
                              <span>📞 {patient.phone}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Aucun patient trouvé</p>
                      <p className="text-sm text-slate-400 mt-1">Essayez d'autres termes de recherche</p>
                    </div>
                  )}
                </div>
              )}

              {/* CONSULTATIONS */}
              {activeTab === 'consultations' && (
                <div className="space-y-3">
                  {filteredResults.consultations?.length > 0 ? (
                    filteredResults.consultations.map((consult) => (
                      <Link key={consult.id} to={`/medecin/consultation/${consult.id}`} className="block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                              <Stethoscope className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{consult.patient}</h3>
                              <p className="text-sm text-slate-500">{consult.pathology}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                <span>📅 {formatDate(consult.date)} à {consult.time}</span>
                                <span>👨‍⚕️ {consult.doctor}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(consult.status)}`}>
                              {getStatusLabel(consult.status)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                      <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Aucune consultation trouvée</p>
                    </div>
                  )}
                </div>
              )}

              {/* CAS CLINIQUES */}
              {activeTab === 'cas' && (
                <div className="space-y-3">
                  {filteredResults.cas?.length > 0 ? (
                    filteredResults.cas.map((cas) => (
                      <Link key={cas.id} to={`/medecin/cas-cliniques/${cas.id}`} className="block bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">{cas.title}</h3>
                            <p className="text-sm text-slate-500">Par {cas.author} • {formatDate(cas.date)}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                              <span>💬 {cas.comments} commentaires</span>
                              <span>🔄 {cas.shares} partages</span>
                              <span>👁️ {cas.views} vues</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">Aucun cas clinique trouvé</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Résumé */}
          {filteredResults.total > 0 && !loading && (
            <div className="text-center text-xs text-slate-400 pt-4">
              {filteredResults.total} résultat(s) trouvé(s)
              {(filters.status !== 'all' || filters.date || filters.pathology) && (
                <span className="ml-2 text-emerald-600">(filtres appliqués)</span>
              )}
            </div>
          )}
        </>
      )}

      {/* État initial */}
      {!searchQuery && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Effectuez une recherche</h3>
          <p className="text-sm text-slate-500">Recherchez des patients, consultations ou cas cliniques</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="text-xs text-slate-400">Suggestions :</span>
            <button onClick={() => { setSearchQuery('Pneumonie'); performSearch('Pneumonie'); }} className="text-xs text-blue-600 hover:underline">Pneumonie</button>
            <button onClick={() => { setSearchQuery('BPCO'); performSearch('BPCO'); }} className="text-xs text-blue-600 hover:underline">BPCO</button>
            <button onClick={() => { setSearchQuery('Asthme'); performSearch('Asthme'); }} className="text-xs text-blue-600 hover:underline">Asthme</button>
            <button onClick={() => { setSearchQuery('Tuberculose'); performSearch('Tuberculose'); }} className="text-xs text-blue-600 hover:underline">Tuberculose</button>
          </div>
        </div>
      )}
    </div>
  );
}