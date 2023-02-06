import "./LiveChatMessageDifferentUser.scss";

// images
import profileImg from "../../assets/images/emma-profile.jpg";
import { useState } from "react";

export default function LiveChatMessageDifferentUser({ openaiMessage }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const [translatedMessage, setTranslatedMessage] = useState("");

    const deepLTranslation = () => {
        fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${openaiMessage.message}&target_lang=EN`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setShowTranslation(!showTranslation);
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
                <p className="messages-different__content-name">Emma (GPT3)</p>
                <div className="messages-different__content-container">
                    <p
                        className="messages-different__content-container-text"
                        onClick={deepLTranslation}
                    >
                        {showTranslation ? translatedMessage : openaiMessage.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
