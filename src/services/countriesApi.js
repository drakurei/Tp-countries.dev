import { normalizeCountry } from "../utils/countryUtils.js";

const API_URL = "https://countries.dev";

async function request(path, signal) {
  const response = await fetch(`${API_URL}${path}`, { signal });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function getAllCountries(signal) {
  const data = await request("/countries", signal);
  return data.map(normalizeCountry);
}

export async function getCountryByCode(code, signal) {
  const data = await request(`/alpha/${encodeURIComponent(code)}`, signal);

  // /alpha returns an object, but the other endpoints return arrays: accept both
  const raw = Array.isArray(data) ? data[0] : data;
  if (!raw) {
    const error = new Error("Country not found");
    error.status = 404;
    throw error;
  }

  return normalizeCountry(raw);
}
