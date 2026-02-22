import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import type { Quiz } from "../types";
import { endQuiz } from "../store/reducers/activeQuizReducer";
import { resetAnswers } from "../store/reducers/answersReducer";
import CurrentQuestion from "./CurrentQuestion";
import Result from "./Result";

const ActiveQuiz = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.activeQuiz.isActive);
  const activeQuiz: Quiz = useAppSelector((state) => state.activeQuiz.quiz);
  const [quizOn, setQuizOn] = useState<boolean>(true);

  const handleRestart = () => {
    dispatch(resetAnswers());
    setQuizOn(true);
  };

  const quit = () => {
    dispatch(resetAnswers());
    dispatch(endQuiz());
  };

  return (
    isActive && (
      <div className="bg-white p-3">
        <button
          className="px-4 py-2 ml-2 absolute rounded bg-red-500 text-white"
          onClick={quit}
        >
          Quit
        </button>
        <h2 className="text-center mt-2 text-xl font-semibold text-gray-800">
          {activeQuiz.name} ({activeQuiz.questions.length} questions)
        </h2>
        {quizOn ? (
          <CurrentQuestion setQuizState={setQuizOn} />
        ) : (
          <div>
            <Result />
            <div className="text-center m-4">
              <button onClick={handleRestart} className="btn-blue">
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ActiveQuiz;
