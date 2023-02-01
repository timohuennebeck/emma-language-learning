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
import { useEffect } from "react";

export default function EmmaPracticePage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [unmuteMicrophone, setUnmuteMicrophone] = useState(false);
    const [showText, setShowText] = useState(true);

    const [transcript, setTranscript] = useState("");
    const [language, setLanguage] = useState("es-ES");
    const [listening, setListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition is not supported in this browser.");
            return;
        }

        let recognition = null;

        const startListening = () => {
            recognition = new SpeechRecognition();
            recognition.lang = language;
            recognition.interimResults = true;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
            };
        };

        const stopListening = () => {
            recognition.stop();
            recognition = null;
        };

        if (listening) {
            startListening();
        } else if (recognition) {
            stopListening();
        }

        return () => {
            if (recognition) {
                stopListening();
            }
        };
    }, [language, listening]);

    return (
        <>
            <div className="emma-video">
                <div>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                    </select>
                </div>
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
                            {transcript}
                        </p>
                    </div>
                    {unmuteMicrophone ? (
                        <div
                            className="emma-video__left-mic"
                            onClick={() => {
                                setUnmuteMicrophone(!unmuteMicrophone);
                                setListening(!listening);
                            }}
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
                            onClick={() => {
                                setUnmuteMicrophone(!unmuteMicrophone);
                                setListening(!listening);
                            }}
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
