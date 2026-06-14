import { useEffect, useState } from "react";
import { useAppSelector } from "./store/hooks";
import { selectQuizMap } from "./store/selectors";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    media.addEventListener("change", handler);

    return () => {
      media.removeEventListener("change", handler);
    };
  }, []);

  return isDesktop;
};

export const useQuiz = (id?: string) => {
  const quizMap = useAppSelector((state) => selectQuizMap(state));
  if (!id) {
    return undefined;
  }

  return quizMap[id] ?? undefined;
};
