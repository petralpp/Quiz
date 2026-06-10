import { FilmIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryNavDesktop = ({ category, setCategory }: Props) => {
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
    <div className="w-[20%] flex flex-col bg-linear-to-r from-indigo-500 to-purple-500">
      <h1 className="text-center text-4xl p-5 mb-2 font-bold text-white leading-tight">
        Quiz!
      </h1>
      <div
        onClick={() => setCategory("Education")}
        className={`cursor-pointer p-3 text-left ${category === "Education" ? "bg-white font-semibold" : "hover:text-gray-50"}`}
      >
        <RocketLaunchIcon className="inline size-5 mr-3" />
        Education
      </div>
      <div
        onClick={() => setCategory("Entertainment")}
        className={`cursor-pointer p-3 text-left ${category === "Entertainment" ? "bg-white font-semibold" : "hover:text-gray-50"}`}
      >
        <FilmIcon className="inline size-5 mr-3" />
        Entertainment
      </div>
      {user && (
        <div
          onClick={() => setCategory("User")}
          className={`cursor-pointer p-3 text-left ${category === "User" ? "bg-white font-semibold" : "hover:text-gray-50"}`}
        >
          My quizzes
        </div>
      )}
    </div>
  );
};

export default CategoryNavDesktop;
