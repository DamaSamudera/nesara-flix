export enum MovieListType {
  NowPlaying = "now_playing",
  Popular = "popular",
  TopRated = "top_rated",
  Upcoming = "upcoming",
}

export type MovieList = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
