import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";

import { useAppSelector } from "../../../store/hooks";

const ResultTable = () => {
  const playerAnswers: string[] = useAppSelector(
    (state) => state.activeQuiz.playerAnswers
  );
  const questions = useAppSelector((state) => state.activeQuiz.quiz.questions);

  return (
    <table className="my-3 ">
      <thead className="bg-indigo-500 text-white">
        <tr className="">
          <td className="p-3 font-bold border-0 rounded-tl-xl">Question</td>
          <td className="p-3 font-bold">Correct answer</td>
          <td className="p-3 font-bold border-0 rounded-tr-xl">Your answer</td>
        </tr>
      </thead>
      <tbody>
        {questions.map((elem, i) => (
          <tr key={i} className="even:bg-gray-300/50">
            <td className="p-2 wrap-anywhere">
              {i + 1}. {elem.question}
            </td>
            <td className="p-2 wrap-anywhere">{elem.answer}</td>
            <td className="p-2 wrap-anywhere">
              {playerAnswers[i]}
              {elem.answer === playerAnswers[i] ? (
                <CheckCircleIcon className="size-5 text-green-500 inline ml-2 float-right" />
              ) : (
                <XCircleIcon className="size-5 text-red-600 inline float-right" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
