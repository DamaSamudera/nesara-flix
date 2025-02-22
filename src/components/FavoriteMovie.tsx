import { useState, useEffect, useRef } from "react";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { ChevronLeftCircle, ChevronRightCircle, Trash2 } from "lucide-react";
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
  const listRef = useRef<HTMLDivElement | null>(null);

  const slider = document.getElementById("slider");

  const slideLeft = () => {
    slider!.scrollLeft = slider!.scrollLeft - 500;
  };
  const slideRight = () => {
    slider!.scrollLeft = slider!.scrollLeft + 500;
  };

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    if (listRef.current) {
      listRef.current.scrollLeft += event.deltaY;
    }
  };
  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("wheel", handleScroll);
    }
  }, []);

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
      toast.info('Movie successfully remove from favorite list')
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
          className="w-screen h-full overflow-x-scroll whitespace-nowrap no-scrollbar scroll-smooth relative"
          ref={listRef}
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
                  className="absolute text-red-500 top-4 right-4"
                >
                  <Trash2 />
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
