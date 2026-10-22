// Hand-made SVG globe: the meridians are animated in CSS (layout.css)
// to give the illusion of a slowly rotating Earth.
const PARALLELS = [
  { cy: 200, rx: 150, ry: 39, equator: true },
  { cy: 127.6, rx: 130, ry: 33.6 },
  { cy: 272.4, rx: 130, ry: 33.6 },
  { cy: 74.5, rx: 75, ry: 19.4 },
  { cy: 325.5, rx: 75, ry: 19.4 },
];

function GlobeIllustration() {
  return (
    <svg className="globe" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="globe-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0.62" stopColor="#a78b71" stopOpacity="0.2" />
          <stop offset="1" stopColor="#a78b71" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="globe-sphere" cx="36%" cy="30%" r="80%">
          <stop offset="0" stopColor="#2b2621" />
          <stop offset="0.55" stopColor="#151413" />
          <stop offset="1" stopColor="#0a0a0a" />
        </radialGradient>
        <linearGradient id="globe-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8d5b7" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#e8d5b7" stopOpacity="0.06" />
          <stop offset="1" stopColor="#e8d5b7" stopOpacity="0.3" />
        </linearGradient>
        <clipPath id="globe-clip">
          <circle cx="200" cy="200" r="150" />
        </clipPath>
      </defs>

      <circle cx="200" cy="200" r="200" fill="url(#globe-halo)" />
      <circle cx="200" cy="200" r="150" fill="url(#globe-sphere)" />

      <g clipPath="url(#globe-clip)" fill="none" stroke="#c9b8a0" strokeWidth="1">
        {PARALLELS.map((p) => (
          <ellipse
            key={p.cy}
            cx="200"
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            strokeOpacity={p.equator ? 0.5 : 0.2}
            stroke={p.equator ? "#a78b71" : undefined}
          />
        ))}
        <g strokeOpacity="0.28">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} className="globe__meridian" cx="200" cy="200" rx="150" ry="150" />
          ))}
        </g>
      </g>

      <circle cx="200" cy="200" r="150" fill="none" stroke="url(#globe-rim)" strokeWidth="1.5" />

      <ellipse
        className="globe__orbit"
        cx="200"
        cy="200"
        rx="192"
        ry="58"
        transform="rotate(-18 200 200)"
        fill="none"
        stroke="#e8d5b7"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <circle cx="18" cy="259" r="4" fill="#e8d5b7" />
      <circle cx="18" cy="259" r="10" fill="none" stroke="#e8d5b7" strokeOpacity="0.3" />
    </svg>
  );
}

export default GlobeIllustration;
