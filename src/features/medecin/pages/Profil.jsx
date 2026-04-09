// src/features/medecin/pages/Profile.jsx
import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  Stethoscope, Users, Clock, Edit2, Save,
  Camera, Globe, Briefcase,
  CheckCircle, Activity, Heart, FileText,
  Building2, IdCard, Link2, Share2, X,
  Lock, KeyRound, Eye, EyeOff, AlertCircle
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    civilite: 'Dr',
    nom: 'Dupont',
    prenom: 'Jean',
    specialite: 'Pneumologie',
    numeroRPPS: '12345678901',
    etablissement: 'Hôpital Général de Douala',
    emailPro: 'jean.dupont@pneumoia.com',
    telephone: '+237 6XX XXX XXX',
    adresse: 'Douala, Cameroun',
    bio: 'Pneumologue avec plus de 10 ans d\'expérience dans le diagnostic et le traitement des maladies respiratoires.',
    social: {
      linkedin: 'linkedin.com/in/jeandupont',
      website: 'drjeandupont.com'
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const stats = [
    { label: 'Années d\'expérience', value: '12+', icon: Clock },
    { label: 'Patients traités', value: '2,847', icon: Users },
    { label: 'Cas partagés', value: '124', icon: Activity },
    { label: 'Taux de satisfaction', value: '98%', icon: Heart }
  ];

  const achievements = [
    { title: 'Expert en Pneumonie', date: '2025', icon: Award, color: 'blue' },
    { title: 'Top Contributeur', date: '2024', icon: Award, color: 'purple' },
    { title: '100 Cas partagés', date: '2024', icon: Award, color: 'emerald' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
    setPasswordSuccess(false);
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Le mot de passe actuel est requis';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(passwordData.newPassword)) {
      errors.newPassword = 'Doit contenir majuscule, minuscule et chiffre';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (validatePassword()) {
      console.log('Changement de mot de passe:', passwordData);
      setPasswordSuccess(true);
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordSuccess(false);
      }, 2000);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Données sauvegardées:', formData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
          <p className="text-sm text-slate-500 mt-1">Gérez vos informations professionnelles</p>
        </div>
        <div className="flex gap-3">
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              Changer le mot de passe
            </button>
          )}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${isEditing 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Sauvegarder
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Modifier
              </>
            )}
          </button>
        </div>
      </div>

      {/* Formulaire de changement de mot de passe */}
      {isChangingPassword && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Changer le mot de passe</h3>
              </div>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordErrors({});
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Annuler
              </button>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
                <CheckCircle className="w-4 h-4" />
                Mot de passe modifié avec succès !
              </div>
            )}
            
            {/* Mot de passe actuel */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`
                    w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${passwordErrors.currentPassword ? 'border-red-500' : 'border-slate-200'}
                  `}
                  placeholder="Entrez votre mot de passe actuel"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`
                    w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${passwordErrors.newPassword ? 'border-red-500' : 'border-slate-200'}
                  `}
                  placeholder="8 caractères minimum"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passwordErrors.newPassword}
                </p>
              )}
              <p className="text-xs text-slate-400 mt-1">
                Doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre
              </p>
            </div>

            {/* Confirmation */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`
                    w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-slate-200'}
                  `}
                  placeholder="Répétez le nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleUpdatePassword}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
              >
                Mettre à jour le mot de passe
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordErrors({});
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {/* Carte photo et identité */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profil" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {formData.prenom?.[0]}{formData.nom?.[0]}
                  </span>
                )}
              </div>
              {isEditing && (
                <>
                  <button 
                    onClick={() => document.getElementById('photoInput').click()}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-slate-600" />
                  </button>
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-4">
              {formData.civilite}. {formData.prenom} {formData.nom}
            </h2>
            <p className="text-sm text-blue-600 font-medium mt-1">{formData.specialite}</p>
            <p className="text-sm text-slate-500 mt-2">{formData.etablissement}</p>
            <p className="text-xs text-slate-400 mt-1">RPPS: {formData.numeroRPPS}</p>
            
            <div className="flex justify-center gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Briefcase className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Récompenses */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Récompenses</h3>
            <div className="space-y-3">
              {achievements.map((achievement, i) => {
                const Icon = achievement.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600',
                  purple: 'bg-purple-50 text-purple-600',
                  emerald: 'bg-emerald-50 text-emerald-600'
                };
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${colorClasses[achievement.color]} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{achievement.title}</p>
                      <p className="text-xs text-slate-400">{achievement.date}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations professionnelles */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Informations professionnelles</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Civilité</label>
                  {isEditing ? (
                    <select
                      name="civilite"
                      value={formData.civilite}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Dr">Dr</option>
                      <option value="Pr">Pr</option>
                      <option value="Mme">Mme</option>
                      <option value="M">M</option>
                    </select>
                  ) : (
                    <p className="text-sm text-slate-900">{formData.civilite}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Spécialité</label>
                  {isEditing ? (
                    <select
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pneumologie">Pneumologie</option>
                      <option value="Médecine générale">Médecine générale</option>
                      <option value="Cardiologie">Cardiologie</option>
                      <option value="Pédiatrie">Pédiatrie</option>
                    </select>
                  ) : (
                    <p className="text-sm text-slate-900">{formData.specialite}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-slate-900">{formData.nom}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Prénom</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-slate-900">{formData.prenom}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Numéro RPPS</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="numeroRPPS"
                    value={formData.numeroRPPS}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <IdCard className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-900">{formData.numeroRPPS}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Établissement</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="etablissement"
                    value={formData.etablissement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-900">{formData.etablissement}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Email professionnel</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="emailPro"
                    value={formData.emailPro}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-900">{formData.emailPro}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-900">{formData.telephone}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Biographie</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                ) : (
                  <p className="text-sm text-slate-600">{formData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Documents justificatifs */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Documents justificatifs</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Justificatif d'exercice</p>
                    <p className="text-xs text-slate-500">Carte professionnelle - Déposé le 01/01/2025</p>
                  </div>
                </div>
                <button className="text-xs text-blue-600 hover:underline">Voir</button>
              </div>
            </div>
          </div>

          {/* Liens sociaux */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Liens professionnels</h3>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">LinkedIn / Portfolio</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="social.linkedin"
                    value={formData.social.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-slate-400" />
                    <a href="#" className="text-sm text-blue-600 hover:underline">{formData.social.linkedin}</a>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Site web</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="social.website"
                    value={formData.social.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <a href="#" className="text-sm text-blue-600 hover:underline">{formData.social.website}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}