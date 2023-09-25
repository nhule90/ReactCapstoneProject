import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import styles from "./Auth.module.css";
const Auth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(true);
    const { dispatch } = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();
        let body = { username, password };
        axios
            .post(register ? "/register" : "/login", body)
            .then((res) => {
                dispatch({ type: "LOGIN", payload: res.data });
            })
            .catch((err) => {
                alert(err.response["data"]);
                console.error(err);
            });
        console.log("submitHandler called");
    };

    return (
        <main className={styles.page}>
            <div className={styles.main}>
                <h1>Welcome!</h1>
                <form className={styles.form} onSubmit={submitHandler}>
                    <input
                        className={styles.form_input}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className={styles.form_input}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>{register ? "Sign Up" : "Login"}</button>
                </form>
                <button onClick={() => setRegister(!register)}>
                    Need to {register ? "Login" : "Sign Up"}?
                </button>
            </div>
        </main>
    );
};

export default Auth;
