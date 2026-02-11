import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>NatureMama Heritage</h3>
            <p className="footer-tagline">La force de la nature pour votre bien-être</p>
            <p className="footer-desc">
              Compléments alimentaires naturels, fabriqués dans les Alpes françaises
            </p>
          </div>
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><a href="/notre-histoire">Notre Histoire</a></li>
              <li><a href="/nos-produits">Nos Produits</a></li>
              <li><a href="/nos-engagements">Nos Engagements</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: [email]</p>
            <p>Tél: [phone_number]</p>
            <p className="footer-social">Instagram | Facebook | Pinterest</p>
          </div>
          <div className="footer-section">
            <h4>Certifications</h4>
            <p>✓ Bio Européen</p>
            <p>✓ Entreprise à Mission</p>
            <p>✓ Made in France</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 NatureMama Heritage. Tous droits réservés.</p>
          <p className="footer-legal">
            <a href="#">Mentions légales</a> | <a href="#">CGV</a> | <a href="#">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
