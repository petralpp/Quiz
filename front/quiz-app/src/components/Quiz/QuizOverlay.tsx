import { useAppSelector } from "../../store/hooks";
import type { QuizDescription } from "../../types";

interface Props {
  isOpen: boolean;
  onClose(): void;
  start(): void;
  category: string;
  deleteQuiz(name: string): void;
}

const QuizOverlay = ({ isOpen, onClose, start, category, deleteQuiz }: Props) => {
  const quiz: QuizDescription = useAppSelector((state) => state.selectedQuiz);

  return (
    <>
      {isOpen && (
        <div className="overlay-background" onClick={onClose}>
          <div className="overlay overflow-auto max-h-full md:max-h-4/5">
            {category === "User" && (
              <div className="mb-3 text-right">
                <button
                  onClick={() => deleteQuiz(quiz.name)}
                  className="btn btn-red"
                >
                  Delete
                </button>
              </div>
            )}
            <div className="mb-4">
              <h2 className="wrap-anywhere text-center font-semibold text-2xl mb-3">
                {quiz.name}
              </h2>
              <p className="wrap-anywhere text-base md:text-lg lg:text-xl">
                {quiz.description}
              </p>
              <p className="mt-4 text-center font-semibold">
                {quiz.questions} questions
              </p>
            </div>
            <div className="w-full m-auto flex justify-between">
              <button
                onClick={onClose}
                className="btn btn-white border-2 border-solid"
              >
                Cancel
              </button>
              <button onClick={start} className="btn btn-blue">
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizOverlay;
