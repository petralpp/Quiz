import { FilmIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
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
      ? ["Education", "Entertainment", "General", "User"]
      : ["Education", "Entertainment", "General"];
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [user, category, setCategory]);

  return (
    <div className="flex justify-around pt-2 bg-white text-gray-500">
      <div
        onClick={() => setCategory("Entertainment")}
        className="cursor-pointer p-3"
      >
        <FilmIcon
          className={`inline size-5 mx-auto ${category === "Entertainment" && "text-blue-700 size-7"}`}
        />
      </div>
      <div onClick={() => setCategory("Education")} className="cursor-pointer p-3">
        <RocketLaunchIcon
          className={`inline size-5 mx-auto ${category === "Education" && "text-blue-700 size-7"}`}
        />
      </div>
      <div onClick={() => setCategory("General")} className="cursor-pointer p-3">
        <GlobeAltIcon
          className={`inline size-5 mx-auto ${category === "General" && "text-blue-700 size-7"}`}
        />
      </div>
      {user && (
        <div onClick={() => setCategory("User")} className="cursor-pointer p-3">
          <UserCircleIcon
            className={`inline size-5 mx-auto ${category === "User" && "text-blue-700 size-7"}`}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryNavMobile;
