import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_Token } from "../config/token";
import { Movie } from "./Movie.types";

type MovieVideoResponse = Readonly<Movie>;

export const useGetMovieDetails = (id?: number) => {
  return useQuery({
    queryKey: ["movie-detail"],
    queryFn: () => {
      return axios.get<MovieVideoResponse>(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_Token}`,
          },
        }
      );
    },
    select({ data }) {
      return {
        result: data,
      };
    },
  });
};
