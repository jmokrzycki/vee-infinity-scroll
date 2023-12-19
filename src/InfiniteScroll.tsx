import { useEffect, useState } from "react";
import "./App.css";

type InfiniteScrollProps = {
  list: JSX.Element[];
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ list }) => {
  const [tempArray, setTempArray] = useState<JSX.Element[]>([]);

  const cards = document.querySelectorAll(".card");

  function loadNewCards() {
    const newArray = [...tempArray, list[tempArray.length]];
    setTempArray(newArray);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    }, {});

    cards.forEach((card) => {
      observer.observe(card);
    });

    const lastCardObserver = new IntersectionObserver((entries) => {
      const lastCard = entries[0];
      if (!lastCard.isIntersecting) return;
      if (tempArray.length !== list.length) loadNewCards();
      lastCardObserver.unobserve(lastCard.target);

      const newLastCard = document.querySelector(".card:last-child");
      if (newLastCard !== null) {
        lastCardObserver.observe(newLastCard);
      }
    });

    const newLastCard = document.querySelector(".card:last-child");
    if (newLastCard !== null) {
      lastCardObserver.observe(newLastCard);
    }
  });

  return (
    <div className="card-container">
      <div className="card show">test</div>
      {tempArray.map((item, index) => {
        return (
          <div key={index} className="card show">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
