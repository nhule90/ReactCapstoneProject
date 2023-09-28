import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/authContext";
import styles from "./Auth.module.css";
const serverURL = `http://localhost:4006`;
const Auth = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(true);
    const { dispatch } = useContext(AuthContext);
    
    const submitHandler = (e) => {
        e.preventDefault();
        let body = { username, password };
        axios
            .post(register ? "/login" : "/register", body)
            .then((res) => {
                console.log(res.data);
                const userFavsURL =
                    serverURL + "/userhouses/" + res.data.userId.toString();
                let loginData = res.data;
                const getUserHouses = () => {
                    axios
                        .get(userFavsURL, {
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                        })
                        .then((re) => {
                            console.log(re.data);
                            loginData.userhouses = re.data;
                            console.log(loginData);
                            dispatch({ type: "LOGIN", payload: loginData });
                        });
                };
                getUserHouses()
               
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
                    <button>{register ? "Login" : "Sign Up"}</button>
                </form>
                <button onClick={() => setRegister(!register)}>
                    Need to {register ? "Sign Up" : "Login"}?
                </button>
            </div>
        </main>
    );
};

export default Auth;
