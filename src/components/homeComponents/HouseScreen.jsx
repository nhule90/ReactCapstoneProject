import React from "react";
import HouseCard from "./HouseCard";
import styles from "./Home.module.css";
const HouseScreen = ({
    addHouse,
    houseList,
    page,
    setPage,
    list,
    removeHouse,
    availZipcodes,
}) => {
    const decrement = () => setPage(page - 1);
    const increment = () => setPage(page + 1);
    const houseDisplay = houseList.map((house, index) => {
        return (
            <HouseCard
                addHouse={addHouse}
                house={house}
                list={list}
                removeHouse={removeHouse}
            />
        );
    });
    const listZipcodes = availZipcodes.map((code) => <li>{code}</li>);

    if (houseList.length > 0) {
        return (
            <div className="page">
                <div className="btn-container">
                    <button onClick={page !== 1 ? decrement : undefined}>
                        Previous
                    </button>
                    <button onClick={increment}>Next</button>
                </div>
                <div className="house-container">{houseDisplay}</div>
            </div>
        );
    } else {
        setPage(1)
        return (
            <div className="page">
                <h3>Unable to find any houses in that zipcode</h3>
                <h3>Please try one the these available zipcodes</h3>
                <ul>{listZipcodes}</ul>
            </div>
        );
    }
};

export default HouseScreen;
