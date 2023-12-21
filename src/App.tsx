import React, { useState } from "react";
import "./App.css";
import { faker } from "@faker-js/faker";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  const [type, setType] = useState<boolean>(false);
  const [testArray, setTestArray] = useState<React.ReactNode[]>([<>1</>, <>2</>]);
  const [originalArray, setOriginalArray] = useState<React.ReactNode[]>([]);

  const originalArrayTemp: React.ReactNode[] = Array(10)
    .fill({})
    .map(() => (
      <>
        <h1>{faker.person.fullName()}</h1>
        <h2>{faker.person.lastName()}</h2>
        <h3>{faker.person.jobTitle()}</h3>
        <p>{faker.person.bio()}</p>
      </>
    ));

  useState(() => {
    setOriginalArray(originalArrayTemp);
  });

  function fetch() {
    setOriginalArray((prevOriginalArrayTemp) => [...prevOriginalArrayTemp, <>New card</>]);
  }

  return (
    <>
      <InfiniteScroll fetch={() => fetch()}>
        {originalArray.map((item, index) => (
          <div key={index} className="card show">
            {item}
            {index}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default App;
