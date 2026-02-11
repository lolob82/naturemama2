// Configuration de l'application NatureMama Heritage

export const config = {
  // URL de l'API Gateway - À mettre à jour après le déploiement CloudFormation
  // Format: https://xxxxxxxxxx.execute-api.REGION.amazonaws.com/prod/orders
  // REMPLACEZ LA LIGNE CI-DESSOUS PAR VOTRE URL API GATEWAY
  apiUrl: import.meta.env.VITE_API_URL || 'https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders',
  
  // Autres configurations
  appName: 'NatureMama Heritage',
  appVersion: '1.0.0',
};

// Validation de la configuration
export const isConfigured = () => {
  return config.apiUrl !== 'https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders' && 
         config.apiUrl !== '' && 
         config.apiUrl.startsWith('https://');
};