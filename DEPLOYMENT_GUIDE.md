# Guide de Déploiement - NatureMama Heritage

## 📋 Prérequis

1. Compte AWS actif
2. Accès à la Console AWS CloudFormation
3. Adresse email pour les notifications (à vérifier dans SES)

## 🚀 Étape 1 : Vérification de l'email dans Amazon SES

Avant de déployer le template CloudFormation, vous devez vérifier votre adresse email d'expéditeur dans Amazon SES.

### Dans la Console AWS :

1. Allez dans **Amazon SES** (Simple Email Service)
2. Dans le menu de gauche, cliquez sur **Verified identities**
3. Cliquez sur **Create identity**
4. Sélectionnez **Email address**
5. Entrez votre adresse email (ex: `noreply@naturemama-heritage.com`)
6. Cliquez sur **Create identity**
7. **Important** : Vérifiez votre boîte mail et cliquez sur le lien de vérification
8. Attendez que le statut passe à **Verified**

### Note sur le Sandbox SES :

Par défaut, SES est en mode "Sandbox" :
- Vous ne pouvez envoyer des emails qu'aux adresses vérifiées
- Pour envoyer à n'importe quelle adresse, demandez la sortie du Sandbox :
  - Dans SES, allez dans **Account dashboard**
  - Cliquez sur **Request production access**
  - Remplissez le formulaire de demande

## 🔧 Étape 2 : Déploiement du Template CloudFormation

### Via la Console AWS :

1. **Ouvrez CloudFormation**
   - Connectez-vous à la Console AWS
   - Recherchez "CloudFormation" dans la barre de recherche
   - Sélectionnez votre région (ex: eu-west-1 pour Paris)

2. **Créez une nouvelle stack**
   - Cliquez sur **Create stack** > **With new resources (standard)**

3. **Uploadez le template**
   - Sélectionnez **Upload a template file**
   - Cliquez sur **Choose file**
   - Sélectionnez le fichier `cloudformation-template.yaml`
   - Cliquez sur **Next**

4. **Configurez la stack**
   - **Stack name** : `NatureMamaHeritage`
   - **SenderEmail** : Entrez l'email vérifié dans SES (ex: `noreply@naturemama-heritage.com`)
   - Cliquez sur **Next**

5. **Options de la stack** (page suivante)
   - Laissez les valeurs par défaut
   - Cliquez sur **Next**

6. **Revue et création**
   - Vérifiez tous les paramètres
   - ✅ **Important** : Cochez la case **"I acknowledge that AWS CloudFormation might create IAM resources"**
   - Cliquez sur **Submit**

7. **Attendez la création**
   - Le statut passera de `CREATE_IN_PROGRESS` à `CREATE_COMPLETE`
   - Cela prend environ 2-3 minutes

## 📝 Étape 3 : Récupération de l'URL de l'API

Une fois la stack créée :

1. Dans CloudFormation, sélectionnez votre stack `NatureMamaHeritage`
2. Allez dans l'onglet **Outputs**
3. Copiez la valeur de **ApiUrl**
   - Format : `https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/prod/orders`

## 🔗 Étape 4 : Configuration de l'Application React

1. Ouvrez le fichier `src/pages/Panier.jsx`
2. Trouvez la ligne :
   ```javascript
   const API_URL = 'YOUR_API_GATEWAY_URL_HERE';
   ```
3. Remplacez par l'URL copiée :
   ```javascript
   const API_URL = 'https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/prod/orders';
   ```

## 🧪 Étape 5 : Test de l'Application

1. **Démarrez l'application** :
   ```bash
   npm install
   npm run dev
   ```

2. **Testez une commande** :
   - Ajoutez des produits au panier
   - Remplissez le formulaire de commande
   - Validez la commande
   - Vérifiez la réception de l'email

3. **Vérifiez dans AWS** :
   - **DynamoDB** : Allez dans la table `NatureMamaOrders` pour voir la commande
   - **CloudWatch Logs** : Vérifiez les logs de la fonction Lambda `/aws/lambda/NatureMamaOrderHandler`

## 📊 Ressources Créées

Le template CloudFormation crée :

| Ressource | Nom | Description |
|-----------|-----|-------------|
| Table DynamoDB | `NatureMamaOrders` | Stockage des commandes |
| Fonction Lambda | `NatureMamaOrderHandler` | Traitement des commandes |
| API Gateway | `NatureMamaOrderAPI` | API REST publique |
| Rôle IAM | `NatureMamaOrderHandlerRole` | Permissions Lambda |

## 🔍 Vérification des Commandes dans DynamoDB

1. Allez dans **DynamoDB** dans la Console AWS
2. Cliquez sur **Tables** > **NatureMamaOrders**
3. Cliquez sur **Explore table items**
4. Vous verrez toutes les commandes avec :
   - `orderId` : Numéro de commande (clé primaire)
   - `customer` : Informations client
   - `items` : Produits commandés
   - `total` : Montant total
   - `orderDate` : Date de commande
   - `status` : Statut (confirmed)

## 🛠️ Dépannage

### L'email n'est pas reçu

1. Vérifiez que l'email est bien vérifié dans SES
2. Vérifiez les logs CloudWatch de la fonction Lambda
3. Si en Sandbox, vérifiez que l'email destinataire est aussi vérifié

### Erreur CORS

Si vous avez des erreurs CORS :
1. Vérifiez que la méthode OPTIONS est bien déployée
2. Redéployez l'API dans API Gateway si nécessaire

### Erreur 500 de l'API

1. Allez dans **CloudWatch** > **Log groups**
2. Ouvrez `/aws/lambda/NatureMamaOrderHandler`
3. Consultez les derniers logs pour voir l'erreur

## 🗑️ Suppression des Ressources

Pour supprimer toutes les ressources créées :

1. Allez dans **CloudFormation**
2. Sélectionnez la stack `NatureMamaHeritage`
3. Cliquez sur **Delete**
4. Confirmez la suppression

**Note** : La table DynamoDB sera supprimée avec toutes les commandes !

## 💰 Coûts Estimés

Avec l'utilisation gratuite AWS (Free Tier) :
- **DynamoDB** : 25 GB gratuits, puis ~0.25€/GB/mois
- **Lambda** : 1M requêtes gratuites/mois, puis 0.20€/M requêtes
- **API Gateway** : 1M appels gratuits/mois, puis 3.50€/M appels
- **SES** : 62,000 emails gratuits/mois, puis 0.10€/1000 emails

Pour un petit site e-commerce : **< 5€/mois**

## 📧 Support

Pour toute question sur le déploiement, consultez :
- [Documentation AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/)
- [Documentation Amazon SES](https://docs.aws.amazon.com/ses/)
- [Documentation API Gateway](https://docs.aws.amazon.com/apigateway/)
