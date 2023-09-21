import React from "react";
import HouseCard from "./HouseCard";

const HouseScreen = ({ addHouse, houseList, page, setPage, list, removeHouse}) => {
  const decrement = () => setPage(page - 1);
  const increment = () => setPage(page + 1);

  const houseDisplay = houseList.map((house, index) => {
    return <HouseCard addHouse={addHouse} house={house} list={list} removeHouse={removeHouse}/>;
  });
  
  return (
    <div className="page">
      <h1>Houston Real Estate</h1>
      <div className="btn-container">
        <button onClick={page !== 1 && decrement}>Previous</button>
        <button onClick={increment}>Next</button>
      </div>
      <div className="movie-container">{houseDisplay}</div>
    </div>
  );
};

export default HouseScreen;
