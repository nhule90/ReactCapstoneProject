import {React, useContext} from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";
import styles from "./Header.module.css";
import { MdOutlineRealEstateAgent} from "react-icons/md";
import { PiHouseLineBold } from "react-icons/pi";
import { BiLogInCircle, BiSolidLogInCircle } from "react-icons/bi";
const Header = () => {
    const { state, dispatch } = useContext(AuthContext);
    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? "#f11264" : "white",
        };
    };
    return (
        <header className={styles.header}>
            <MdOutlineRealEstateAgent color="white" size="45" />
            <h1 className={styles.h1}>Houston Real Estate</h1>
            <nav>
                {state.token ? (
                    <ul className={styles.main_nav}>
                        <li>Hello, {state.username}</li>
                        <li>
                            <NavLink style={styleActiveLink} to="/">
                                <PiHouseLineBold size={30} />
                            </NavLink>
                        </li>
                        <li>
                            <button
                                className="logout-btn"
                                onClick={() => dispatch({ type: "LOGOUT" })}
                            >
                                <BiSolidLogInCircle size={30} color="white"/>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className={styles.main_nav}>
                        <li>
                            <NavLink style={styleActiveLink} to="/">
                                <PiHouseLineBold
                                    size={30}
                                    style={styleActiveLink}
                                />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={styleActiveLink} to="/auth">
                                <BiLogInCircle size={30} />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
