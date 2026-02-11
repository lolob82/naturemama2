import { useState } from 'react';
import { useCart } from '../context/CartContext';
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
    const re = /^(\+33|0)[1-9](\d{2}){4}$/;
    return re.test(phone.replace(/\s/g, ''));
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

      // TODO: Remplacer par votre URL API Gateway
      const API_URL = 'https://pe3xy8ft5i.execute-api.us-east-1.amazonaws.com/prod/orders';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la commande');
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
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
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
                    placeholder="0612345678"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
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
