# 🏴 Contacts Libres CNT-AIT - Application Décentralisée

Une application de gestion de contacts sécurisée et décentralisée, conçue pour les militant·es CNT-AIT, collectifs anarcho-syndicalistes et groupes affinitaires qui ont besoin d'un outil autonome pour protéger leur vie privée et leurs réseaux.

## 🔥 Fonctionnalités Révolutionnaires

- **Gestion sécurisée des contacts** : Ajouter, modifier, supprimer des contacts
- **Chiffrement local** : Toutes les données sont chiffrées avec une clé utilisateur
- **Authentification simple** : Connexion sans email obligatoire
- **Partage temporaire** : Partager des contacts via des liens sécurisés (expiration 30 min)
- **Import/Export** : Sauvegarde et restauration des contacts en JSON
- **Interface responsive** : Design adaptatif avec thème sombre
- **Base de données locale** : SQLite pour une autonomie complète

## ⚡ Installation & Autonomie

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [votre-repo]
cd contact-manager-secure

# Installer les dépendances
npm install

# Installer les dépendances du serveur
cd server
npm install
cd ..

# Démarrer l'application (backend + frontend)
npm run dev
```

L'application sera accessible sur :
- Frontend : http://localhost:5173
- Backend : http://localhost:3001

## 🏗️ Architecture Décentralisée

```
├── server/                 # Backend Express.js
│   ├── index.js           # Serveur principal
│   └── package.json       # Dépendances backend
├── src/                   # Frontend React
│   ├── components/        # Composants React
│   ├── services/         # Services API
│   ├── types.ts          # Types TypeScript
│   └── App.tsx           # Application principale
├── contacts.db           # Base de données SQLite (créée automatiquement)
└── package.json          # Configuration principale
```

## 🔒 Sécurité & Résistance

- **Chiffrement AES-256** des données sensibles
- **Authentification JWT** avec expiration
- **Partages temporaires** avec codes uniques
- **Isolation des données** par utilisateur
- **Nettoyage automatique** des partages expirés

## 🌐 Déploiement Révolutionnaire

### Réseau Local
```bash
# Démarrer sur toutes les interfaces
export HOST=0.0.0.0
npm run dev
```

### Tor Hidden Service
1. Installer Tor
2. Configurer le service caché dans `/etc/tor/torrc`
3. Démarrer l'application sur localhost

### Yggdrasil Network
1. Installer Yggdrasil
2. Configurer l'interface réseau
3. Démarrer l'application sur l'adresse Yggdrasil

## 🛠️ Guide d'Action

### Créer un compte
1. Ouvrir l'application
2. Cliquer sur "Créer un compte"
3. Choisir un nom d'utilisateur et mot de passe
4. Se connecter

### Gérer les contacts
- **Ajouter** : Cliquer sur "Nouveau Contact"
- **Modifier** : Cliquer sur "Modifier" sur un contact
- **Supprimer** : Cliquer sur l'icône corbeille
- **Rechercher** : Utiliser la barre de recherche

### Partager un contact
1. Cliquer sur "Partager" sur un contact
2. Générer un lien de partage
3. Copier le lien ou le code
4. Partager avec la personne (expire en 30 min)

### Import/Export
- **Exporter** : Cliquer sur "Exporter" pour télécharger un fichier JSON
- **Importer** : Cliquer sur "Importer" et sélectionner un fichier JSON

## 🔧 Configuration

### Variables d'environnement
```env
JWT_SECRET=votre-clé-secrète-jwt
PORT=3001
```

### Base de données
La base de données SQLite est créée automatiquement dans `contacts.db`.

## 🤝 Solidarité & Contribution

Ce projet est libre et solidaire, toutes les contributions sont bienvenues :
1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Ouvrir une Pull Request

## 📄 Licence Libre

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🛡️ Résistance Numérique

- 🏴 Pas de tracking
- ✅ Données chiffrées localement
- ✅ Pas de dépendance à des services tiers
- ✅ Code source ouvert et auditable
- ✅ Fonctionnement hors ligne possible
- 🔥 Conçu pour la résistance et l'autonomie

## 🆘 Entraide & Support

Pour toute question ou problème :
1. Vérifier la documentation
2. Consulter les issues GitHub
3. Ouvrir une nouvelle issue si nécessaire

---

**Solidarité** : Cette application est conçue par et pour les militant·es, syndicalistes, collectifs anarchistes et groupes affinitaires qui luttent pour un monde plus libre et égalitaire. 

*"L'émancipation des travailleurs sera l'œuvre des travailleurs eux-mêmes"* - Première Internationale