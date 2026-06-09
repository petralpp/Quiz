import type { QuizDescription } from "../../types";

interface Props {
  isOpen: boolean;
  toggleOpen(setting: boolean): void;
  start(): void;
  category: string;
  quiz: QuizDescription;
  deleteQuiz(name: string): void;
}

const QuizOverlay = ({
  isOpen,
  toggleOpen,
  start,
  category,
  quiz,
  deleteQuiz
}: Props) => {
  return (
    <>
      {isOpen && (
        <div className="overlay-background" onClick={() => toggleOpen(false)}>
          <div
            className="overlay max-h-full md:max-h-4/5 md:max-w-3/5"
            onClick={(e) => e.stopPropagation()}
          >
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
              <div className="overflow-y-auto max-h-35">
                <p className="wrap-anywhere text-base md:text-lg lg:text-xl">
                  {quiz.description}
                </p>
              </div>
              <p className="mt-4 text-center font-semibold">
                {quiz.questions} questions
              </p>
            </div>
            <div className="w-full m-auto flex justify-between">
              <button
                onClick={() => toggleOpen(false)}
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
