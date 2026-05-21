import { useState } from "react";

import type { CorrectAnswer } from "../../../types";

import { useAppSelector } from "../../../store/hooks";

import ResultTable from "./ResultTable";

const Result = () => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const playerAnswers: string[] = useAppSelector(
    (state) => state.answers.playerAnswers
  );
  const rightAnswers: CorrectAnswer[] = useAppSelector(
    (state) => state.answers.rightAnswers
  );

  const countResult = () => {
    let correct = 0;
    for (let i = 0; i < rightAnswers.length; i++) {
      if (rightAnswers[i].answer === playerAnswers[i]) {
        correct++;
      }
    }
    return correct;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-2">
        Your result: {countResult()} / {playerAnswers.length}
      </h2>
      {showAnswers ? (
        <>
          <button
            onClick={() => setShowAnswers(false)}
            className="btn btn-blue mt-2"
          >
            Hide
          </button>
          <ResultTable />
        </>
      ) : (
        <button onClick={() => setShowAnswers(true)} className="btn btn-blue m-2">
          Show answers
        </button>
      )}
    </div>
  );
};

export default Result;
