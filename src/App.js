import "./App.scss";

// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoggedInInterface />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
