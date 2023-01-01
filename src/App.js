import "./App.scss";

// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";
import HomePage from "./pages/HomePage/HomePage";
import TutorProfilePage from "./pages/TutorProfilePage/TutorProfilePage";
import TutorPublicProfilePage from "./pages/TutorPublicProfilePage/TutorPublicProfilePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<LoggedInInterface />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tutor/profile" element={<TutorProfilePage />} />
                        <Route path="/tutor/:id" element={<TutorPublicProfilePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
