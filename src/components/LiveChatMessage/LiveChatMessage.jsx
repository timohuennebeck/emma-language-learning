import "./LiveChatMessage.scss";

// images
import profileImg from "../../assets/images/personal-profile.jpg";
import { useState } from "react";

export default function LiveChatMessage({ userMessage }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const [translatedMessage, setTranslatedMessage] = useState("");

    const deepLTranslation = () => {
        fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${userMessage.message}&target_lang=EN`
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
        <div className="messages">
            <div className="messages__profile">
                <img className="messages__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages__content">
                <p className="messages__content-name">You</p>
                <p className="messages__content-text" onClick={deepLTranslation}>
                    {showTranslation ? translatedMessage : userMessage.message}
                </p>
            </div>
        </div>
    );
}
