import { FC, useEffect, useRef } from "react";
import { MovieList } from "../hooks/MovieList.type";
import Card from "./Card";

interface IViewList {
  data?: MovieList[];
  title?: string;
}

const ViewList: FC<IViewList> = (props) => {
  const { data, title } = props;
  const listRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title || ""}</h2>
      <div className="relative flex items-center">
        <div
          id={"slider"}
          className="w-screen h-full overflow-x-scroll whitespace-nowrap no-scrollbar scroll-smooth relative"
          ref={listRef}
        >
          {data?.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewList;
