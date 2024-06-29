import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_Token } from "../config/token";
import { MovieVideo } from "./Movie.types";

type MovieVideoResponse = Readonly<{
  id: number;
  results: MovieVideo[];
}>;

export const useGetMovieVideo = (id?: number) => {
  return useQuery({
    queryKey: ["movie-video"],
    queryFn: () => {
      return axios.get<MovieVideoResponse>(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
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
