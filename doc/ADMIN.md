# Administration - Contacts Libres CNT-AIT

## Configuration

L'application utilise les variables d'environnement suivantes :

- `NODE_ENV` : Environnement d'exécution (production)
- `PORT` : Port d'écoute du serveur backend
- `JWT_SECRET` : Clé secrète pour les tokens JWT
- `DATA_DIR` : Répertoire de stockage des données

## Base de données

L'application utilise SQLite avec les tables suivantes :

- `users` : Comptes utilisateurs avec chiffrement
- `contacts` : Contacts chiffrés par utilisateur
- `shares` : Partages temporaires avec expiration

## Sécurité

### Chiffrement
- Données chiffrées avec AES-256
- Clé de chiffrement unique par utilisateur
- Mots de passe hachés avec bcrypt

### Authentification
- Tokens JWT avec expiration 24h
- Pas d'email requis pour l'inscription
- Sessions isolées par utilisateur

### Partages
- Codes UUID uniques
- Expiration automatique (30 minutes)
- Nettoyage périodique des partages expirés

## Maintenance

### Logs
Les logs sont disponibles dans `/var/log/contacts-libres-cnt/`

### Sauvegarde
La base de données SQLite est dans `$DATA_DIR/contacts.db`

### Nettoyage
Les partages expirés sont nettoyés automatiquement toutes les heures.

## Surveillance

### Métriques importantes
- Nombre d'utilisateurs actifs
- Taille de la base de données
- Partages créés/expirés
- Erreurs d'authentification

### Commandes utiles
```bash
# Statut du service
systemctl status contacts-libres-cnt

# Logs en temps réel
journalctl -u contacts-libres-cnt -f

# Redémarrage
systemctl restart contacts-libres-cnt
```

## Dépannage

### Problèmes courants
1. **Service ne démarre pas** : Vérifier les permissions sur DATA_DIR
2. **Erreurs de base de données** : Vérifier l'espace disque
3. **Problèmes de chiffrement** : Vérifier JWT_SECRET

### Réinitialisation
Pour réinitialiser complètement l'application :
```bash
systemctl stop contacts-libres-cnt
rm $DATA_DIR/contacts.db
systemctl start contacts-libres-cnt
```

### Support

- **Documentation** : [README principal](https://github.com/Jesusiunchatnoir/contact-cnt-ait)
- **Issues** : [GitHub Issues](https://github.com/Jesusiunchatnoir/contact-cnt-ait/issues)
- **Communauté** : Forums CNT-AIT