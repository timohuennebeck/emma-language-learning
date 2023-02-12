import "./LiveChatMessage.scss";

// images
import profileImg from "../../assets/images/personal-profile.jpg";

// libraries
import { useState } from "react";
import ChatbotLanguageTranslation from "../ChatbotLanguageTranslation/ChatbotLanguageTranslation";
import axios from "axios";

export default function LiveChatMessage({ userMessage }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const [translatedMessage, setTranslatedMessage] = useState("");

    const currentUser = "currentUser";

    const translateMessage = async (newLanguageCode) => {
        try {
            const { data } = await axios.get(
                `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${userMessage.message}&target_lang=${newLanguageCode}`
            );

            setShowTranslation(true);
            setTranslatedMessage(data.translations[0].text);
        } catch (error) {
            console.error(`There has been an error! ${error}`);
        }
    };

    return (
        <div className="messages">
            <div className="messages__profile">
                <img className="messages__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages__content-box">
                <p className="messages__content-box-name">You</p>
                <div className="messages__content-box-indv">
                    <p className="messages__content-box-indv-text">
                        {showTranslation ? translatedMessage : userMessage.message}
                    </p>
                </div>
                <ChatbotLanguageTranslation
                    translateMessage={translateMessage}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
}
