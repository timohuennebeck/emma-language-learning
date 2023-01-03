import "./VCNavigation.scss";

// images
import moreImg from "../../assets/icons/more-v.svg";
import closeImg from "../../assets/icons/remove.svg";
import leaveImg from "../../assets/icons/sign-out.svg";
import hideImg from "../../assets/icons/eye-slash.svg";
import showImg from "../../assets/icons/eye.svg";
import messagesImg from "../../assets/icons/send.svg";

// libraries
import { useState } from "react";

export default function VCNavigation({
    showText,
    setShowText,
    modalIsOpen,
    setModalIsOpen,
    chatIsOpen,
    setChatIsOpen,
}) {
    const [showNavigation, setShowNavigation] = useState(false);

    return (
        <div className="vc-navigation">
            {showNavigation ? (
                <>
                    <div
                        className="vc-navigation__close"
                        onClick={() => setShowNavigation(!showNavigation)}
                    >
                        <img className="vc-navigation__close-img" src={closeImg} alt="" />
                    </div>
                    <div className="vc-navigation__leave">
                        <img className="vc-navigation__leave-img" src={leaveImg} alt="" />
                    </div>
                    {showText ? (
                        <div className="vc-navigation__hide" onClick={() => setShowText(!showText)}>
                            <img src={hideImg} alt="" />
                        </div>
                    ) : (
                        <div className="vc-navigation__hide" onClick={() => setShowText(!showText)}>
                            <img src={showImg} alt="" />
                        </div>
                    )}
                    <div
                        className="vc-navigation__messages"
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                    >
                        <img src={messagesImg} alt="" />
                    </div>
                    <div
                        className="vc-navigation__chat"
                        onClick={() => setChatIsOpen(!chatIsOpen)}
                    >
                        <img src={messagesImg} alt="" />
                    </div>
                </>
            ) : (
                <div
                    className="vc-navigation__dropdown"
                    onClick={() => setShowNavigation(!showNavigation)}
                >
                    <img className="vc-navigation__dropdown" src={moreImg} alt="" />
                </div>
            )}
            <div className="vc-navigation__time">
                <p className="vc-navigation__time-text">03:15</p>
            </div>
        </div>
    );
}
