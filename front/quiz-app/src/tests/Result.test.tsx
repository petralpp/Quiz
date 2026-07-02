import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import testData from "./test_data";
import { renderWithProviders } from "./test_utils";

import { setupStore } from "../store/store";
import {
  setPlayerAnswer,
  startQuiz,
  updateScore
} from "../store/reducers/activeQuizReducer";

import Result from "../components/Quiz/ActiveQuiz/Result";

describe("Result component", () => {
  beforeAll(() => {
    const store = setupStore();
    const testQuiz = testData.testQuizzes[1];
    const playerAnswers = testData.testPlayerAnswers_Quiz1;

    store.dispatch(startQuiz(testQuiz));
    store.dispatch(updateScore());
    store.dispatch(updateScore());
    for (const answer of playerAnswers) {
      store.dispatch(setPlayerAnswer(answer));
    }
    renderWithProviders(<Result />, store);
  });
  afterAll(() => {
    cleanup();
  });
  it("displays the correct numeral result", () => {
    const resultText = screen.getByText("Your result: 2 / 3", { exact: false });
    expect(resultText).toBeInTheDocument();
    const showButton = screen.getByRole("button", { name: "Show answers" });
    expect(showButton).toBeInTheDocument();
  });
  it("displays the correct buttons", async () => {
    const showButton = screen.getByRole("button", { name: "Show answers" });
    expect(showButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(showButton);

    const hideButton = screen.getByRole("button", { name: "Hide" });
    expect(hideButton).toBeInTheDocument();

    await user.click(hideButton);
  });
  it("doesn't render the ResultTable component before a button click", () => {
    const tableCell = screen.queryByText("Question");
    expect(tableCell).not.toBeInTheDocument();
  });
  it("displays the ResultTable component after a button click", async () => {
    const showButton = screen.getByRole("button", { name: "Show answers" });

    const user = userEvent.setup();
    await user.click(showButton);

    const tableCell = screen.getByText("Question");
    expect(tableCell).toBeInTheDocument();
  });
});
