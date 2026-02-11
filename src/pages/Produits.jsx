import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Produits.css';

const products = [
  {
    id: 1,
    name: 'Vitalité Boost',
    line: 'Ligne Vitalité',
    price: 34.99,
    description: 'Booster d\'énergie naturel pour votre quotidien',
    benefits: ['Énergie durable', 'Concentration', 'Vitalité'],
    image: '⚡'
  },
  {
    id: 2,
    name: 'Sérénité Plus',
    line: 'Ligne Sérénité',
    price: 29.99,
    description: 'Solution naturelle anti-stress',
    benefits: ['Relaxation', 'Sommeil réparateur', 'Équilibre émotionnel'],
    image: '🌸'
  },
  {
    id: 3,
    name: 'Immunité Forte',
    line: 'Ligne Immunité',
    price: 32.99,
    description: 'Renfort des défenses naturelles',
    benefits: ['Protection', 'Résistance', 'Bien-être'],
    image: '🛡️'
  },
  {
    id: 4,
    name: 'Junior Vitalité',
    line: 'Ligne Enfants',
    price: 25.99,
    description: 'Compléments adaptés aux plus jeunes',
    benefits: ['Croissance', 'Concentration', 'Énergie'],
    image: '🌟'
  },
  {
    id: 5,
    name: 'Équilibre Digestif',
    line: 'Ligne Vitalité',
    price: 28.99,
    description: 'Confort digestif au naturel',
    benefits: ['Digestion', 'Confort', 'Bien-être'],
    image: '🌿'
  },
  {
    id: 6,
    name: 'Beauté Intérieure',
    line: 'Ligne Sérénité',
    price: 39.99,
    description: 'Éclat et vitalité de l\'intérieur',
    benefits: ['Peau éclatante', 'Cheveux forts', 'Ongles sains'],
    image: '✨'
  }
];

function Produits() {
  const [selectedLine, setSelectedLine] = useState('Tous');
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  
  const lines = ['Tous', 'Ligne Vitalité', 'Ligne Sérénité', 'Ligne Immunité', 'Ligne Enfants'];
  
  const filteredProducts = selectedLine === 'Tous' 
    ? products 
    : products.filter(p => p.line === selectedLine);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="produits-page">
      <div className="container">
        <section className="section">
          <h1 className="section-title">Nos Produits</h1>
          <p className="section-subtitle">
            Des compléments alimentaires 100% naturels, scientifiquement prouvés
          </p>

          <div className="filter-bar">
            {lines.map(line => (
              <button
                key={line}
                className={`filter-btn ${selectedLine === line ? 'active' : ''}`}
                onClick={() => setSelectedLine(line)}
              >
                {line}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <span className="product-line">{product.line}</span>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-benefits">
                    {product.benefits.map((benefit, idx) => (
                      <span key={idx} className="benefit-tag">{benefit}</span>
                    ))}
                  </div>
                  <div className="product-footer">
                    <p className="product-price">{product.price}€</p>
                    <span className="price-info">/ mois de traitement</span>
                  </div>
                  <button 
                    className={`add-to-cart ${addedProducts[product.id] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProducts[product.id] ? '✓ Ajouté' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section info-section">
          <div className="info-grid">
            <div className="info-card">
              <h3>🌿 Extraction à froid</h3>
              <p>Préservation maximale des principes actifs</p>
            </div>
            <div className="info-card">
              <h3>✓ Certifié Bio</h3>
              <p>Certification bio européenne</p>
            </div>
            <div className="info-card">
              <h3>🇫🇷 Made in France</h3>
              <p>Fabriqué dans les Alpes françaises</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Produits;
