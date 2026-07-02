import { cleanup, screen } from "@testing-library/react";

import { renderWithProviders } from "./test_utils";
import testData from "./test_data";

import { setupStore } from "../store/store";
import {
  setPlayerAnswer,
  startQuiz,
  updateScore
} from "../store/reducers/activeQuizReducer";

import ResultTable from "../components/Quiz/ActiveQuiz/ResultTable";

describe("ResultTable component", () => {
  beforeAll(() => {
    const store = setupStore();
    const testQuiz = testData.testQuizzes[0];
    const playerAnswers = testData.testPlayerAnswers_Quiz1;

    store.dispatch(startQuiz(testQuiz));
    store.dispatch(updateScore());
    store.dispatch(updateScore());
    for (const answer of playerAnswers) {
      store.dispatch(setPlayerAnswer(answer));
    }
    renderWithProviders(<ResultTable />, store);
  });
  afterAll(() => {
    cleanup();
  });
  it("displays the table head correctly", () => {
    const questionText = screen.getByText("Question");
    const correctAnswerText = screen.getByText("Correct answer");
    const userAnswerText = screen.getByText("Your answer");

    expect(questionText).toBeInTheDocument();
    expect(correctAnswerText).toBeInTheDocument();
    expect(userAnswerText).toBeInTheDocument();
  });
  it("displays the questions", () => {
    const questionOne = screen.getByText(
      testData.testQuizzes[0].questions[0].question,
      {
        exact: false
      }
    );
    const questionTwo = screen.getByText(
      testData.testQuizzes[0].questions[1].question,
      {
        exact: false
      }
    );
    const questionThree = screen.getByText(
      testData.testQuizzes[0].questions[2].question,
      {
        exact: false
      }
    );

    expect(questionOne).toBeInTheDocument();
    expect(questionTwo).toBeInTheDocument();
    expect(questionThree).toBeInTheDocument();
  });
  it("displays both answer columns correctly", async () => {
    const correctAnswerOne = await screen.findAllByText(
      testData.testQuizzes[0].questions[0].answer
    );
    const correctAnswerTwo = await screen.findAllByText(
      testData.testQuizzes[0].questions[1].answer
    );
    const correctAnswerThree = await screen.findAllByText(
      testData.testQuizzes[0].questions[2].answer
    );

    expect(correctAnswerOne).toHaveLength(2);
    expect(correctAnswerTwo).toHaveLength(1);
    expect(correctAnswerThree).toHaveLength(2);
  });
});
