# NatureMama Heritage - Site E-commerce

Site e-commerce moderne et élégant pour NatureMama Heritage, spécialisé dans les compléments alimentaires naturels.

## 🌿 À Propos

NatureMama Heritage incarne la rencontre entre la sagesse ancestrale des plantes et l'innovation scientifique moderne. Née au cœur des Alpes françaises, notre entreprise propose des compléments alimentaires d'excellence, en harmonie avec la nature.

## ✨ Fonctionnalités

- **Notre Histoire** : Découvrez nos origines, notre philosophie et notre processus unique
- **Nos Produits** : Catalogue de 4 gammes (Vitalité, Sérénité, Immunité, Enfants)
- **Nos Engagements** : Transparence sur nos valeurs durables et certifications
- **Panier** : Système de panier d'achat (prêt pour intégration paiement)

## 🎨 Design

- Palette de couleurs : Vert sauge, brun terre, blanc naturel
- Typographie : Playfair Display (titres) + Inter (texte)
- Design épuré et élégant évoquant pureté et authenticité
- Entièrement responsive

## 🚀 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Configurer l'API (après déploiement CloudFormation) :
```bash
# Option 1 : Fichier de configuration
# Éditez src/config.js et remplacez YOUR_API_GATEWAY_URL_HERE

# Option 2 : Variable d'environnement
cp .env.example .env
# Éditez .env et ajoutez votre URL API
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
```

## ☁️ Déploiement sur AWS Amplify

1. Pousser le code sur un dépôt Git (GitHub, GitLab, Bitbucket)

2. Aller sur [AWS Amplify Console](https://console.aws.amazon.com/amplify/)

3. Cliquer "New app" → "Host web app"

4. Connecter votre dépôt et sélectionner la branche

5. Amplify détectera automatiquement les paramètres depuis `amplify.yml`

6. Cliquer "Save and deploy"

Votre site sera en ligne en quelques minutes avec un domaine amplifyapp.com !

## 📁 Structure du Projet

```
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Header.jsx     # Navigation principale
│   │   └── Footer.jsx     # Pied de page
│   ├── pages/             # Pages du site
│   │   ├── Home.jsx       # Page d'accueil
│   │   ├── Histoire.jsx   # Notre histoire
│   │   ├── Produits.jsx   # Catalogue produits
│   │   ├── Engagements.jsx # Nos engagements
│   │   └── Panier.jsx     # Panier d'achat
│   ├── App.jsx            # Composant principal avec routing
│   └── main.jsx           # Point d'entrée
├── amplify.yml            # Configuration AWS Amplify
└── package.json           # Dépendances et scripts
```

## 🛍️ Gammes de Produits

- **Ligne Vitalité** : Boosters d'énergie naturels
- **Ligne Sérénité** : Solutions anti-stress
- **Ligne Immunité** : Renfort des défenses naturelles
- **Ligne Enfants** : Compléments adaptés aux plus jeunes

## 🌍 Engagements

- ✓ 1% du CA reversé à la biodiversité
- ✓ Emballages 100% recyclables
- ✓ Programme de reforestation actif
- ✓ Certification bio européenne
- ✓ Label "Entreprise à Mission"
- ✓ Made in France

## 🎯 Positionnement

- Milieu de gamme premium
- Prix : 25-45€ par mois de traitement
- Cible : CSP+ urbains, 25-55 ans
- Distribution : Pharmacies, magasins bio, e-commerce

## 🔧 Personnalisation

- Modifier les couleurs dans `src/index.css` (variables CSS)
- Ajouter vos produits dans `src/pages/Produits.jsx`
- Personnaliser le contenu dans chaque composant de page
- Ajouter vos coordonnées dans `src/components/Footer.jsx`

## 📈 Prochaines Étapes

Pour ajouter des fonctionnalités e-commerce complètes :
- AWS Amplify Auth pour l'authentification utilisateur
- AWS Amplify DataStore pour la gestion des produits
- Intégration Stripe pour les paiements
- AWS S3 pour les images produits
- Programme de fidélité
- Consultation personnalisée en ligne

## 📄 Licence

Privé - Tous droits réservés © 2026 NatureMama Heritage
