import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" className="app__main">
        <Hero countryCount={0} regionCount={0} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
