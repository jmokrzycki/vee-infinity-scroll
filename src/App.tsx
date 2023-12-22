import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.scss";
import MockApi from "./MockApi";
import InfiniteScroll from "./InfiniteScroll";
import { UserData } from "./Types";

function App() {
  const mockApi = useMemo(() => new MockApi(2000, 6), []);
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
          <div key={item.uuid} className="card">
            <p className="full-name">{item.fullName}</p>
            <p className="last-name">{item.lastName}</p>
            <p className="job-title">{item.jobTitle}</p>
            <p className="bio">{item.bio}</p>
            <p className="uuid">{item.uuid}</p>
            {[index]}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default App;
