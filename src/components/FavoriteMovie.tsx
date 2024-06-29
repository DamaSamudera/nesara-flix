import { useState, useEffect } from "react";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { ChevronLeftCircle, ChevronRightCircle, CrossIcon } from "lucide-react";
import useAuthContext from "../hooks/useAuthContext";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

type movieFav = {
  id: number;
  img: string;
  title: string;
};

const FavoriteMovie = () => {
  const [movies, setMovies] = useState<movieFav[]>([]);
  const { user } = useAuthContext();

  const slider = document.getElementById("slider");

  const slideLeft = () => {
    slider!.scrollLeft = slider!.scrollLeft - 500;
  };
  const slideRight = () => {
    slider!.scrollLeft = slider!.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID: number) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <ChevronLeftCircle
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <CrossIcon />
                </p>
              </div>
            </div>
          ))}
        </div>
        <ChevronRightCircle
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default FavoriteMovie;
