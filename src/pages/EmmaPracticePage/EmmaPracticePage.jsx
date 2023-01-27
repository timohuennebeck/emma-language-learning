import "./EmmaPracticePage.scss";

// images
import aiFaceImg from "../../assets/images/ai-face.gif";
import micMutedImg from "../../assets/icons/microphone-mute.svg";
import micUnmuteddImg from "../../assets/icons/microphone.svg";

// components
import VCNavigation from "../../components/VCNavigation/VCNavigation";
import CurrentChat from "../../components/CurrentChat/CurrentChat";

// libraries
import { useState } from "react";
import ReactModal from "react-modal";

export default function EmmaPracticePage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [unmuteMicrophone, setUnmuteMicrophone] = useState(false);
    const [showText, setShowText] = useState(true);

    return (
        <>
            <div className="emma-video">
                <div className="emma-video__left">
                    <VCNavigation
                        showText={showText}
                        setShowText={setShowText}
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        chatIsOpen={chatIsOpen}
                        setChatIsOpen={setChatIsOpen}
                    />
                    <div className="emma-video__left-content">
                        <img className="emma-video__left-content-ai" src={aiFaceImg} alt="" />
                        <p
                            className={
                                showText
                                    ? "emma-video__left-content-subtitles"
                                    : "emma-video__left-content-subtitles not-active"
                            }
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat...
                        </p>
                    </div>
                    {unmuteMicrophone ? (
                        <div
                            className="emma-video__left-mic"
                            onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                        >
                            <div className="emma-video__left-mic-container">
                                <img
                                    className="emma-video__left-mic-container-img"
                                    src={micMutedImg}
                                    alt=""
                                />
                            </div>
                            <p className="emma-video__left-mic-text">You are muted!</p>
                        </div>
                    ) : (
                        <div
                            className="emma-video__left-mic"
                            onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                        >
                            <div className="emma-video__left-mic-container">
                                <img
                                    className="emma-video__left-mic-container-img"
                                    src={micUnmuteddImg}
                                    alt=""
                                />
                            </div>
                            <p className="emma-video__left-mic-text">You are unmuted!</p>
                        </div>
                    )}
                </div>
                {chatIsOpen && (
                    <CurrentChat chatIsOpen={chatIsOpen} setChatIsOpen={setChatIsOpen} />
                )}
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="emma-video-card-modal"
                overlayClassName="emma-video-card-modal-background"
            >
                <CurrentChat modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            </ReactModal>
        </>
    );
}
