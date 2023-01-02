import "./LiveChatPage.scss";

// images
import messagesImg from "../../assets/icons/send.svg";
import aiImg from "../../assets/icons/open-ai-logo.png";
import LiveChatMessage from "../../components/LiveChatMessage/LiveChatMessage";
import LiveChatMessageDifferentUser from "../../components/LiveChatMessageDifferentUser/LiveChatMessageDifferentUser";
import moreImg from "../../assets/icons/more-v.svg";

export default function LiveChatPage() {
    return (
        <div className="live-chat">
            <div className="live-chat__container">
                <nav className="live-chat__container-nav">
                    <div className="live-chat__container-nav-messages">
                        <img
                            className="live-chat__container-nav-messages-img"
                            src={messagesImg}
                            alt=""
                        />
                        <p className="live-chat__container-nav-messages-text">Live Chat</p>
                    </div>
                    <div className="live-chat__container-nav-ai">
                        <img className="live-chat__container-nav-ai-img" src={aiImg} alt="" />
                        <p className="live-chat__container-nav-ai-text">Emma (AI)</p>
                    </div>
                </nav>
                <div className="live-chat__container-messages">
                    <LiveChatMessage />
                    <LiveChatMessage />
                    <LiveChatMessageDifferentUser />
                    <LiveChatMessage />
                    <LiveChatMessageDifferentUser />
                    <LiveChatMessageDifferentUser />
                </div>
            </div>
            <div className="live-chat__send">
                <div className="live-chat__send-magic">
                    <img className="live-chat__send-magic-img" src={moreImg} alt="" />
                    <p className="live-chat__send-magic-text">Melanie is creating some magic...</p>
                </div>
                <div className="live-chat__send-container">
                    <div className="live-chat__send-container-input">
                        <input
                            className="live-chat__send-container-input-indv"
                            type="text"
                            placeholder="Write a message here..."
                        />
                    </div>
                    <div className="live-chat__send-container-message">
                        <img
                            className="live-chat__send-container-message-img"
                            src={messagesImg}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
