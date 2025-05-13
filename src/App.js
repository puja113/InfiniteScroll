import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const fetchQuotes = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
    );
    const data = res.data;

    setQuotes((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);

    
    if (quotes.length + data.length >= 100) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="container">
      <h1> Programming Quotes</h1>
      <InfiniteScroll
        dataLength={quotes.length}
        next={fetchQuotes}
        hasMore={hasMore}
        loader={
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>All quotes loaded!</b>
          </p>
        }
      >
        {quotes.map((quote, index) => (
          <div key={quote.id} className="quote-box">
            <p>
              {index + 1}) {quote.title}
            </p>
            <span>― Author {quote.userId}</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
