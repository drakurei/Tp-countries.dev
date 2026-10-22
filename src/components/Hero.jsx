import GlobeIllustration from "./GlobeIllustration.jsx";

function Hero({ countryCount, regionCount }) {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title" className="hero__title">
          Le monde, à portée de regard.
        </h1>
        <p className="hero__lead">
          Atlas rassemble les pays du monde au même endroit. Cherchez un pays par son nom, parcourez une
          région, puis ouvrez sa fiche pour découvrir sa capitale, sa population, ses langues et ses voisins.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#explorer">
            Explorer les pays
          </a>
          {countryCount > 0 && (
            <p className="hero__note">
              {countryCount} pays et territoires, {regionCount} régions
            </p>
          )}
        </div>
      </div>

      <div className="hero__visual">
        <GlobeIllustration />
      </div>
    </section>
  );
}

export default Hero;
