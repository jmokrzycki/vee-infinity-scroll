import React, { useState } from "react";
import "./App.css";
import MockApi from "./MockApi";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  const mockApi = new MockApi(100, 10);
  const [originalArray, setOriginalArray] = useState<React.ReactNode[]>(mockApi.getMoreData());

  const fetch = () => {
    const newData = mockApi.getMoreData();
    if (newData.length === 0) return;
    setOriginalArray((prevOriginalArrayTemp) => [...prevOriginalArrayTemp, ...newData]);
  };

  return (
    <>
      <InfiniteScroll fetch={fetch}>
        {originalArray.map((item, index) => (
          <div key={index} className="card show">
            {item}[{index}]
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default App;
