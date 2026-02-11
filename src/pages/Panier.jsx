import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { config, isConfigured } from '../config';
import './Panier.css';

function Panier() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    city: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    // French phone: 0612345678 or +33612345678 or 33612345678
    const re = /^(\+33|0033|0)[1-9](\d{8})$/;
    return re.test(cleaned);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'La rue est requise';
    }

    if (!formData.streetNumber.trim()) {
      newErrors.streetNumber = 'Le numéro de rue est requis';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide (ex: 0612345678 ou +33612345678)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: formData,
        items: cart,
        total: getCartTotal(),
        orderDate: new Date().toISOString()
      };

      if (!isConfigured()) {
        throw new Error('L\'API n\'est pas configurée. Veuillez mettre à jour l\'URL dans src/config.js');
      }
      
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        console.error('Status Code:', response.status);
        throw new Error(errorData.error || errorData.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Commande réussie:', result);

      setOrderSuccess(true);
      clearCart();
      setFormData({
        fullName: '',
        email: '',
        street: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        phone: ''
      });

    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Type d\'erreur:', error.name);
      console.error('Message:', error.message);
      
      let userMessage = 'Une erreur est survenue lors de la commande.\n\n';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        userMessage += '❌ Erreur de connexion\n';
        userMessage += 'Vérifiez votre connexion internet ou que l\'API est accessible.\n\n';
      } else if (error.message.includes('403')) {
        userMessage += '❌ Accès refusé (403)\n';
        userMessage += 'Problème de permissions ou CORS.\n\n';
      } else if (error.message.includes('500')) {
        userMessage += '❌ Erreur serveur (500)\n';
        userMessage += 'Vérifiez les logs CloudWatch Lambda.\n\n';
      } else {
        userMessage += `Détails: ${error.message}\n\n`;
      }
      
      userMessage += 'Consultez la console (F12) pour plus de détails.';
      
      alert(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="panier-page">
        <div className="container">
          <section className="section">
            <div className="order-success">
              <div className="success-icon">✓</div>
              <h1>Commande confirmée !</h1>
              <p>Merci pour votre commande. Un email de confirmation vous a été envoyé.</p>
              <a href="/nos-produits" className="continue-shopping">Continuer mes achats</a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="panier-page">
        <div className="container">
          <section className="section">
            <h1 className="section-title">Votre Panier</h1>
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p>Votre panier est vide</p>
              <p className="empty-subtitle">Découvrez nos compléments alimentaires naturels</p>
              <a href="/nos-produits" className="continue-shopping">Voir nos produits</a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="panier-page">
      <div className="container">
        <section className="section">
          <h1 className="section-title">Votre Panier</h1>

          {!showCheckout ? (
            <div className="cart-content">
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">{item.image}</div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-line">{item.line}</p>
                      <p className="item-price">{item.price}€</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                    <button className="item-remove" onClick={() => removeFromCart(item.id)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Récapitulatif</h2>
                <div className="summary-line">
                  <span>Sous-total</span>
                  <span>{getCartTotal().toFixed(2)}€</span>
                </div>
                <div className="summary-line">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>{getCartTotal().toFixed(2)}€</span>
                </div>
                <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                  Passer la commande
                </button>
              </div>
            </div>
          ) : (
            <div className="checkout-form">
              <h2>Informations de livraison</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Nom complet *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="streetNumber">Numéro *</label>
                    <input
                      type="text"
                      id="streetNumber"
                      name="streetNumber"
                      value={formData.streetNumber}
                      onChange={handleInputChange}
                      className={errors.streetNumber ? 'error' : ''}
                    />
                    {errors.streetNumber && <span className="error-message">{errors.streetNumber}</span>}
                  </div>

                  <div className="form-group flex-grow">
                    <label htmlFor="street">Rue *</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={errors.street ? 'error' : ''}
                    />
                    {errors.street && <span className="error-message">{errors.street}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="postalCode">Code postal *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>

                  <div className="form-group flex-grow">
                    <label htmlFor="city">Ville *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Numéro de téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                  <small style={{ display: 'block', marginTop: '0.25rem', color: 'var(--earth-brown)', fontSize: '0.85rem' }}>
                    Format accepté: 0612345678, +33612345678, ou avec espaces
                  </small>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowCheckout(false)}>
                    Retour au panier
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Traitement...' : `Valider la commande (${getCartTotal().toFixed(2)}€)`}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Panier;
