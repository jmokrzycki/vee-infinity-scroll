import { useEffect, useState } from "react";
import "./App.css";
import { faker } from "@faker-js/faker";
import InfiniteScroll from "./InfiniteScroll";

const originalArray: JSX.Element[] = Array(1000)
  .fill({})
  .map(() => (
    <>
      <h1>{faker.person.fullName()}</h1>
      <h2>{faker.person.lastName()}</h2>
      <h3>{faker.person.jobTitle()}</h3>
      <p>{faker.person.bio()}</p>
    </>
  ));

function App() {
  return (
    <>
      <InfiniteScroll list={originalArray} />
    </>
  );
}

export default App;
