import { FC } from "react";
import { ImageOriginal } from "../config/utils/image.utils";
import Button from "./Button";
import { Info, Play } from "lucide-react";
import { dateFormat, truncateString } from "../config/utils/string.utils";
import { MovieList } from "../hooks/MovieList.type";

interface IBanner {
  data?: MovieList;
}

const Banner: FC<IBanner> = (props) => {
  const { data } = props;
  return (
    <div className="w-full h-full text-white">
      <div className="h-full w-full top-0">
        <div className="absolute w-full h-full bg-gradient-to-r from-black" />
        <img
          className="h-[100vh] w-full object-cover"
          src={ImageOriginal(data?.backdrop_path)}
        />
        <div className="absolute w-full top-[50%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{data?.title}</h1>
          <div className="my-4">
            <div className="flex w-full">
              <Button className="mr-2" variant="textIcon">
                <Play /> Play
              </Button>
              <Button
                className="bg-transparent border text-white"
                variant="textIcon"
              >
                <Info /> Info
              </Button>
            </div>
            <p className="text-gray-400 text-sm py-2 md:py-4">
              Released: {dateFormat(data?.release_date)}
            </p>
            <p className="w-full md:max-w-[70%] ld:max-w[50%] xl:max-w-[35%] text-gray-200">
              {truncateString(data?.overview || "", 130)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
