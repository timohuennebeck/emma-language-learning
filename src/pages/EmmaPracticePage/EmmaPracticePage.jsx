import "./EmmaPracticePage.scss";

// images
import aiFaceImg from "../../assets/images/ai-face.gif";
import micMutedImg from "../../assets/icons/microphone-mute.svg";
import micUnmuteddImg from "../../assets/icons/microphone.svg";

// components
import VCNavigation from "../../components/VCNavigation/VCNavigation";

// libraries
import { useState } from "react";

export default function EmmaPracticePage() {
    const [unmuteMicrophone, setUnmuteMicrophone] = useState(false);
    const [showText, setShowText] = useState(true);

    return (
        <div className="emma-video">
            <VCNavigation showText={showText} setShowText={setShowText} />
            <div className="emma-video__content">
                <img className="emma-video__content-ai" src={aiFaceImg} alt="" />
                <p
                    className={
                        showText
                            ? "emma-video__content-subtitles"
                            : "emma-video__content-subtitles not-active"
                    }
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...
                </p>
            </div>
            {unmuteMicrophone ? (
                <div
                    className="emma-video__mic"
                    onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                >
                    <div className="emma-video__mic-container">
                        <img className="emma-video__mic-container-img" src={micMutedImg} alt="" />
                    </div>
                    <p className="emma-video__mic-text">You are muted!</p>
                </div>
            ) : (
                <div
                    className="emma-video__mic"
                    onClick={() => setUnmuteMicrophone(!unmuteMicrophone)}
                >
                    <div className="emma-video__mic-container">
                        <img
                            className="emma-video__mic-container-img"
                            src={micUnmuteddImg}
                            alt=""
                        />
                    </div>
                    <p className="emma-video__mic-text">You are unmuted!</p>
                </div>
            )}
        </div>
    );
}
