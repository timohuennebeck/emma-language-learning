import "./App.scss";

// libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";
import NavigationInterface from "./interfaces/NavigationInterface/NavigationInterface";
import BrowseTutorsPage from "./pages/BrowseTutorsPage/BrowseTutorsPage";
import TutorProfilePage from "./pages/TutorPrivateProfilePage/TutorPrivateProfilePage";
import TutorPublicProfilePage from "./pages/TutorPublicProfilePage/TutorPublicProfilePage";
import StudentPrivateProfilePage from "./pages/StudentPrivateProfilePage/StudentPrivateProfilePage";
import EmmaPracticePage from "./pages/EmmaPracticePage/EmmaPracticePage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import VideoCallPage from "./pages/VideoCallPage/VideoCallPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ReactModal from "react-modal";
import FlashcardsPage from "./pages/FlashcardsPage/FlashcardsPage";
import ReadingsPage from "./pages/ReadingsPage/ReadingsPage";
import FlashcardsDeckPage from "./pages/FlashcardsDeckPage/FlashcardsDeckPage";
import FlashcardsWritingPage from "./pages/FlashcardsWritingPage/FlashcardsWritingPage";
import EmmaChatbot from "./pages/EmmaChatbot/EmmaChatbot";
import LandingPage from "./pages/LandingPage/LandingPage";
import UploadNewFlashcardsDeck from "./pages/UploadNewFlashcardsDeck/UploadNewFlashcardsDeck";

function App() {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <LandingPage />;
    }

    const rootElement = document.getElementById("root");
    ReactModal.setAppElement(rootElement);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/conversation" element={<EmmaPracticePage />} />
                    <Route element={<NavigationInterface />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/readings" element={<ReadingsPage />} />
                        <Route path="/flashcards" element={<FlashcardsPage />} />
                        <Route path="/flashcards/add" element={<UploadNewFlashcardsDeck />} />
                        <Route path="/flashcards/:id" element={<FlashcardsDeckPage />} />
                        <Route
                            path="/flashcards/:id/revision"
                            element={<FlashcardsWritingPage />}
                        />
                        <Route path="/chatbot" element={<EmmaChatbot />} />
                        <Route path="/settings" element={<StudentPrivateProfilePage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/video-call" element={<VideoCallPage />} />

                        <Route element={<LoggedInInterface />}>
                            <Route path="/tutors" element={<BrowseTutorsPage />} />
                            <Route path="/tutor/:id" element={<TutorPublicProfilePage />} />
                            <Route path="/tutor/personal" element={<TutorProfilePage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
