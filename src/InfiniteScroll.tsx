import { useEffect, useMemo } from "react";

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
          lastCardObserver.unobserve(lastCard.target);
        },
        {
          rootMargin: "500px",
        }
      ),
    [fetch]
  );

  useEffect(() => {
    const newLastCard = document.querySelector(".infinite-scroll > :last-child");

    if (newLastCard === null) return;
    lastCardObserver.observe(newLastCard);

    return () => {
      lastCardObserver.disconnect();
    };
  }, [children, lastCardObserver]);

  return <div className="infinite-scroll">{children}</div>;
};

export default InfiniteScroll;
