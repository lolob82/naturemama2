# Guide de Dépannage - NatureMama Heritage

## 🔍 Problèmes Courants et Solutions

### 1. Erreurs de Validation du Formulaire

#### ❌ "Format de téléphone invalide"

**Formats acceptés :**
- `0612345678` (format standard)
- `+33612345678` (avec indicatif international)
- `06 12 34 56 78` (avec espaces)
- `06-12-34-56-78` (avec tirets)

**Règles :**
- Doit commencer par `0` ou `+33` ou `0033`
- Le premier chiffre après l'indicatif doit être entre 1 et 9
- Doit contenir exactement 10 chiffres (hors indicatif)

**Exemples valides :**
```
✅ 0612345678
✅ +33612345678
✅ 06 12 34 56 78
✅ 0033612345678
```

**Exemples invalides :**
```
❌ 612345678 (manque le 0)
❌ 0012345678 (commence par 00)
❌ 06123456 (pas assez de chiffres)
```

#### ❌ "Format d'email invalide"

**Format requis :** `utilisateur@domaine.extension`

**Exemples valides :**
```
✅ client@example.com
✅ jean.dupont@gmail.com
✅ contact@naturemama-heritage.fr
```

**Exemples invalides :**
```
❌ client@example (pas d'extension)
❌ @example.com (pas d'utilisateur)
❌ client.example.com (pas de @)
```

#### ❌ "Code postal invalide (5 chiffres)"

**Format requis :** Exactement 5 chiffres

**Exemples valides :**
```
✅ 75001
✅ 69000
✅ 13001
```

**Exemples invalides :**
```
❌ 7500 (4 chiffres)
❌ 750001 (6 chiffres)
❌ 75O01 (contient une lettre)
```

### 2. Erreurs de Configuration API

#### ❌ "L'API n'est pas configurée"

**Cause :** L'URL de l'API Gateway n'a pas été configurée

**Solution :**

1. Ouvrez `src/config.js`
2. Remplacez `'YOUR_API_GATEWAY_URL_HERE'` par votre URL API Gateway
3. L'URL doit ressembler à : `https://xxxxxxxxxx.execute-api.REGION.amazonaws.com/prod/orders`

**Ou utilisez un fichier .env :**

```bash
# Créez le fichier .env
cp .env.example .env

# Éditez .env et ajoutez :
VITE_API_URL=https://votre-api-url.amazonaws.com/prod/orders
```

#### ❌ Erreur CORS lors de l'envoi de la commande

**Symptômes :**
- Erreur dans la console : `Access to fetch has been blocked by CORS policy`
- La requête n'atteint pas le serveur

**Solutions :**

1. **Vérifiez que l'API Gateway est bien déployée**
   - Allez dans AWS Console > API Gateway
   - Vérifiez que la méthode OPTIONS existe sur `/orders`
   - Vérifiez que le stage `prod` est déployé

2. **Redéployez l'API si nécessaire**
   - Dans API Gateway, sélectionnez votre API
   - Cliquez sur "Actions" > "Deploy API"
   - Sélectionnez le stage `prod`

3. **Vérifiez les headers CORS dans Lambda**
   - Les headers suivants doivent être présents dans la réponse :
     ```python
     'Access-Control-Allow-Origin': '*'
     'Access-Control-Allow-Headers': 'Content-Type'
     'Access-Control-Allow-Methods': 'POST, OPTIONS'
     ```

### 3. Problèmes d'Email

#### ❌ Email de confirmation non reçu

**Vérifications :**

1. **Email vérifié dans SES ?**
   - Allez dans AWS Console > Amazon SES
   - Vérifiez que votre email expéditeur a le statut "Verified"

2. **SES en mode Sandbox ?**
   - En mode Sandbox, vous ne pouvez envoyer qu'aux emails vérifiés
   - Vérifiez aussi l'email du destinataire dans SES
   - Ou demandez la sortie du Sandbox (voir DEPLOYMENT_GUIDE.md)

3. **Vérifiez les logs CloudWatch**
   ```
   AWS Console > CloudWatch > Log groups > /aws/lambda/NatureMamaOrderHandler
   ```
   - Cherchez les erreurs SES
   - Vérifiez que l'email est bien envoyé

4. **Vérifiez le dossier spam**
   - Les emails SES peuvent parfois être marqués comme spam
   - Ajoutez l'expéditeur à vos contacts

