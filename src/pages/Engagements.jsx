import './Engagements.css';

function Engagements() {
  return (
    <div className="engagements-page">
      <div className="container">
        <section className="section hero-section">
          <h1 className="section-title">Nos Engagements</h1>
          <p className="lead-text">
            Un engagement sincère pour la planète et votre bien-être
          </p>
        </section>

        <section className="section">
          <div className="engagement-grid">
            <div className="engagement-card featured">
              <div className="engagement-icon">🌍</div>
              <h2>Engagement Durable</h2>
              <p>
                1% de notre chiffre d'affaires est reversé à des projets de préservation 
                de la biodiversité. Nous croyons en un impact positif mesurable.
              </p>
            </div>

            <div className="engagement-card">
              <div className="engagement-icon">♻️</div>
              <h3>Emballages 100% Recyclables</h3>
              <p>
                Tous nos packagings sont éco-responsables et entièrement recyclables. 
                Design épuré et élégant évoquant pureté et authenticité.
              </p>
            </div>

            <div className="engagement-card">
              <div className="engagement-icon">🌳</div>
              <h3>Programme de Reforestation</h3>
              <p>
                Pour chaque commande, nous participons activement à des programmes 
                de reforestation en France et en Europe.
              </p>
            </div>

            <div className="engagement-card">
              <div className="engagement-icon">🔬</div>
              <h3>Transparence Totale</h3>
              <p>
                Traçabilité complète de nos ingrédients, de la source à votre flacon. 
                Certification bio européenne et label "Entreprise à Mission".
              </p>
            </div>

            <div className="engagement-card">
              <div className="engagement-icon">🤝</div>
              <h3>Partenariats Locaux</h3>
              <p>
                Collaborations exclusives avec des producteurs locaux français, 
                soutenant l'économie locale et les savoir-faire traditionnels.
              </p>
            </div>

            <div className="engagement-card">
              <div className="engagement-icon">✨</div>
              <h3>Qualité Premium</h3>
              <p>
                Extraction à froid des principes actifs, formulation synergique 
                et conservation naturelle sans compromis.
              </p>
            </div>
          </div>
        </section>

        <section className="section values-section">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-content">
            <div className="value-item">
              <h3>Authenticité</h3>
              <p>
                Nous privilégions la transparence et l'éducation, tout en maintenant 
                un ton chaleureux et proche de nos clients.
              </p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>
                Chaque produit est élaboré selon un processus unique combinant 
                tradition ancestrale et innovation scientifique.
              </p>
            </div>
            <div className="value-item">
              <h3>Responsabilité</h3>
              <p>
                Notre mission est de préserver les ressources naturelles pour 
                les générations futures tout en démocratisant l'accès au bien-être naturel.
              </p>
            </div>
          </div>
        </section>

        <section className="section certifications">
          <h2 className="section-title">Certifications & Labels</h2>
          <div className="cert-grid">
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>Bio Européen</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>Entreprise à Mission</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>Made in France</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>Extraction Brevetée</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Engagements;
