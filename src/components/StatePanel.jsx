import { AlertIcon, CompassIcon } from "./Icons.jsx";

// Message block used for errors, empty results and unknown pages
function StatePanel({ tone = "info", title, children, action }) {
  const Icon = tone === "error" ? AlertIcon : CompassIcon;

  return (
    <div className={`state-panel state-panel--${tone}`} role={tone === "error" ? "alert" : undefined}>
      <Icon className="state-panel__icon" />
      <h2 className="state-panel__title">{title}</h2>
      <p className="state-panel__text">{children}</p>
      {action}
    </div>
  );
}

export default StatePanel;
