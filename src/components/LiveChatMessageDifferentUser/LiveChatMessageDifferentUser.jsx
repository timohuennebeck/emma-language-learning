import "./LiveChatMessageDifferentUser.scss";

// images
import profileImg from "../../assets/images/emma-profile.jpg";
import loadingImg from "../../assets/icons/Loading.svg";

// components
import ChatbotLanguageTranslation from "../ChatbotLanguageTranslation/ChatbotLanguageTranslation";

// libraries
import { useState } from "react";

export default function LiveChatMessageDifferentUser({ openaiMessage, isLoading }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const [translatedMessage, setTranslatedMessage] = useState("");

    const currentUser = "AI";

    const translateMessage = (newLanguageCode) => {
        fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${openaiMessage.message}&target_lang=${newLanguageCode}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setShowTranslation(true);
                setTranslatedMessage(data.translations[0].text);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="messages-different">
            <div className="messages-different__profile">
                <img className="messages-different__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages-different__content">
                <div className="messages-different__content-box">
                    {openaiMessage.message === "I'm thinking... Hold on for a second." && (
                        <img
                            className="messages-different__content-box-loading loading-animation"
                            src={loadingImg}
                            alt=""
                        />
                    )}
                    <p className="messages-different__content-box-name">Emma (GPT3)</p>
                </div>
                <div className="messages-different__content-container">
                    <p className="messages-different__content-container-text">
                        {showTranslation ? translatedMessage : openaiMessage.message}
                    </p>
                </div>
                <div className="messages-different__content-dropdown">
                    <ChatbotLanguageTranslation
                        translateMessage={translateMessage}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}
