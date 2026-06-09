import { FilmIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryNavigation = ({ category, setCategory }: Props) => {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const categories = user
      ? ["Education", "Entertainment", "User"]
      : ["Education", "Entertainment"];
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [user, category, setCategory]);

  return (
    <div className="md:w-[20%] flex md:flex-col text-center bg-linear-to-r from-indigo-500 to-purple-500">
      <h1 className="text-center text-4xl p-5 mb-2 font-bold text-white leading-tight">
        Quiz!
      </h1>
      <div
        onClick={() => setCategory("Education")}
        className={`cursor-pointer rounded-t-md md:rounded-none p-3 font-semibold ${category === "Education" ? "bg-white" : "hover:text-gray-50"}`}
      >
        Education <RocketLaunchIcon className="size-5 inline ml-2" />
      </div>
      <div
        onClick={() => setCategory("Entertainment")}
        className={`cursor-pointer rounded-t-md md:rounded-none p-3 font-semibold ${category === "Entertainment" ? "bg-white" : "hover:text-gray-50"}`}
      >
        Entertainment <FilmIcon className="text-center inline size-5 ml-2" />
      </div>
      {user && (
        <div
          onClick={() => setCategory("User")}
          className={`cursor-pointer rounded-t-md md:rounded-none p-3 font-semibold ${category === "User" ? "bg-white" : "hover:text-gray-50"}`}
        >
          My quizzes
        </div>
      )}
    </div>
  );
};

export default CategoryNavigation;
