import { useEffect, useState } from "react";

const useIsDesktop = () => {
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

export default useIsDesktop;
