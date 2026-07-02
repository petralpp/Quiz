import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Mock, Procedure } from "@vitest/spy";

import testUtils from "./test_data";
import { renderWithProviders } from "./test_utils";

import { setupStore } from "../store/store";
import { setQuizzes } from "../store/reducers/quizReducer";

import QuizList from "../components/Quiz/QuizList";

const testData = testUtils.testQuizzes;
const overlayHandler: Mock<Procedure> = vi.fn();

describe("QuizList component", () => {
  beforeAll(() => {
    const store = setupStore();
    store.dispatch(setQuizzes(testData));

    renderWithProviders(
      <QuizList category="Education" selectQuiz={overlayHandler} />,
      store
    );
  });
  afterAll(() => {
    cleanup();
  });
  it("displays the correct subcategories and titles", () => {
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("HTML Basics")).toBeInTheDocument();
    expect(screen.getByText("CSS Fundamentals")).toBeInTheDocument();
  });
  it("calls the event handler when a quiz is clicked", async () => {
    const user = userEvent.setup();
    const quizElement = screen.getByText("HTML Basics");
    await user.click(quizElement);

    expect(overlayHandler.mock.calls).toHaveLength(1);
    expect(overlayHandler).toHaveBeenCalledWith("quiz-1");
  });
});
