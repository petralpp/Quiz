import { screen } from "@testing-library/react";
import testUtils from "./test_data";
import QuizList from "../components/Quiz/QuizList";
import type { Mock, Procedure } from "@vitest/spy";
import { renderWithProviders } from "./test_utils";
import { setupStore } from "../store/store";
import { setQuizzes } from "../store/reducers/quizReducer";

const testData = testUtils.testQuizzes;
const overlayHandler: Mock<Procedure> = vi.fn();

describe("QuizList component", () => {
  beforeEach(() => {
    const store = setupStore();
    store.dispatch(setQuizzes(testData));

    renderWithProviders(
      <QuizList category="Education" selectQuiz={overlayHandler} />,
      store
    );
  });
  it("renders child components", () => {
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("HTML Basics")).toBeInTheDocument();
    expect(screen.getByText("CSS Fundamentals")).toBeInTheDocument();
  });
});
