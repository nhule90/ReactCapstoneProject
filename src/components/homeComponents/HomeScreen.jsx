import React, { useEffect, useState, useContext } from "react";
import HouseScreen from "./HouseScreen";
import Watchlist from "./Watchlist";
import axios from "axios";
import styles from "./Home.module.css";
import AuthContext from "../../store/authContext";
const serverURL = `http://localhost:4006`;
const HomeScreen = () => {
    const { state, dispatch } = useContext(AuthContext);
    const [houseList, setHouseList] = useState([]);
    const [zipcode, setZipcode] = useState(77014);
    const [page, setPage] = useState(1);
    const [avaiableZipcodes, setAvailableZipcodes] = useState([]);
    const [userFavs, setUserFavs] = useState([]);
    const getUserHouses = () => {
        const userFavsURL =
            serverURL + "/userhouses/" + state.userId.toString();
        axios
            .get(userFavsURL, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((res) => {
                setUserFavs(res.data);
                console.log(res.data);
            });
    };
    let initList = state.token? userFavs:[]
    const [list, setList] = useState(initList);
    const addHouse = (house) => {
        setList([...list, house]);
        if (state.token) {
            console.log("addFav", state.userId, house.id);
            const addFavorite = () => {
                axios
                    .post(
                        serverURL+"/favorites",
                        { house_id: house.id, userId: state.userId },
                        {
                            headers: {
                                "Content-type":
                                    "application/json; charset=UTF-8",
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res.data);
                    });
            };
            addFavorite();
        }
    };
    const removeHouse = (house) => {
        const newState = list.filter((hou) => {
            return hou !== house;
        });
        setList(newState);
        if (state.token) {
            console.log("removeFav", state.userId, house.id);
            const removeFavorite = () => {
                const removeURL = serverURL + "/userfavorite";
                // console.log(removeURL);
                axios
                    .delete(removeURL, {
                        data: { house_id: house.id, userId: state.userId },

                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
            removeFavorite();
        }
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
        const getUserHouses = () => {
            const userFavsURL =
                serverURL + "/userhouses/" + state.userId.toString();
            axios
                .get(userFavsURL, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    setList(res.data);
                    console.log(res.data);
                });
        };
        if (state.token) {
            getUserHouses();
        }

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
