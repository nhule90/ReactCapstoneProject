import React, { useEffect, useState } from "react";
import HouseScreen from "./HouseScreen";
import Watchlist from "./Watchlist";
import axios from "axios";
import styles from "./Home.module.css";
const HomeScreen = () => {
    const [list, setList] = useState([]);
    const [houseList, setHouseList] = useState([]);
    const [zipcode, setZipcode] = useState(77014);
    const [page, setPage] = useState(1);
    const [avaiableZipcodes, setAvailableZipcodes] = useState([]);

    const addHouse = (house) => setList([...list, house]);

    const removeHouse = (house) => {
        const newState = list.filter((hou) => {
            return hou !== house;
        });
        setList(newState);
    };
    useEffect(() => {
        var allZipcodeURL = `http://localhost:4006/zipcodes/`;

        const getZipcodes = () => {
            axios
                .get(allZipcodeURL, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    setAvailableZipcodes(res.data);
                });
        };
        getZipcodes();
        var zipcodeURL = `http://localhost:4006/zipcodehouses/${zipcode}/${page}`;

        const getData = (url) => {
            axios
                .get(url, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    if (res.data.length === 0) {
                        setPage(1);
                    }
                    setHouseList(res.data);
                });
        };
        getData(zipcodeURL);
    }, [zipcode, page]);
    // console.log(avaiableZipcodes)
    return (
        <div className={styles.home_screen}>
            <div className={styles.main}>
                <h1 className={styles.h1}>
                    Search for a zipcode
                    <input
                        className={styles.search_bar}
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        placeholder="77002"
                    />
                </h1>

                <HouseScreen
                    addHouse={addHouse}
                    houseList={houseList}
                    page={page}
                    setPage={setPage}
                    list={list}
                    removeHouse={removeHouse}
                    availZipcodes={avaiableZipcodes}
                />
            </div>
            <Watchlist list={list} removeHouse={removeHouse} />
        </div>
    );
};

export default HomeScreen;
