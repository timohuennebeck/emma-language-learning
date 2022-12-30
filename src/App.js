import "./App.scss";

// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<LoggedInInterface />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
