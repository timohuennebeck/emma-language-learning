import "./TranscriptionAIMessage.scss";

// images
import profileImg from "../../assets/images/emma-profile.jpg";

// components
import ChatbotLanguageTranslation from "../ChatbotLanguageTranslation/ChatbotLanguageTranslation";

// libraries
import { useState } from "react";

export default function TranscriptionAIMessage({ openaiMessage }) {
    const currentUser = "AI";

    return (
        <div className="transcription-user">
            <div className="transcription-user__profile">
                <img className="transcription-user__profile-img" src={profileImg} alt="" />
            </div>
            <div className="transcription-user__content">
                <p className="transcription-user__content-name">Emma (GPT3)</p>
                <div className="transcription-user__content-container">
                    <p className="transcription-user__content-container-text">
                        {openaiMessage.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
