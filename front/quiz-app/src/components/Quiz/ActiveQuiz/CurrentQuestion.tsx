import {
  useState,
  type SetStateAction,
  type Dispatch,
  type FormEvent,
  useEffect
} from "react";

import type { Quiz } from "../../../types";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  setPlayerAnswer,
  getRightAnswers
} from "../../../store/reducers/answersReducer";

interface Props {
  setShowQuestion: Dispatch<SetStateAction<boolean>>;
}

const CurrentQuestion = ({ setShowQuestion }: Props) => {
  const dispatch = useAppDispatch();
  const activeQuiz: Quiz = useAppSelector((state) => state.activeQuiz.quiz);
  const [answer, setAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  useEffect(() => {
    const question = activeQuiz.questions[currentIndex].question;
    const options = activeQuiz.questions[currentIndex].choices;
    setCurrentQuestion(question);
    setCurrentOptions(options);
  }, [activeQuiz, currentIndex]);

  const handleAnswerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setPlayerAnswer(answer));
    const index = currentIndex + 1;
    if (index === activeQuiz.questions.length) {
      dispatch(getRightAnswers(activeQuiz.answersId));
      setShowQuestion(false);
    } else {
      setCurrentIndex(index);
    }
    setAnswer("");
  };

  const changeAnswer = (text: string) => {
    setAnswer(text);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mt-3 text-base md:text-lg lg:text-xl">
        {currentIndex + 1}. {currentQuestion}
      </p>
      <form onSubmit={handleAnswerSubmit} className="m-2">
        {currentOptions.map((option, i) => (
          <div key={i} className="mb-3">
            <label className="">
              <input
                type="radio"
                name="option"
                checked={answer === option}
                onChange={() => changeAnswer(option)}
              />
              <p className="inline ml-2 text-base md:text-lg lg:text-xl">{option}</p>
            </label>
          </div>
        ))}
        <div className="text-center">
          {answer ? (
            <button type="submit" className="btn btn-blue">
              Next
            </button>
          ) : (
            <button disabled className="btn-blue-disabled">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CurrentQuestion;
