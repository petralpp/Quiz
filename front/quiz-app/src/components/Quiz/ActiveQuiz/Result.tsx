import { useState } from "react";

import { useAppSelector } from "../../../store/hooks";

import ResultTable from "./ResultTable";

const Result = () => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const playerAnswersLength: number = useAppSelector(
    (state) => state.activeQuiz.playerAnswers.length
  );
  const score: number = useAppSelector((state) => state.activeQuiz.score);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-2">
        Your result: {score} / {playerAnswersLength}
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
