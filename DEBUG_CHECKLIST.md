# Checklist de Débogage - Erreur de Traitement

## 🔍 Informations à Vérifier

### 1. Console du Navigateur (F12)

**Console Tab :**
- Quel est le message d'erreur complet ?
- Y a-t-il une stack trace ?

**Network Tab :**
- Trouvez la requête POST vers `/orders`
- Quel est le Status Code ? (200, 400, 403, 500, etc.)
- Dans l'onglet "Response", quel est le message d'erreur ?
- Dans l'onglet "Headers", vérifiez les CORS headers

### 2. AWS CloudWatch Logs

Allez dans AWS Console > CloudWatch > Log groups > `/aws/lambda/NatureMamaOrderHandler`

**Cherchez :**
- Les erreurs récentes (dernières 5 minutes)
- Messages contenant "Error" ou "Exception"
- Le timestamp doit correspondre à votre tentative

**Erreurs communes :**

#### A. Erreur SES - Email non vérifié
```
MessageRejected: Email address is not verified
```
**Solution :**
1. AWS Console > Amazon SES > Verified identities
2. Vérifiez que votre email expéditeur est "Verified"
3. Si en Sandbox, vérifiez aussi l'email destinataire

#### B. Erreur DynamoDB - Permissions
```
AccessDeniedException: User is not authorized to perform: dynamodb:PutItem
```
**Solution :**
1. AWS Console > IAM > Roles > NatureMamaOrderHandlerRole
2. Vérifiez que la policy DynamoDBAccess existe
3. Vérifiez que la ressource pointe vers la bonne table

#### C. Erreur Lambda - Timeout
```
Task timed out after 30.00 seconds
```
**Solution :**
1. Augmentez le timeout dans CloudFormation (actuellement 30s)
2. Ou vérifiez pourquoi Lambda est lent (cold start, SES lent)

#### D. Erreur de Format - JSON
```
JSONDecodeError: Expecting value
```
**Solution :**
- Le body de la requête n'est pas du JSON valide
- Vérifiez que les données du panier sont correctes

### 3. Test Manuel de l'API

Testez l'API directement avec curl :

```bash
curl -X POST https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "fullName": "Test User",
      "email": "VOTRE_EMAIL_VERIFIE@example.com",
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
        "line": "Ligne Test",
        "price": 29.99,
        "quantity": 1,
        "image": "🌿"
      }
    ],
    "total": 29.99,
    "orderDate": "2026-02-11T10:00:00.000Z"
  }'
```

**Remplacez :**
- `VOTRE_EMAIL_VERIFIE@example.com` par un email vérifié dans SES
- L'URL si différente

**Résultat attendu :**
```json
{
  "message": "Commande enregistrée avec succès",
  "orderId": "NM20260211123456"
}
```

### 4. Vérifications AWS Spécifiques

#### Amazon SES
- [ ] Email expéditeur vérifié (status: Verified)
- [ ] Si Sandbox : email destinataire aussi vérifié
- [ ] Région SES = Région Lambda (us-east-1)

#### DynamoDB
- [ ] Table `NatureMamaOrders` existe
- [ ] Clé primaire : `orderId` (String)
- [ ] Pas d'erreur de quota

#### Lambda
- [ ] Fonction `NatureMamaOrderHandler` existe
- [ ] Runtime : Python 3.11
- [ ] Timeout : 30 secondes
- [ ] Variables d'environnement :
  - `ORDERS_TABLE` = NatureMamaOrders
  - `SENDER_EMAIL` = votre email vérifié

#### IAM Role
- [ ] Role `NatureMamaOrderHandlerRole` existe
- [ ] Policies attachées :
  - AWSLambdaBasicExecutionRole
  - DynamoDBAccess (PutItem, GetItem, Query, Scan)
  - SESAccess (SendEmail, SendRawEmail)

#### API Gateway
- [ ] API `NatureMamaOrderAPI` existe
- [ ] Resource `/orders` existe
- [ ] Méthode POST configurée
- [ ] Méthode OPTIONS configurée (CORS)
- [ ] Stage `prod` déployé

### 5. Solutions Rapides par Type d'Erreur

#### Status 403 - Forbidden
**Cause :** Problème CORS ou permissions API Gateway
**Solution :**
1. Vérifiez que la méthode OPTIONS existe
2. Redéployez l'API : API Gateway > Actions > Deploy API > Stage: prod

#### Status 500 - Internal Server Error
**Cause :** Erreur dans Lambda
**Solution :**
1. Consultez CloudWatch Logs
2. Vérifiez les permissions IAM
3. Vérifiez que SES email est vérifié

#### Status 502 - Bad Gateway
**Cause :** Lambda timeout ou crash
**Solution :**
1. Vérifiez CloudWatch Logs
2. Augmentez le timeout Lambda
3. Vérifiez le format des données

#### Status 400 - Bad Request
**Cause :** Format de données invalide
**Solution :**
1. Vérifiez que tous les champs requis sont présents
2. Vérifiez le format JSON
3. Consultez les logs Lambda pour voir quel champ pose problème

## 📋 Commandes Utiles

### Voir les logs Lambda en temps réel
```bash
aws logs tail /aws/lambda/NatureMamaOrderHandler --follow
```

### Voir les dernières erreurs
```bash
aws logs tail /aws/lambda/NatureMamaOrderHandler --since 10m --filter-pattern "ERROR"
```

### Lister les commandes dans DynamoDB
```bash
aws dynamodb scan --table-name NatureMamaOrders --max-items 5
```

### Vérifier les emails vérifiés dans SES
```bash
aws ses list-verified-email-addresses
```

## 🎯 Prochaines Étapes

1. **Identifiez le type d'erreur** (Status Code dans Network tab)
2. **Consultez CloudWatch Logs** pour voir l'erreur exacte
3. **Appliquez la solution** correspondante ci-dessus
4. **Testez à nouveau**

## 💡 Besoin d'Aide ?

Partagez ces informations :
- Status Code de la requête
- Message d'erreur dans la Response
- Logs CloudWatch (dernières lignes)
- Région AWS utilisée
- Email expéditeur configuré
