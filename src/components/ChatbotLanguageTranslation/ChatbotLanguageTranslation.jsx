import "./ChatbotLanguageTranslation.scss";

// images
import moreImg from "../../assets/icons/More.svg";

// languages
import ukImg from "../../assets/languages/united kingdom.svg";
import franceImg from "../../assets/languages/france.svg";
import spainImg from "../../assets/languages/spain.svg";
import germanyImg from "../../assets/languages/germany.svg";

// libraries
import { useState } from "react";

export default function ChatbotLanguageTranslation({ translateMessage, currentUser }) {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [hover, setHover] = useState(false);

    const filteredLanguages = [
        { id: 1, code: "EN", flag: ukImg },
        { id: 2, code: "FR", flag: franceImg },
        { id: 3, code: "ES", flag: spainImg },
        { id: 4, code: "DE", flag: germanyImg },
    ];

    return (
        <div className="chatbot-translation">
            <div
                className="chatbot-translation__dropdown"
                onClick={() => setToggleDropdown(!toggleDropdown)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    className={`chatbot-translation__dropdown-img ${hover ? "toggle-img" : ""}`}
                    src={moreImg}
                    alt=""
                />
            </div>
            {toggleDropdown ? (
                <>
                    {filteredLanguages.map((item) => (
                        <div
                            key={item.id}
                            className={`chatbot-translation__box ${
                                currentUser === "AI" ? "order-ai" : ""
                            }`}
                            onClick={() => {
                                translateMessage(item.code);
                                setToggleDropdown(false);
                            }}
                        >
                            <img className="chatbot-translation__box-img" src={item.flag} alt="" />
                        </div>
                    ))}
                </>
            ) : null}
        </div>
    );
}
