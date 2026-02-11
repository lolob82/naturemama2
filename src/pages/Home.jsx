import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>La force de la nature pour votre bien-être</h1>
            <p>Fusion de la sagesse ancestrale des plantes avec la science moderne</p>
            <Link to="/nos-produits" className="cta-button">Découvrir nos produits</Link>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="container">
          <h2 className="section-title">Née au cœur des Alpes françaises</h2>
          <p className="intro-text">
            NatureMama Heritage incarne la rencontre entre la sagesse ancestrale des plantes 
            et l'innovation scientifique moderne. Nos compléments alimentaires d'excellence 
            sont en harmonie avec la nature et respectueux de l'environnement.
          </p>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <h2 className="section-title">Notre Différence</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>100% Naturel</h3>
              <p>Ingrédients bio certifiés, extraction à froid préservant les principes actifs</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Scientifiquement Prouvé</h3>
              <p>Formulations synergiques testées et validées par la recherche</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🇫🇷</div>
              <h3>Traçabilité Complète</h3>
              <p>Partenariats exclusifs avec des producteurs locaux français</p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻️</div>
              <h3>Engagement Durable</h3>
              <p>Packaging éco-responsable, 1% du CA pour la biodiversité</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <h2>Rejoignez notre communauté engagée</h2>
          <p>Découvrez nos gammes en pharmacie et sur notre boutique en ligne</p>
          <Link to="/nos-produits" className="cta-button-secondary">Voir nos produits</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
