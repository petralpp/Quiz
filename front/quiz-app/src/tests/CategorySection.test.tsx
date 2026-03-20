import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testUtils from "./test_data";
import QuizList from "../components/QuizList";
import type { Mock, Procedure } from "@vitest/spy";

const testData = testUtils.getSeparatedData();
const mockHandler: Mock<Procedure> = vi.fn();

describe("CategorySection component", () => {
  beforeEach(() => {
    render(
      <QuizList
        quizList={testData.education}
        category="Education"
        handleClick={mockHandler}
      />
    );
  });
  it("displays the Education-category title", () => {
    const eduTitle = screen.getByText("Education");
    expect(eduTitle).toBeInTheDocument();
  });
  it("displays the quiz names", () => {
    const firstTitle = testData.education[0].name;
    const secondTitle = testData.education[1].name;

    expect(screen.getByText(firstTitle)).toBeInTheDocument();
    expect(screen.getByText(secondTitle)).toBeInTheDocument();
  });
  it("calls the event handler when a quiz is clicked", async () => {
    const user = userEvent.setup();
    const quizTitle = testData.education[0].name;
    const quizElement = screen.getByText(quizTitle);
    await user.click(quizElement);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler).toHaveBeenCalledWith(quizTitle, "Education");
  });
});

describe("CategorySection component without a quiz list", () => {
  it("doesn't render anything", () => {
    render(
      <QuizList quizList={null} category="Entertainment" handleClick={mockHandler} />
    );
    const categoryTitle = screen.queryByText("Entertainment");
    expect(categoryTitle).not.toBeInTheDocument();
  });
});
