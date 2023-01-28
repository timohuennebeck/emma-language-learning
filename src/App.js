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
import VCInterface from "./interfaces/VCInterface/VCInterface";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import VideoCallPage from "./pages/VideoCallPage/VideoCallPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { useState } from "react";
import ReactModal from "react-modal";
import ModalMessage from "./components/ModalMessage/ModalMessage";
import FlashcardsPage from "./pages/FlashcardsPage/FlashcardsPage";
import ReadingsPage from "./pages/ReadingsPage/ReadingsPage";
import LoginButton from "./components/LoginButton/LoginButton";

function App() {
    const { isAuthenticated } = useAuth0();

    const [modalIsOpen, setModalIsOpen] = useState(true);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (!isAuthenticated) {
        return <LoginButton />;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<NavigationInterface />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/readings" element={<ReadingsPage />} />
                        <Route path="/flashcards" element={<FlashcardsPage />} />
                        <Route path="/settings" element={<StudentPrivateProfilePage />} />
                        <Route element={<LoggedInInterface />}>
                            <Route path="/tutors" element={<BrowseTutorsPage />} />
                            <Route path="/tutor/:id" element={<TutorPublicProfilePage />} />
                            <Route path="/tutor/personal" element={<TutorProfilePage />} />
                        </Route>
                        <Route element={<VCInterface />}>
                            <Route path="/conversation" element={<EmmaPracticePage />} />
                            <Route path="/messages" element={<MessagesPage />} />
                            <Route path="/video-call" element={<VideoCallPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* <ReactModal
                isOpen={modalIsOpen}
                className="modal-status"
                overlayClassName="modal-status__background"
            >
                <ModalMessage onRequestClose={closeModal} />
            </ReactModal> */}
        </>
    );
}

export default App;
