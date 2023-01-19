import "./App.scss";

// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";
import HomePage from "./pages/HomePage/HomePage";
import TutorProfilePage from "./pages/TutorPrivateProfilePage/TutorPrivateProfilePage";
import TutorPublicProfilePage from "./pages/TutorPublicProfilePage/TutorPublicProfilePage";
import StudentPrivateProfilePage from "./pages/StudentPrivateProfilePage/StudentPrivateProfilePage";
import EmmaPracticePage from "./pages/EmmaPracticePage/EmmaPracticePage";
import VCInterface from "./interfaces/VCInterface/VCInterface";
import LiveChatPage from "./pages/LiveChatPage/LiveChatPage";
import VideoCallPage from "./pages/VideoCallPage/VideoCallPage";
import ReactModal from "react-modal";
import { useState } from "react";
import ModalMessage from "./components/ModalMessage/ModalMessage";

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<LoggedInInterface />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tutor/:id" element={<TutorPublicProfilePage />} />
                        <Route path="/tutor/personal" element={<TutorProfilePage />} />
                        <Route path="/student/personal" element={<StudentPrivateProfilePage />} />
                    </Route>
                    <Route element={<VCInterface />}>
                        <Route path="/emma" element={<EmmaPracticePage />} />
                        <Route path="/live-chat" element={<LiveChatPage />} />
                        <Route path="/video-call" element={<VideoCallPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-status"
                overlayClassName="modal-status__background"
            >
                <ModalMessage />
            </ReactModal>
        </>
    );
}

export default App;
