import "./LiveChatMessageDifferentUser.scss";

// images
import profileImg from "../../assets/images/fake-profile-2.jpg";

export default function LiveChatMessageDifferentUser({ openaiMessage }) {
    return (
        <div className="messages-different">
            <div className="messages-different__profile">
                <img className="messages-different__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages-different__content">
                <p className="messages-different__content-name">GPT3</p>
                <div className="messages-different__content-container">
                    <p className="messages-different__content-container-text">
                        {openaiMessage.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
