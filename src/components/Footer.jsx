function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          <span className="site-footer__title">Atlas</span>, explorer le monde, un pays à la fois.
        </p>
        <p>
          TP React Countries Explorer. Données :{" "}
          <a href="https://countries.dev" target="_blank" rel="noreferrer">
            countries.dev
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
