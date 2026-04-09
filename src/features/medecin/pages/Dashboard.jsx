// src/features/medecin/pages/Dashboard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, AlertTriangle, Stethoscope, Award,
  MessageCircle, Bell, ChevronRight, Eye,
  FileText, Calendar, Clock, TrendingUp,
  Activity, CheckCircle, Clock as ClockIcon,
  Star, TrendingDown, MoreHorizontal
} from 'lucide-react';

export default function Dashboard() {
  // Stats cards avec style CORE.OS
  const statsCards = [
    { 
      title: "Patients totaux", 
      value: "247", 
      icon: Users, 
      increase: "+12%", 
      trend: "up",
      color: "blue",
      subtitle: "vs mois dernier"
    },
    { 
      title: "Cas urgent", 
      value: "18", 
      icon: AlertTriangle, 
      increase: "+5%", 
      trend: "up",
      color: "orange",
      subtitle: "vs mois dernier"
    },
    { 
      title: "Consultations", 
      value: "1 247", 
      icon: Stethoscope, 
      increase: "+8%", 
      trend: "up",
      color: "emerald",
      subtitle: "vs mois dernier"
    },
    { 
      title: "Communauté", 
      value: "128", 
      icon: Award, 
      increase: "+15%", 
      trend: "up",
      color: "purple",
      subtitle: "membres actifs"
    }
  ];

  // Graphique amélioré
  const chartData = [
    { day: "Lun", value: 12, consultations: 8 },
    { day: "Mar", value: 18, consultations: 14 },
    { day: "Mer", value: 14, consultations: 11 },
    { day: "Jeu", value: 22, consultations: 18 },
    { day: "Ven", value: 26, consultations: 22 },
    { day: "Sam", value: 20, consultations: 16 },
    { day: "Dim", value: 16, consultations: 13 }
  ];

  // Consultations récentes améliorées
  const recentConsultations = [
    { name: "Tamo Bernard", pathology: "Pneumonie bactérienne", percentage: 85, date: "Aujourd'hui", time: "14:30", status: "completed", avatar: "TB" },
    { name: "Fouda Marie", pathology: "BPCO stade 3", percentage: 72, date: "Aujourd'hui", time: "11:20", status: "in-progress", avatar: "FM" },
    { name: "Nguema Paul", pathology: "Asthme sévère", percentage: 91, date: "Hier", time: "09:15", status: "completed", avatar: "NP" },
    { name: "Mboma Éric", pathology: "Bronchite aiguë", percentage: 68, date: "Hier", time: "16:45", status: "pending", avatar: "MÉ" },
    { name: "Kamga Jean", pathology: "Tuberculose", percentage: 79, date: "25/03/2026", time: "10:00", status: "completed", avatar: "KJ" }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'completed': { label: 'Terminé', className: 'bg-emerald-50 text-emerald-700' },
      'in-progress': { label: 'En cours', className: 'bg-blue-50 text-blue-700' },
      'pending': { label: 'En attente', className: 'bg-amber-50 text-amber-700' }
    };
    return badges[status] || badges.completed;
  };

  // Messages récents améliorés
  const recentMessages = [
    { name: "Dr. Merlin", message: "Pouvez-vous m'envoyer le résultat de Tamo ?", time: "14:30", unread: true, avatar: "DM" },
    { name: "Dr Kamto Jordan", message: "Merci pour le partage du cas #124", time: "11:20", unread: false, avatar: "KJ" },
    { name: "Dr. Nkoa", message: "Questions sur la prise en charge BPCO", time: "Hier", unread: true, avatar: "DN" },
    { name: "Dr. Fouda", message: "Cas clinique intéressant à partager", time: "25/03", unread: false, avatar: "DF" }
  ];

  // Patients récents améliorés
  const recentPatients = [
    { name: "Tamo Bernard", age: "47 ans", pathology: "Pneumonie", status: "Suivi 7j", lastVisit: "Aujourd'hui" },
    { name: "Fouda Marie", age: "52 ans", pathology: "BPCO", status: "Stable", lastVisit: "Hier" },
    { name: "Kamga Jean", age: "71 ans", pathology: "Tuberculose", status: "Urgent", lastVisit: "Il y a 2j" },
    { name: "Nguema Paul", age: "63 ans", pathology: "Asthme", status: "Stable", lastVisit: "Il y a 3j" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Suivi 7j": "bg-blue-50 text-blue-700 border-blue-200",
      "Stable": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Urgent": "bg-red-50 text-red-700 border-red-200"
    };
    return colors[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  // Notifications améliorées
  const notifications = [
    { text: "Suivi dépassé — KAMGA Jean depuis 9 jours", time: "Il y a 2h", type: "warning", icon: ClockIcon },
    { text: "Dr. Martin demande accès au dossier de TAMO Bernard", time: "Il y a 3h", type: "info", icon: Users },
    { text: "Votre cas #124 a reçu 3 nouveaux commentaires", time: "Hier", type: "success", icon: MessageCircle }
  ];

  // Diagnostics du mois améliorés
  const diagnostics = [
    { name: "Pneumonie", value: 97, color: "blue", patients: 42 },
    { name: "BPCO", value: 69, color: "indigo", patients: 28 },
    { name: "Asthme", value: 57, color: "cyan", patients: 23 },
    { name: "Tuberculose", value: 43, color: "purple", patients: 18 },
    { name: "Bronchite", value: 38, color: "sky", patients: 15 },
    { name: "Autres", value: 24, color: "gray", patients: 10 }
  ];

  const maxChartValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="space-y-8">
      {/* En-tête du dashboard */}
      <div className="flex items-center">
        {/* <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Dashboard Médecin</h1>
          <p className="text-sm text-slate-500 mt-1">Bienvenue, Dr. Jean Dupont</p>
        </div> */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4 inline mr-2" />
            Cette semaine
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
            <FileText className="w-4 h-4 inline mr-2" />
            Nouvelle consultation
          </button>
        </div>
      </div>

      {/* LIGNE 1 : 4 CARDS PRINCIPALES - Style CORE.OS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${card.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-600">{card.increase}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{card.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{card.title}</p>
              <p className="text-xs text-slate-400 mt-2">{card.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGNE 2 : DEUX COLONNES */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION ACTIVITÉ - Graphique amélioré */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Activité médicale</h3>
                <p className="text-lg font-bold text-slate-900 mt-1">Consultations — 7 derniers jours</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg">Hebdo</button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 rounded-lg">Mensuel</button>
              </div>
            </div>
            
            <div className="relative h-64">
              <div className="flex items-end gap-3 h-full">
                {chartData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-xl transition-all group-hover:from-blue-600 group-hover:to-blue-500 cursor-pointer"
                        style={{ height: `${(item.value / maxChartValue) * 180}px`, minHeight: 4 }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.value} consultations
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-600">Consultations</span>
                </div>
              </div>
              <span className="text-xs text-slate-400">Moyenne: 18.3/jour</span>
            </div>
          </div>

          {/* SECTION CONSULTATIONS RÉCENTES - Style amélioré */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Consultations</h3>
                <p className="text-lg font-bold text-slate-900 mt-1">Dernières consultations</p>
              </div>
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm">
                <FileText className="w-4 h-4" /> 
                Nouvelle
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentConsultations.map((consult, i) => {
                const statusBadge = getStatusBadge(consult.status);
                return (
                  <div key={i} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                          {consult.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {consult.name}
                          </p>
                          <p className="text-sm text-slate-500 mt-0.5">{consult.pathology}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge.className}`}>
                              {statusBadge.label}
                            </span>
                            <span className="text-xs text-slate-400">{consult.date} • {consult.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-blue-600">{consult.percentage}%</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${consult.percentage}%` }} />
                          </div>
                        </div>
                        <button className="mt-2 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Voir détails →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <Link to="/medecin/patients" className="block w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Voir toutes les consultations →
              </Link>
            </div>
          </div>

          {/* SECTION MESSAGERIE - Style amélioré */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Messages</h3>
                <p className="text-lg font-bold text-slate-900 mt-1">Messagerie récente</p>
              </div>
              <Link to="/medecin/messagerie" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> 
                Nouveau message
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentMessages.map((msg, i) => (
                <Link key={i} to="/medecin/messagerie" className="block p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm">
                          {msg.avatar}
                        </div>
                        {msg.unread && (
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{msg.name}</p>
                          {msg.unread && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Nouveau</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-1">{msg.message}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 flex-shrink-0">{msg.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (1/3) */}
        <div className="space-y-8">
          
          {/* SECTION PATIENTS RÉCENTS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Patients</h3>
                  <p className="text-lg font-bold text-slate-900 mt-1">Derniers patients</p>
                </div>
                <Link to="/medecin/patients" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Voir tout
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {recentPatients.map((patient, i) => (
                <div key={i} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900">{patient.name}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{patient.age} • {patient.pathology}</p>
                      <p className="text-xs text-slate-400 mt-1">Dernière visite: {patient.lastVisit}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION NOTIFICATIONS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Alertes</h3>
                  <p className="text-lg font-bold text-slate-900 mt-1">Notifications</p>
                </div>
                <Bell className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {notifications.map((notif, i) => {
                const IconComponent = notif.icon;
                const colorClasses = {
                  warning: 'bg-amber-50 text-amber-600',
                  info: 'bg-blue-50 text-blue-600',
                  success: 'bg-emerald-50 text-emerald-600'
                };
                return (
                  <div key={i} className="p-5 hover:bg-slate-50 transition-colors">
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colorClasses[notif.type]} flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">{notif.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <Link to="/medecin/notifications" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                Voir toutes les notifications
              </Link>
            </div>
          </div>

          {/* SECTION DIAGNOSTICS DU MOIS - Style amélioré */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="mb-5">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Statistiques</h3>
              <p className="text-lg font-bold text-slate-900 mt-1">Top diagnostics — Mars 2026</p>
            </div>
            <div className="space-y-4">
              {diagnostics.map((diag, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700">{diag.name}</span>
                      <span className="text-xs text-slate-400">{diag.patients} patients</span>
                    </div>
                    <span className="font-bold text-slate-900">{diag.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${diag.color}-500 rounded-full transition-all duration-500 group-hover:bg-${diag.color}-600`} 
                      style={{ width: `${diag.value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION RANKING - Style amélioré */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black">2e / 20</h3>
              <p className="text-sm text-white/80 mt-1">Médecins</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-medium">Score: 94.2%</span>
              </div>
              <p className="text-xs text-white/70 mt-4">Basé sur les cas partagés et la concordance IA</p>
              <Link to="/medecin/classement" className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-white hover:text-white/90 bg-white/20 px-4 py-2 rounded-xl transition-all">
                Voir le classement <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}