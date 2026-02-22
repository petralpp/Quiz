import {
  useState,
  type SetStateAction,
  type Dispatch,
  type FormEvent,
  useEffect
} from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import type { Quiz } from "../types";
import { setPlayerAnswer, getRightAnswers } from "../store/reducers/answersReducer";

interface Props {
  setQuizState: Dispatch<SetStateAction<boolean>>;
}

const CurrentQuestion = ({ setQuizState }: Props) => {
  const dispatch = useAppDispatch();
  const [answer, setAnswer] = useState<string>("");
  const activeQuiz: Quiz = useAppSelector((state) => state.activeQuiz.quiz);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  useEffect(() => {
    const question = activeQuiz.questions[currentIndex].question;
    const options = activeQuiz.questions[currentIndex].choices;
    setCurrentQuestion(question);
    setCurrentOptions(options);
  }, [activeQuiz, currentIndex]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setPlayerAnswer(answer));
    const index = currentIndex + 1;
    if (index === activeQuiz.questions.length) {
      dispatch(getRightAnswers(activeQuiz.answersId));
      setQuizState(false);
    } else {
      setCurrentIndex(index);
    }
    setAnswer("");
  };

  const handleChange = (text: string) => {
    setAnswer(text);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mt-3 text-base md:text-lg lg:text-xl">
        {currentIndex + 1}. {currentQuestion}
      </p>
      <form onSubmit={handleSubmit} className="m-2">
        {currentOptions.map((option) => (
          <div key={option} className="mb-3">
            <label className="">
              <input
                type="radio"
                name="option"
                onChange={() => handleChange(option)}
              />
              <p className="inline ml-2 text-base md:text-lg lg:text-xl">{option}</p>
            </label>
          </div>
        ))}
        <div className="text-center">
          {answer ? (
            <button type="submit" className="btn-blue">
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
