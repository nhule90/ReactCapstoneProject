import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import HouseScreen from "./components/HouseScreen";
import Watchlist from "./components/Watchlist";

function App() {
    const [list, setList] = useState([]);
    const [houseList, setHouseList] = useState([]);
    const [page, setPage] = useState(1);

    const addHouse = (house) => setList([...list, house]);

    const removeHouse = (house) => {
        const newState = list.filter((hou) => {
            return hou !== house;
        });
        setList(newState);
    };

    useEffect(() => {
        const getData = () => {
            axios
                .post(`http://localhost:4006/houses/${page}`, 
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setHouseList(res.data);
                });
        };
        getData();
    }, [page]);

    return (
        <div className="App">
            <Header />
            <main>
                <HouseScreen
                    addHouse={addHouse}
                    houseList={houseList}
                    page={page}
                    setPage={setPage}
                    list={list}
                    removeHouse={removeHouse}
                />
                <Watchlist list={list} removeHouse={removeHouse} />
            </main>
        </div>
    );
}

export default App;
