import './Histoire.css';

function Histoire() {
  return (
    <div className="histoire-page">
      <div className="container">
        <section className="section hero-section">
          <h1 className="section-title">Notre Histoire</h1>
          <p className="lead-text">
            Née au cœur des Alpes françaises en 2023, NatureMama Heritage incarne la rencontre 
            entre la sagesse ancestrale des plantes et l'innovation scientifique moderne.
          </p>
        </section>

        <section className="section">
          <div className="story-content">
            <div className="story-block">
              <h2>L'Origine</h2>
              <p>
                Notre voyage a commencé inspiré par la richesse de la biodiversité française 
                et le désir de proposer des solutions naturelles accessibles à tous. Nous 
                croyons en la puissance de la nature, enrichie par la rigueur scientifique.
              </p>
            </div>

            <div className="story-block">
              <h2>Notre Philosophie</h2>
              <p>
                NatureMama Heritage s'engage à créer des compléments alimentaires d'excellence, 
                en harmonie avec la nature et respectueux de l'environnement. Notre mission est 
                de démocratiser l'accès à des solutions naturelles de haute qualité, tout en 
                préservant les ressources naturelles pour les générations futures.
              </p>
            </div>
          </div>
        </section>

        <section className="section differentiation">
          <h2 className="section-title">Ce qui nous distingue</h2>
          <div className="diff-grid">
            <div className="diff-card">
              <h3>🔍 Traçabilité Complète</h3>
              <p>Chaque ingrédient est tracé de sa source à votre flacon</p>
            </div>
            <div className="diff-card">
              <h3>🤝 Partenariats Locaux</h3>
              <p>Collaborations exclusives avec des producteurs français</p>
            </div>
            <div className="diff-card">
              <h3>⚗️ Extraction Brevetée</h3>
              <p>Processus unique préservant l'intégrité des principes actifs</p>
            </div>
            <div className="diff-card">
              <h3>✓ Certifications</h3>
              <p>Bio européenne et label "Entreprise à Mission"</p>
            </div>
          </div>
        </section>

        <section className="section process">
          <h2 className="section-title">Notre Processus Unique</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Extraction à froid</h3>
              <p>Préservation maximale des principes actifs</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Formulation synergique</h3>
              <p>Association optimale des ingrédients</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Conservation naturelle</h3>
              <p>Sans conservateurs artificiels</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Packaging éco-responsable</h3>
              <p>100% recyclable et respectueux</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Histoire;
