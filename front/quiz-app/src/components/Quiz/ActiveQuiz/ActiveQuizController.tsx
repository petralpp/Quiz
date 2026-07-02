import { useState } from "react";

import type { Quiz } from "../../../types";

import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { resetQuiz, endQuiz } from "../../../store/reducers/activeQuizReducer";

import Questions from "./Questions";
import Result from "./Result";

const ActiveQuizController = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.activeQuiz.isActive);
  const activeQuiz: Quiz = useAppSelector((state) => state.activeQuiz.quiz);
  const [showQuestion, setShowQuestion] = useState<boolean>(true);

  const restart = () => {
    dispatch(resetQuiz());
    setShowQuestion(true);
  };

  const quit = () => {
    dispatch(endQuiz());
    setShowQuestion(true);
  };

  return (
    isActive && (
      <div className="bg-white p-3">
        <button className="btn btn-red ml-2" onClick={quit}>
          Quit
        </button>
        <h2 className="wrap-anywhere text-center mt-2 text-xl font-semibold text-gray-800">
          {activeQuiz.name} ({activeQuiz.questions.length} questions)
        </h2>
        {showQuestion ? (
          <Questions setShowQuestion={setShowQuestion} />
        ) : (
          <div>
            <Result />
            <div className="text-center m-4">
              <button
                onClick={restart}
                className="btn btn-white border-2 border-solid"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ActiveQuizController;
