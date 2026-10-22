// Helpers that turn raw API data into a predictable shape for the components.

export const REGION_LABELS = {
  Africa: "Afrique",
  Americas: "Amériques",
  Asia: "Asie",
  Europe: "Europe",
  Oceania: "Océanie",
  Polar: "Régions polaires",
};

// The API uses three different names for the same polar area (3 countries in total)
const POLAR_REGIONS = ["Polar", "Antarctic", "Antarctic Ocean"];

const SUBREGION_LABELS = {
  "Australia and New Zealand": "Australie et Nouvelle-Zélande",
  Caribbean: "Caraïbes",
  "Central America": "Amérique centrale",
  "Central Asia": "Asie centrale",
  "Central Europe": "Europe centrale",
  "Eastern Africa": "Afrique de l'Est",
  "Eastern Asia": "Asie de l'Est",
  "Eastern Europe": "Europe de l'Est",
  Melanesia: "Mélanésie",
  Micronesia: "Micronésie",
  "Middle Africa": "Afrique centrale",
  "North America": "Amérique du Nord",
  "Northern Africa": "Afrique du Nord",
  "Northern America": "Amérique du Nord",
  "Northern Europe": "Europe du Nord",
  Polynesia: "Polynésie",
  "South America": "Amérique du Sud",
  "South-Eastern Asia": "Asie du Sud-Est",
  "Southern Africa": "Afrique australe",
  "Southern Asia": "Asie du Sud",
  "Southern Europe": "Europe du Sud",
  "Western Africa": "Afrique de l'Ouest",
  "Western Asia": "Asie de l'Ouest",
  "Western Europe": "Europe de l'Ouest",
  Antarctica: "Antarctique",
  Antarctic: "Antarctique",
  "South Antarctic Ocean": "Océan Austral",
};

const languageNames = new Intl.DisplayNames(["fr"], { type: "language" });
const currencyNames = new Intl.DisplayNames(["fr"], { type: "currency" });
const countryNames = new Intl.DisplayNames(["fr"], { type: "region" });

function isImageUrl(value) {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Lowercase and remove accents so that "bresil" matches "Brésil"
export function normalizeText(text) {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function translate(displayNames, code, fallback) {
  try {
    return code ? capitalize(displayNames.of(code)) : fallback;
  } catch {
    return fallback;
  }
}

export function normalizeCountry(raw) {
  // Depending on the endpoint, `name` can be a string or an object { common, official }
  const englishName = typeof raw.name === "string" ? raw.name : (raw.name?.common ?? null);
  // French name: /countries provides translations, /alpha does not, so the browser
  // can translate the 2-letter ISO code instead (it returns the code itself if unknown)
  const frenchFromCode = translate(countryNames, raw.alpha2Code, null);
  const name =
    raw.translations?.fr ||
    (frenchFromCode && frenchFromCode !== raw.alpha2Code ? frenchFromCode : null) ||
    englishName ||
    "Pays sans nom";
  const nativeName = typeof raw.nativeName === "string" ? raw.nativeName : null;

  // `flag` is usually an emoji, so it is only used when it really is an image URL
  const flagSvg = raw.flags?.svg || (isImageUrl(raw.flag) ? raw.flag : null);
  const flagPng = raw.flags?.png || flagSvg;

  const capital = Array.isArray(raw.capital) ? raw.capital[0] : raw.capital;
  const region = POLAR_REGIONS.includes(raw.region) ? "Polar" : raw.region || null;

  return {
    code: String(raw.alpha3Code || raw.cca3 || raw.alpha2Code || raw.cca2 || "").toUpperCase(),
    name,
    englishName,
    nativeName,
    flagSvg,
    flagPng,
    capital: capital || null,
    region,
    subregion: raw.subregion ? (SUBREGION_LABELS[raw.subregion] ?? raw.subregion) : null,
    population: typeof raw.population === "number" ? raw.population : null,
    area: typeof raw.area === "number" ? raw.area : null,
    languages: (raw.languages ?? []).map((lang) => translate(languageNames, lang.iso639_1, lang.name)),
    currencies: (raw.currencies ?? []).map((cur) => translate(currencyNames, cur.code, cur.name)),
    timezones: raw.timezones ?? [],
    borders: raw.borders ?? [],
    latlng: Array.isArray(raw.latlng) && raw.latlng.length === 2 ? raw.latlng : null,
    mapUrl: raw.maps?.openStreetMaps ?? null,
    searchText: normalizeText([name, englishName, nativeName].filter(Boolean).join(" ")),
  };
}

export function getRegionLabel(region) {
  return REGION_LABELS[region] ?? region ?? "Région inconnue";
}

// Regions really present in the data, in a stable order, with their country count
export function getRegions(countries) {
  const counts = {};
  countries.forEach((country) => {
    if (country.region) {
      counts[country.region] = (counts[country.region] ?? 0) + 1;
    }
  });

  return Object.keys(counts)
    .map((value) => ({ value, label: getRegionLabel(value), count: counts[value] }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));
}

export const DEFAULT_FILTERS = { query: "", region: "" };

export function filterCountries(countries, { query = "", region = "" }) {
  const search = normalizeText(query);

  return countries.filter((country) => {
    const matchesRegion = !region || country.region === region;
    const matchesSearch = !search || country.searchText.includes(search);
    return matchesRegion && matchesSearch;
  });
}

const numberFormat = new Intl.NumberFormat("fr-FR");
const compactFormat = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 });

export function formatNumber(value) {
  return value == null ? null : numberFormat.format(value);
}

export function formatCompact(value) {
  return value == null ? null : compactFormat.format(value);
}
