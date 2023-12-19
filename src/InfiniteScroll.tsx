import { useEffect, useState } from "react";
import "./App.css";

type InfiniteScrollProps = {
  list: JSX.Element[];
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ list }) => {
  const [tempArray, setTempArray] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (list.length === 0) return;
    setTempArray([list[0]]);
  }, [list]);

  useEffect(() => {
    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return;
        setTempArray([...tempArray, list[tempArray.length]]);
        lastCard.target.classList.toggle("show", lastCard.isIntersecting);
        lastCardObserver.unobserve(lastCard.target);
      },
      {
        rootMargin: "200px",
      }
    );

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
            </div>
          );
        })}
    </div>
  );
};

export default InfiniteScroll;
