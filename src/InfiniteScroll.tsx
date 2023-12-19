import { useEffect, useState } from "react";
import "./App.css";

type InfiniteScrollProps = {
  list: JSX.Element[];
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ list }) => {
  const [tempArray, setTempArray] = useState<JSX.Element[]>([]);

  function loadNewCards() {
    const newArray = [...tempArray, list[tempArray.length]];
    setTempArray(newArray);
  }

  useEffect(() => {
    const lastCardObserver = new IntersectionObserver(
      (entries) => {
        console.log("last card observer");
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return;
        if (tempArray.length !== list.length) loadNewCards();
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
  }, [tempArray]);

  return (
    <div className="card-container">
      <div className="card show"></div>
      {tempArray.map((item, index) => {
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
