type genre = {
  id: number;
  name: string;
};

type productionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type productionCountry = {
  iso_3166_1: string;
  name: string;
};

type spokenLanguages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieVideo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: productionCompany[];
  production_countries: productionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: spokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
