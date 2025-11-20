export interface TmdbKnownForMedia {
  id: number;
  media_type: 'movie' | 'tv' | string;
  title?: string;           // for movies
  name?: string;            // for TV
  original_title?: string;
  original_name?: string;
  overview: string;
  release_date?: string;    // movies
  first_air_date?: string;  // TV
  poster_path?: string | null;
}

export interface TmdbPerson {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: TmdbKnownForMedia[];
}

export interface TmdbSearchPersonResponse {
  page: number;
  results: TmdbPerson[];
  total_pages: number;
  total_results: number;
}

export interface TmdbImageProfile {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TmdbPersonImagesResponse {
  id: number;
  profiles: TmdbImageProfile[];
}