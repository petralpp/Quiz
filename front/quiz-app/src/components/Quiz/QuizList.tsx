import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectGroupedQuizzesByCategory } from "../../store/selectors";

interface Props {
  category: string;
  handleClick(name: string, category: string): void;
}

const QuizList = ({ category, handleClick }: Props) => {
  const grouped = useAppSelector(selectGroupedQuizzesByCategory(category));

  return (
    <div className="md:w-[85%] min-h-screen h-fit py-4 bg-white">
      {grouped && (
        <div className="px-4">
          {Object.entries(grouped).map(([subcategory, quizzes], i) => (
            <div key={i}>
              <h2 className="pt-3 wrap-anywhere text-xl font-semibold">
                {subcategory}
              </h2>
              <div className="flex gap-3 py-3 overflow-x-auto">
                {quizzes.map((el, j) => (
                  <div
                    key={j}
                    onClick={() => handleClick(el.name, el.category)}
                    className="cursor-pointer flex items-center justify-center min-w-50 h-30 px-2 overflow-hidden bg-indigo-500 hover:bg-blue-700 shadow-md hover:shadow-xl rounded-2xl text-center"
                  >
                    <p className="text-white text-base lg:text-lg overflow-hidden">
                      {el.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {Object.keys(grouped).length === 0 && (
        <p className="pt-5 text-center">
          No quizzes created,{" "}
          <Link to="/create" style={{ textDecoration: "underline" }}>
            create one here
          </Link>
        </p>
      )}
    </div>
  );
};

export default QuizList;
