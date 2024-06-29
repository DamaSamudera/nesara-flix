import { ArrowLeftCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieVideo } from "../hooks/useGetMovieVideo";
import Button from "../components/Button";
import { useGetMovieDetails } from "../hooks/useGetMovieDetails";
import { videoSource } from "../config/utils/video.utils";

const Player = () => {
  const { id } = useParams();
  const { data: movieVideo } = useGetMovieVideo(Number(id));
  const { data: movieDetails } = useGetMovieDetails(Number(id));
  const navigate = useNavigate();

  const detailItem = (title: string, value?: string | number) => {
    return (
      <div>
        <p className="text-white text-xl font-bold">{title}</p>
        <p className="text-gray-500 text-2s">{value || "-"}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-screen">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-700 absolute top-25 leading-10 w-30 h-30 p-2 z-100"
        onClick={() => navigate('/')}
      >
        <ArrowLeftCircle />
      </Button>
      <iframe
        className="w-full h-[60vh] flex-shrink-0"
        src={videoSource(movieVideo?.result.results[0].key || "")}
        title={movieDetails?.result.title}
        frameBorder={0}
        allowFullScreen
      />
      <div className="grid gap-4 px-8 py-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {detailItem("Title", movieDetails?.result.title)}
        {detailItem("Published Date", movieDetails?.result.release_date)}
        <div>
          <p className="text-white text-2l font-bold">Genre</p>
          <p className="text-gray-400 text-2m">
            {movieDetails?.result.genres.map((item) => item.name)}
          </p>
        </div>
        {detailItem("Rating", movieDetails?.result.vote_average)}
        {detailItem("Synopsis", movieDetails?.result.overview)}
      </div>
    </div>
  );
};

export default Player;
