import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieList } from "./MovieList.type";
import { API_Token } from "../config/token";

type MovieListResponse = Readonly<{
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieList[];
  total_pages: number;
  total_results: number;
}>;

export const useGetMovieList = (type: string) => {
  return useQuery({
    queryKey: [type],
    queryFn: () => {
      return axios.get<MovieListResponse>(
        `https://api.themoviedb.org/3/movie/${type}`,
        {
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_Token}`,
          },
        }
      );
    },
    select({ data }): {
      result: MovieList[];
    } {
      return {
        result: data.results,
      };
    },
  });
};
