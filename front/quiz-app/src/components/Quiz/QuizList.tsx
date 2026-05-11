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
        <div>
          {Object.entries(grouped).map(([subcategory, quizzes], i) => (
            <div key={i}>
              <h2 className="text-xl pl-3 pt-3 font-semibold">{subcategory}</h2>
              <div className="flex flex-wrap gap-3 pl-3 pt-3 py-3">
                {quizzes.map((el, j) => (
                  <div
                    key={j}
                    onClick={() => handleClick(el.name, el.category)}
                    className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-xl rounded-2xl flex items-center justify-center text-center min-w-50 h-30"
                  >
                    <h3 className="text-white px-1 text-base lg:text-lg">
                      {el.name}
                    </h3>
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
