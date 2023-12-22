import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import MockApi from "./MockApi";
import InfiniteScroll from "./InfiniteScroll";
import { UserData } from "./Types";

function App() {
  const mockApi = useMemo(() => new MockApi(2000, 10), []);
  const [data, setData] = useState<UserData[]>(() => mockApi.getMoreData());

  const updateData = useCallback(() => {
    setData(mockApi.getUpdatedData());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateData]);

  const fetch = () => {
    const newData = mockApi.getMoreData();
    if (newData.length === 0) return;
    setData((prevData) => [...prevData, ...newData]);
  };

  return (
    <>
      <InfiniteScroll fetch={fetch}>
        {data.map((item, index) => (
          <div key={item.uuid} className="card show">
            <h1>{item.fullName}</h1>
            <h2>{item.lastName}</h2>
            <h3>{item.jobTitle}</h3>
            <p>{item.bio}</p>
            <p>{item.uuid}</p>
            {[index]}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default App;
