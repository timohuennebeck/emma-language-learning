import "./VideoCallPage.scss";

// images
import videoImg from "../../assets/icons/video.svg";
import micMutedImg from "../../assets/icons/microphone-mute.svg";
import micUnmuteddImg from "../../assets/icons/microphone.svg";
import shareImg from "../../assets/icons/broadcast.svg";

// components
import VCNavigation from "../../components/VCNavigation/VCNavigation";
import LiveChatPage from "../LiveChatPage/LiveChatPage";

// libraries
import { useState } from "react";
import ReactModal from "react-modal";

export default function VideoCallPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [unmuteMicrophone, setUnmuteMicrophone] = useState(false);
    const [showText, setShowText] = useState(true);

    return (
        <>
            <div className="video-call">
                <div className="video-call__left">
                    <VCNavigation
                        showText={showText}
                        setShowText={setShowText}
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        chatIsOpen={chatIsOpen}
                        setChatIsOpen={setChatIsOpen}
                    />
                    <div className="video-call__left-content">
                        <p
                            className={
                                showText
                                    ? "video-call__left-content-subtitles"
                                    : "video-call__left-content-subtitles not-active"
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
                    <nav className="video-call__left-nav">
                        <div className="video-call__left-nav-video">
                            <img className="video-call__left-nav-video-img" src={videoImg} alt="" />
                        </div>
                        {unmuteMicrophone ? (
                            <div
                                className="video-call__left-nav-mic"
                                onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                            >
                                <img
                                    className="video-call__left-nav-mic-img"
                                    src={micMutedImg}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div
                                className="video-call__left-nav-mic"
                                onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                            >
                                <img
                                    className="video-call__left-nav-mic-img"
                                    src={micUnmuteddImg}
                                    alt=""
                                />
                            </div>
                        )}
                        <div className="video-call__left-nav-share">
                            <img className="video-call__left-nav-share-img" src={shareImg} alt="" />
                        </div>
                    </nav>
                    <div className="video-call__left-user"></div>
                    <div className="video-call__left-bottom"></div>
                </div>
                {chatIsOpen && (
                    <LiveChatPage chatIsOpen={chatIsOpen} setChatIsOpen={setChatIsOpen} />
                )}
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="video-call-card-modal"
                overlayClassName="video-call-card-modal-background"
            >
                <LiveChatPage modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            </ReactModal>
        </>
    );
}
