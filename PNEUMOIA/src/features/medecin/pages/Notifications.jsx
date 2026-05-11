// src/features/medecin/pages/Notifications.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, MessageCircle, Users, Stethoscope, Award,
  Clock, CheckCircle, AlertCircle, 
  ChevronRight, CheckCheck, Eye, BellOff, Trash2
} from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Charger les notifications au démarrage
  useEffect(() => {
    loadNotifications();
  }, []);

  // Simuler le chargement depuis une API ou localStorage
  const loadNotifications = () => {
    // Données mockées
    const mockNotifications = [
      {
        id: 1,
        type: 'consultation',
        title: 'Nouvelle consultation',
        message: 'Dr. Martin a programmé une consultation avec Tamo Bernard',
        time: '2026-04-08T10:00:00',
        read: false,
        icon: 'Stethoscope',
        actionLink: '/medecin/consultation/123',
        actionType: 'consultation'
      },
      {
        id: 2,
        type: 'patient',
        title: 'Patient critique',
        message: "KAMGA Jean - Suivi dépassé depuis 9 jours",
        time: '2026-04-08T08:30:00',
        read: false,
        icon: 'AlertCircle',
        actionLink: '/medecin/patients/kamga-jean',
        actionType: 'patient'
      },
      {
        id: 3,
        type: 'message',
        title: 'Nouveau message',
        message: "Dr. Nkoa a commenté votre cas clinique #124",
        time: '2026-04-08T07:15:00',
        read: false,
        icon: 'MessageCircle',
        actionLink: '/medecin/messagerie/124',
        actionType: 'message'
      },
      {
        id: 4,
        type: 'community',
        title: 'Cas partagé',
        message: "Votre cas 'BPCO stade avancé' a été partagé 5 fois",
        time: '2026-04-07T16:45:00',
        read: true,
        icon: 'Users',
        actionLink: '/medecin/cas-cliniques/124',
        actionType: 'cas'
      },
      {
        id: 5,
        type: 'achievement',
        title: 'Badge débloqué',
        message: "Expert en pneumonie - 50 cas partagés",
        time: '2026-04-07T10:30:00',
        read: true,
        icon: 'Award',
        actionLink: '/medecin/profil/badges',
        actionType: 'profil'
      },
      {
        id: 6,
        type: 'consultation',
        title: 'Consultation terminée',
        message: "Rapport disponible pour Fouda Marie",
        time: '2026-04-06T15:20:00',
        read: true,
        icon: 'CheckCircle',
        actionLink: '/medecin/consultation/456',
        actionType: 'consultation'
      }
    ];

    // Essayer de charger depuis localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      setNotifications(mockNotifications);
    }
    setLoading(false);
  };

  // Sauvegarder dans localStorage à chaque changement
  const saveNotifications = (updatedNotifications) => {
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Marquer une notification comme lue
  const markAsRead = (notificationId, actionLink, actionType) => {
    // Mettre à jour l'état local
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    saveNotifications(updatedNotifications);

    // Rediriger vers la page correspondante
    navigate(actionLink);
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    saveNotifications(updatedNotifications);
  };

  // Supprimer une notification
  const deleteNotification = (notificationId, e) => {
    e.stopPropagation(); // Empêche la redirection
    const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
    saveNotifications(updatedNotifications);
  };

  // Supprimer toutes les notifications lues
  const clearReadNotifications = () => {
    const updatedNotifications = notifications.filter(notif => !notif.read);
    saveNotifications(updatedNotifications);
  };

  // Formater le temps
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  // Récupérer l'icône
  const getIcon = (iconName) => {
    const icons = {
      Stethoscope, AlertCircle, MessageCircle, Users, Award, CheckCircle
    };
    const IconComponent = icons[iconName] || Bell;
    return IconComponent;
  };

  // Filtres
  const filters = [
    { id: 'all', label: 'Toutes', count: notifications.length },
    { id: 'unread', label: 'Non lues', count: notifications.filter(n => !n.read).length },
    { id: 'read', label: 'Lues', count: notifications.filter(n => n.read).length }
  ];

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.read);
    if (activeFilter === 'read') return notifications.filter(n => n.read);
    return notifications;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} notification(s) non lue(s)` : 'Toutes vos notifications sont lues'}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Tout marquer comme lu
            </button>
          )}
          {notifications.some(n => n.read) && (
            <button
              onClick={clearReadNotifications}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Nettoyer les lues
            </button>
          )}
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 border-b border-slate-200">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 text-sm font-medium transition-all relative
                ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className={`
                  ml-2 px-2 py-0.5 text-xs rounded-full
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}
                `}>
                  {filter.count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Liste des notifications */}
      <div className="space-y-2">
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => {
            const Icon = getIcon(notification.icon);
            const isUnread = !notification.read;
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  group relative rounded-xl border transition-all hover:shadow-sm cursor-pointer
                  ${isUnread 
                    ? 'bg-white border-l-4 border-l-blue-500 border-slate-200' 
                    : 'bg-slate-50/50 border-slate-200 opacity-80'
                  }
                `}
                onClick={() => markAsRead(notification.id, notification.actionLink, notification.actionType)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icône */}
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                      ${isUnread ? 'bg-blue-50' : 'bg-slate-100'}
                    `}>
                      <Icon className={`w-5 h-5 ${isUnread ? 'text-blue-600' : 'text-slate-400'}`} />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${isUnread ? 'text-slate-900' : 'text-slate-500'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${isUnread ? 'text-slate-600' : 'text-slate-400'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(notification.time)}</span>
                      </div>
                    </div>

                    {/* Actions au hover */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => deleteNotification(notification.id, e)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* État vide */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellOff className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Aucune notification</p>
            <p className="text-sm text-slate-400 mt-1">
              {activeFilter === 'unread' 
                ? 'Vous avez lu toutes vos notifications' 
                : 'Vous n\'avez pas encore de notifications'}
            </p>
          </div>
        )}
      </div>

      {/* Compteur en bas */}
      {notifications.length > 0 && (
        <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
          {notifications.filter(n => !n.read).length} non lue(s) · {notifications.filter(n => n.read).length} lue(s)
        </div>
      )}
    </div>
  );
}