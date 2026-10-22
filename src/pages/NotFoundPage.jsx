import { Link } from "react-router";
import StatePanel from "../components/StatePanel.jsx";

function NotFoundPage() {
  return (
    <div className="container page">
      <StatePanel
        title="Cette page n'existe pas"
        action={
          <Link to="/" className="button button--primary">
            Revenir à l'exploration
          </Link>
        }
      >
        L'adresse saisie ne correspond à aucune page d'Atlas.
      </StatePanel>
    </div>
  );
}

export default NotFoundPage;
