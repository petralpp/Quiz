import { useAppSelector } from "../store/hooks";
import type { QuizDescription } from "../types";

interface Props {
  isOpen: boolean;
  onClose(): void;
  start(): void;
}

const QuizOverlay = ({ isOpen, onClose, start }: Props) => {
  const quiz: QuizDescription = useAppSelector((state) => state.selectedQuiz);

  return (
    <>
      {isOpen && (
        <div className="overlay-background" onClick={onClose}>
          <div className="overlay md:max-w-2/5">
            <div className="mb-4">
              <h2 className="text-center font-semibold text-2xl mb-3">
                {quiz.name}
              </h2>
              <p className="text-base md:text-lg lg:text-xl">{quiz.description}</p>
              <p className="mt-4 text-center font-semibold">
                {quiz.questions} questions
              </p>
            </div>
            <div className="w-full m-auto flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 border-2 border-solid border-gray-500 bg-white hover:bg-gray-100 text-gray-950 rounded"
              >
                Cancel
              </button>
              <button onClick={start} className="btn-blue">
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
