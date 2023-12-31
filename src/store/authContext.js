import { createContext, useReducer, useEffect } from "react";

const initialState = {
    userId: null,
    token: null,
    exp: null,
    username: null,
    userhouses: null
};

const AuthContext = createContext();

const getLocalData = () => {
    const storedToken = localStorage.getItem("token");
    const storedExp = localStorage.getItem("exp");
    const storedId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("username");
    const storedHouses = localStorage.getItem('userhouses')

    let remainingTime = storedExp - new Date().getTime();
    if (remainingTime < 0) {
        localStorage.clear();
        return null;
    }
    //TODO CALCULATE REMAINING TIME FROM THE EXP DATE.

    return {
        token: storedToken,
        exp: storedExp,
        userId: storedId,
        username: storedName,
        userhouses: storedHouses,
    };
};

const AuthContextProvider = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                let { token, exp, userId, username, userhouses } = action.payload;
                localStorage.setItem("token", token);
                localStorage.setItem("exp", exp);
                localStorage.setItem("userId", userId);
                localStorage.setItem("username", username);
                localStorage.setItem("userhouses",userhouses)
                return { ...state, token, exp, userId, username, userhouses };
            case "LOGOUT":
                localStorage.clear();
                window.location.reload(false);
                return initialState;
            case "RETURNING_USER":
                let {
                    token: t,
                    userId: u,
                    exp: e,
                    username: n,
                    userhouses: h
                } = action.payload;
                return { ...state, token: t, userId: +u, exp: +e, username: n, userhouses: h };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let localData = getLocalData();
        if (localData) {
            dispatch({ type: "RETURNING_USER", payload: localData });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };
