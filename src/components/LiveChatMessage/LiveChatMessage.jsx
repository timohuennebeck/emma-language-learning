import "./LiveChatMessage.scss";

// images
import profileImg from "../../assets/images/fake-profile-2.jpg";

export default function LiveChatMessage({ userMessage }) {
    return (
        <div className="messages">
            <div className="messages__profile">
                <img className="messages__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages__content">
                <p className="messages__content-name">User</p>
                <p className="messages__content-text">{userMessage.message}</p>
            </div>
        </div>
    );
}
