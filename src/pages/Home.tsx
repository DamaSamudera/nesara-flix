/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetMovieList } from "../hooks/useGetMovieList";
import Banner from "../components/Banner";
import ViewList from "../components/ViewList";
import { MovieListType } from "../hooks/MovieList.type";

const Home = () => {
  const { data: dataNowPlaying, isLoading: isLoadingPlaying } = useGetMovieList(
    MovieListType.NowPlaying
  );
  const { data: dataPopular } = useGetMovieList(MovieListType.Popular);
  const { data: dataTopRated } = useGetMovieList(MovieListType.TopRated);
  const { data: dataUpcoming } = useGetMovieList(MovieListType.Upcoming);
  const randomBanner =
    dataNowPlaying?.result[
      Math.floor(Math.random() * dataNowPlaying.result.length)
    ];

  return (
    <>
      {!isLoadingPlaying ? <Banner data={randomBanner} /> : null}
      <ViewList data={dataNowPlaying?.result} title="Now Playing" />
      <ViewList data={dataTopRated?.result} title="Top Rated" />
      <ViewList data={dataPopular?.result} title="Popular" />
      <ViewList data={dataUpcoming?.result} title="Upcoming" />
    </>
  );
};

export default Home;
