import { useEffect, useState, useMemo } from "react";
import "./App.css";

type InfiniteScrollProps = {
  list: JSX.Element[];
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ list }) => {
  const [tempArray, setTempArray] = useState<JSX.Element[]>([]);

  const lastCardObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const lastCard = entries[0];
          if (!lastCard.isIntersecting) return;
          setTempArray((prevTempArray) => [...prevTempArray, list[prevTempArray.length]]);
          lastCard.target.classList.toggle("show", lastCard.isIntersecting);
          lastCardObserver.unobserve(lastCard.target);
        },
        {
          rootMargin: "200px",
        }
      ),
    [list]
  );

  useEffect(() => {
    if (list.length === 0) return;
    setTempArray([list[0]]);
  }, [list]);

  useEffect(() => {
    if (tempArray.length > list.length) return;

    const newLastCard = document.querySelector(".card:last-child");
    if (newLastCard !== null) {
      lastCardObserver.observe(newLastCard);
    }
  }, [tempArray, list]);

  return (
    <div className="card-container">
      {tempArray.length > 0 &&
        tempArray.map((item, index) => {
          return (
            <div key={index} className="card">
              {item}
              {index}
            </div>
          );
        })}
    </div>
  );
};

export default InfiniteScroll;
