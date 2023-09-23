import React from "react";
import styles from "./Header.module.css";
import { ImGithub } from "react-icons/im";

const Footer = () => {
    return (
        <footer>
            <div className={styles.social_container}>
                <a href="https://github.com/nhule90/ReactCapstoneProject">
                    <h5>
                        <ImGithub size="1em" color="white" /> Project Repository
                    </h5>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
