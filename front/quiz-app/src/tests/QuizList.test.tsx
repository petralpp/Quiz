import { screen } from "@testing-library/react";
import testUtils from "./test_data";
import QuizList from "../components/CategorySection";
import type { Mock, Procedure } from "@vitest/spy";
import { renderWithProviders } from "./test_utils";
import { setupStore } from "../store";
import { setEntertainmentList } from "../reducers/entertainmentReducer";
import { setEducationList } from "../reducers/educationReducer";

const testData = testUtils.getSeparatedData();
const overlayHandler: Mock<Procedure> = vi.fn();

describe("QuizList component", () => {
  beforeEach(() => {
    const store = setupStore();
    const entertainmentList = testData.entertainment;
    const educationList = testData.education;
    store.dispatch(setEntertainmentList(entertainmentList));
    store.dispatch(setEducationList(educationList));

    renderWithProviders(<QuizList toggleOverlay={overlayHandler} />, store);
  });
  it("renders child components", () => {
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Movie Classics")).toBeInTheDocument();
    expect(screen.getByText("HTML Basics")).toBeInTheDocument();
    expect(screen.getByText("CSS Fundamentals")).toBeInTheDocument();
  });
});
