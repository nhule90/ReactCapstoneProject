import "./App.css";
import { useContext } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/homeComponents/HomeScreen";
import AuthScreen from "./components/authComponents/AuthScreen";
import DetailScreen from "./components/detailComponents/DetailScreen";
import { Routes, Route,Navigate } from "react-router-dom";
import AuthContext from "./store/authContext";
function App() {
    const { state } = useContext(AuthContext);
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route
                        path="auth"
                        element={!state.token ? <AuthScreen /> : <Navigate to="/" />}
                    />
                    <Route path="house/:id" element={<DetailScreen />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
