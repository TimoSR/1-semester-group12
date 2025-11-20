import type { TmdbPerson, TmdbSearchPersonResponse, TmdbImageProfile, TmdbPersonImagesResponse } from "../types/tmdb";


const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined;

console.log(import.meta.env.VITE_SOME_KEY)

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
  // Fail fast in development
  // In production you might want a softer fallback, but for this assignment
  // it's good to see an explicit error in the console.
  console.error(
    'TMDB API key is missing. Please set VITE_TMDB_API_KEY in your .env file.'
  );
}

/**
 * Build a full URL for a TMDB image using a file path and a size key.
 * Common sizes: w45, w92, w154, w185, w342, w500, w780, original
 */
export function buildProfileImageUrl(
  filePath: string,
  size: 'w45' | 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w185'
): string {
  return `${TMDB_IMAGE_BASE}/${size}${filePath}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText} – ${text}`
    );
  }

  const data = (await response.json()) as T;
  return data;
}

export async function searchPersons(query: string): Promise<TmdbPerson[]> {
  if (!TMDB_API_KEY) {
    throw new Error('Missing TMDB API key (VITE_TMDB_API_KEY).');
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${TMDB_API_BASE}/search/person?query=${encodedQuery}&api_key=${TMDB_API_KEY}`;

  const json = await fetchJson<TmdbSearchPersonResponse>(url);
  return json.results ?? [];
}

export async function getPersonImages(
  personId: number
): Promise<TmdbImageProfile[]> {
  if (!TMDB_API_KEY) {
    throw new Error('Missing TMDB API key (VITE_TMDB_API_KEY).');
  }

  const url = `${TMDB_API_BASE}/person/${personId}/images?api_key=${TMDB_API_KEY}`;
  const json = await fetchJson<TmdbPersonImagesResponse>(url);
  return json.profiles ?? [];
}
