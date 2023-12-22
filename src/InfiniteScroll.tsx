import { useEffect, useMemo, forwardRef } from "react";
import "./App.css";

type InfiniteScrollProps = {
  children: React.ReactNode[];
  fetch: () => void;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ fetch, children }) => {
  const lastCardObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const lastCard = entries[0];
          if (!lastCard.isIntersecting) return;
          fetch();
          lastCard.target.classList.toggle("effect", false);
          lastCardObserver.unobserve(lastCard.target);
        },
        {
          rootMargin: "500px",
        }
      ),
    []
  );

  useEffect(() => {
    const newLastCard = document.querySelector(".infinite-scroll > :last-child");

    if (newLastCard !== null) {
      lastCardObserver.observe(newLastCard);
      newLastCard.classList.toggle("effect", true);
    }
  }, [children]);

  return <div className="infinite-scroll">{children}</div>;
};

export default InfiniteScroll;
