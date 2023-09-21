import React from "react";
import HouseCard from "./HouseCard";

const Watchlist = ({ list, removeHouse }) => {
  
  const houseDisplay = list.map((house, index) => {
    
    return (
      <HouseCard house={house} removeHouse={removeHouse} list={list} />
    );
  })
  return (
    <div className="watchlist">
      <h1>My Favorite</h1>
      <div className="movie-container">
        {houseDisplay}
      </div>
    </div>
  );
};

export default Watchlist;
