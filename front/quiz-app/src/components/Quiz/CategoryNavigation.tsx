import { FilmIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryNavigation = ({ category, setCategory }: Props) => {
  return (
    <div className="flex ml-2">
      <div
        onClick={() => setCategory("Education")}
        className={`px-3 rounded-t-md font-semibold ${category === "Education" ? "bg-white" : "hover:text-gray-50"}`}
      >
        Education <RocketLaunchIcon className="size-5 inline ml-2" />
      </div>
      <div
        onClick={() => setCategory("Entertainment")}
        className={`px-3 rounded-t-md font-semibold ${category === "Entertainment" ? "bg-white" : "hover:text-gray-50"}`}
      >
        Entertainment <FilmIcon className="text-center inline size-5 ml-2" />
      </div>
      <div
        onClick={() => setCategory("User")}
        className={`px-3 rounded-t-md font-semibold ${category === "User" ? "bg-white" : "hover:text-gray-50"}`}
      >
        My quizzes
      </div>
    </div>
  );
};

export default CategoryNavigation;
