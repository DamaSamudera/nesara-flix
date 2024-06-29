import { FC, useState } from "react";
import { MovieList } from "../hooks/MovieList.type";
import { Heart } from "lucide-react";
import { Image500 } from "../config/utils/image.utils";
import useAuthContext from "../hooks/useAuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ICard {
  data?: MovieList;
}

const Card: FC<ICard> = (props) => {
  const { data } = props;
  const [like, setLike] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setSaved] = useState(false);
  const { user } = useAuthContext();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      try {
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: data?.id,
            title: data?.title,
            img: data?.backdrop_path,
          }),
        });
        toast.success("Added to Your List");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    } else {
      toast.error("Please log in to save a movie");
    }
  };

  return (
    <div
      key={data?.id}
      className="w-[160px] md:2-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 "
    >
      <Link to={`/player/${data?.id}`}>
        <img
          className="w-full h-auto block"
          src={Image500(data?.backdrop_path || "")}
          alt={data?.title || "-"}
        />
      </Link>
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {data?.title}
        </p>
        <p className="absolute top-4 left-4 text-gray-400">
          <p onClick={saveShow}>{like ? <Heart fill="red" /> : <Heart />}</p>
        </p>
      </div>
    </div>
  );
};

export default Card;
