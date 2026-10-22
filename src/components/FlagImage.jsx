import { useState } from "react";

// Shows a flag, or a tidy placeholder when the URL is missing or the image fails to load
function FlagImage({ src, name, code, className = "", loading = "lazy" }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div className="flag-fallback" role="img" aria-label={`Drapeau indisponible : ${name}`}>
        <span className="flag-fallback__code">{code || "?"}</span>
        <span>Drapeau indisponible</span>
      </div>
    );
  }

  return (
    <img
      className={`flag-frame__img ${className}`}
      src={src}
      alt={`Drapeau : ${name}`}
      width="320"
      height="213"
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  );
}

export default FlagImage;
