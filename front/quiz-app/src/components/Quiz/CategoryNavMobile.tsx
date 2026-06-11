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
    <div className="flex pt-2 text-center bg-white">
      <div
        onClick={() => setCategory("Education")}
        className={`cursor-pointer p-3 ${category === "Education" ? "underline font-semibold" : "hover:underline"}`}
      >
        <RocketLaunchIcon className="inline size-5 mr-3" />
        Education
      </div>
      <div
        onClick={() => setCategory("Entertainment")}
        className={`cursor-pointer p-3 ${category === "Entertainment" ? "underline font-semibold" : "hover:underline"}`}
      >
        <FilmIcon className="inline size-5 mr-3" />
        Entertainment
      </div>
      {user && (
        <div
          onClick={() => setCategory("User")}
          className={`cursor-pointer p-3 ${category === "User" ? "underline font-semibold" : "hover:underline"}`}
        >
          My quizzes
        </div>
      )}
    </div>
  );
};

export default CategoryNavMobile;
