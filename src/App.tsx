import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faker } from "@faker-js/faker";

const arr = Array(101)
  .fill({})
  .map(() => {
    return {
      name: faker.person.fullName(),
      surname: faker.person.lastName(),
      job: faker.person.jobTitle(),
      bio: faker.person.bio(),
    };
  });

function App() {
  const cards = document.querySelectorAll(".card");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      {
        threshold: 0,
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    const lastCardObserver = new IntersectionObserver((entries) => {
      const lastCard = entries[0];
      if (!lastCard.isIntersecting) return;
      loadNewCards();
      lastCardObserver.unobserve(lastCard.target);
      lastCardObserver.observe(
        document.querySelector(".card:last-child") as Element
      );
    });

    lastCardObserver.observe(
      document.querySelector(".card:last-child") as Element
    );

    const cardContainer = document.querySelector(".card-container");
    function loadNewCards() {
      for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.textContent = "New card";
        card.classList.add("card");
        observer.observe(card);

        if (cardContainer !== null) {
          cardContainer.append(card);
        }
      }
    }
  });

  return (
    <div className="card-container">
      <div className="card show">test</div>
      {arr.map((item, index) => {
        return (
          <div key={index} className="card show">
            <h1>{item.name}</h1>
            <h2>{item.surname}</h2>
            <h3>{item.job}</h3>
            <p>{item.bio}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
