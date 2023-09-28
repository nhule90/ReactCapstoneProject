import React from "react";
import HouseCard from "./HouseCard";
import styles from "./Home.module.css"
const Watchlist = ({ list, removeHouse }) => {
  
  const houseDisplay = list.map((house, index) => {
    
    return (
      <HouseCard key={`WL${index}`} house={house} removeHouse={removeHouse} list={list} />
    );
  })
  return (
    <div className={styles.watchlist}>
      <h1>My Favorite</h1>
      <div className="house-container">
        {houseDisplay}
      </div>
    </div>
  );
};

export default Watchlist;
