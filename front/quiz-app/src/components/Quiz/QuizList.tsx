import { useAppSelector } from "../../store/hooks";
import { selectGroupedQuizzesByCategory } from "../../store/selectors";

interface Props {
  category: string;
  handleClick(name: string, category: string): void;
}

const QuizList = ({ category, handleClick }: Props) => {
  const grouped = useAppSelector(selectGroupedQuizzesByCategory(category));

  return (
    <div className="h-max py-4 bg-white">
      {grouped && (
        <div className="px-3">
          {Object.entries(grouped).map(([subcategory, quizzes], i) => (
            <div key={i}>
              <h2 className="pt-3 text-xl font-semibold">{subcategory}</h2>
              <div className="flex gap-3 py-3 overflow-x-scroll scrollbar-hidden">
                {quizzes.map((el, j) => (
                  <div
                    key={j}
                    onClick={() => handleClick(el.name, el.category)}
                    className="cursor-pointer flex items-center justify-center min-w-50 h-30 bg-indigo-500 hover:bg-blue-700 shadow-md hover:shadow-xl rounded-2xl text-center"
                  >
                    <p className="px-1 text-white text-base lg:text-lg">{el.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {Object.keys(grouped).length === 0 && <p className="text-center">Empty</p>}
    </div>
  );
};

export default QuizList;
