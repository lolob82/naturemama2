// Configuration de l'application NatureMama Heritage

export const config = {
  // URL de l'API Gateway - À mettre à jour après le déploiement CloudFormation
  // Format: https://xxxxxxxxxx.execute-api.REGION.amazonaws.com/prod/orders
  apiUrl: import.meta.env.VITE_API_URL || 'https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders',
  
  // Autres configurations
  appName: 'NatureMama Heritage',
  appVersion: '1.0.0',
};

// Validation de la configuration
export const isConfigured = () => {
  return config.apiUrl !== 'https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders';
};