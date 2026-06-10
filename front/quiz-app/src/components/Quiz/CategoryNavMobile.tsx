import { FilmIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/selectors";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryNavMobile = ({ category, setCategory }: Props) => {
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
    <div className="flex text-center bg-white">
      <div
        onClick={() => setCategory("Education")}
        className={`cursor-pointer p-3 font-semibold ${category === "Education" ? "underline" : "hover:underline"}`}
      >
        Education <RocketLaunchIcon className="size-5 inline ml-2" />
      </div>
      <div
        onClick={() => setCategory("Entertainment")}
        className={`cursor-pointer p-3 font-semibold ${category === "Entertainment" ? "underline" : "hover:underline"}`}
      >
        Entertainment <FilmIcon className="text-center inline size-5 ml-2" />
      </div>
      {user && (
        <div
          onClick={() => setCategory("User")}
          className={`cursor-pointer p-3 font-semibold ${category === "User" ? "underline" : "hover:underline"}`}
        >
          My quizzes
        </div>
      )}
    </div>
  );
};

export default CategoryNavMobile;
