import type { Quiz } from "../types";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSelectedQuiz } from "../store/reducers/selectedQuizReducer";
import QuizList from "./QuizList";
import Navigation from "./Navigation";
import { useState } from "react";
import {
  selectEducationQuizzes,
  selectEntertainmentQuizzes,
  selectUserQuizzes
} from "../store/selectors";

interface Props {
  toggleOverlay(): void;
}

const CategorySection = ({ toggleOverlay }: Props) => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.activeQuiz.isActive);
  const entertainmentList: Quiz[] = useAppSelector(selectEntertainmentQuizzes);
  const educationList: Quiz[] = useAppSelector(selectEducationQuizzes);
  const userList: Quiz[] = useAppSelector(selectUserQuizzes);
  const [category, setCategory] = useState<string>("Education");

  const handleClick = (name: string, category: string) => {
    let quiz = null;
    if (category === "Entertainment") {
      quiz = entertainmentList?.find((q) => q.name === name);
    } else if (category === "Education") {
      quiz = educationList?.find((q) => q.name === name);
    } else {
      console.log("quiz näyttää tältä handleClickissä: ", quiz);
      quiz = userList?.find((q) => q.name === name);
    }
    if (quiz) {
      console.log("Löytykö quiz handleClickissä?: ", quiz);
      dispatch(
        setSelectedQuiz({
          category: quiz.category,
          subcategory: quiz.subcategory,
          name: quiz.name,
          description: quiz.description,
          questions: quiz.questions.length
        })
      );
      toggleOverlay();
    }
  };

  return (
    !isActive && (
      <>
        <Navigation category={category} setCategory={setCategory} />
        <QuizList category={category} handleClick={handleClick} />
      </>
    )
  );
};

export default CategorySection;