#### ❌ Erreur "Email address is not verified"

**Solution :**
1. Allez dans Amazon SES
2. Vérifiez l'adresse email expéditeur
3. Si en Sandbox, vérifiez aussi l'email destinataire

### 4. Problèmes DynamoDB

#### ❌ Commande non enregistrée dans DynamoDB

**Vérifications :**

1. **Permissions IAM correctes ?**
   - Le rôle Lambda doit avoir `dynamodb:PutItem`
   - Vérifiez dans IAM > Roles > NatureMamaOrderHandlerRole

2. **Table existe ?**
   - AWS Console > DynamoDB > Tables
   - Cherchez `NatureMamaOrders`

3. **Logs Lambda**
   - CloudWatch > Log groups > /aws/lambda/NatureMamaOrderHandler
   - Cherchez les erreurs DynamoDB

### 5. Problèmes de Panier

#### ❌ Le compteur du panier ne s'incrémente pas

**Cause :** Problème avec le CartContext

**Solution :**
1. Vérifiez que `CartProvider` entoure bien l'application dans `App.jsx`
2. Ouvrez la console du navigateur et vérifiez les erreurs
3. Videz le localStorage : `localStorage.clear()` dans la console

#### ❌ Le panier se vide au rechargement de la page

**Cause :** localStorage non fonctionnel

**Solution :**
1. Vérifiez que localStorage est activé dans votre navigateur
2. Testez dans la console : `localStorage.setItem('test', 'value')`
3. Essayez en navigation privée pour voir si c'est un problème d'extension

### 6. Erreurs de Déploiement CloudFormation

#### ❌ "CREATE_FAILED" lors du déploiement

**Causes communes :**

1. **Nom de ressource déjà utilisé**
   - Solution : Changez le nom de la stack ou supprimez l'ancienne

2. **Permissions IAM insuffisantes**
   - Votre compte AWS doit avoir les permissions pour créer :
     - Lambda functions
     - API Gateway
     - DynamoDB tables
     - IAM roles

3. **Quota dépassé**
   - Vérifiez vos quotas AWS (Service Quotas)

**Pour voir l'erreur exacte :**
1. CloudFormation > Votre stack
2. Onglet "Events"
3. Cherchez la ligne avec "CREATE_FAILED"
4. Lisez le message d'erreur dans "Status reason"

### 7. Problèmes de Performance

#### ❌ La validation du formulaire est lente

**Solution :**
- C'est normal, la validation se fait à chaque frappe
- Pour optimiser, vous pouvez ajouter un debounce

#### ❌ L'envoi de la commande prend du temps

**Causes normales :**
- Lambda cold start (première invocation) : 1-3 secondes
- Envoi d'email SES : 1-2 secondes
- Écriture DynamoDB : < 1 seconde

**Total attendu :** 2-5 secondes pour la première commande, puis < 2 secondes

## 🔧 Outils de Débogage

### Console du Navigateur

Ouvrez les DevTools (F12) et vérifiez :

1. **Console** : Erreurs JavaScript
2. **Network** : Requêtes HTTP (statut, headers, body)
3. **Application** > Local Storage : Contenu du panier

### AWS CloudWatch Logs

Pour voir les logs Lambda en temps réel :

```bash
# Installez AWS CLI si nécessaire
aws logs tail /aws/lambda/NatureMamaOrderHandler --follow
```

### Test de l'API avec curl

```bash
curl -X POST https://votre-api-url.amazonaws.com/prod/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "fullName": "Test User",
      "email": "test@example.com",
      "street": "Rue de Test",
      "streetNumber": "123",
      "postalCode": "75001",
      "city": "Paris",
      "phone": "0612345678"
    },
    "items": [
      {
        "id": 1,
        "name": "Test Product",
        "price": 29.99,
        "quantity": 1
      }
    ],
    "total": 29.99,
    "orderDate": "2026-02-11T10:00:00.000Z"
  }'
```

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. Vérifiez les logs CloudWatch
2. Testez l'API avec curl
3. Vérifiez la configuration SES
4. Consultez la documentation AWS

## 📚 Ressources Utiles

- [AWS Lambda Troubleshooting](https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html)
- [Amazon SES Troubleshooting](https://docs.aws.amazon.com/ses/latest/dg/troubleshoot.html)
- [API Gateway CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)
- [DynamoDB Troubleshooting](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html)
