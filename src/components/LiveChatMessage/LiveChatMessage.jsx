import "./LiveChatMessage.scss";

// images
import profileImg from "../../assets/images/fake-profile-2.jpg";

export default function LiveChatMessage() {
    return (
        <div className="messages">
            <div className="messages__profile">
                <img className="messages__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages__content">
                <p className="messages__content-name">Melanie Perkins</p>
                <p className="messages__content-text">I can’t wait for the meeting to start!!</p>
                <p className="messages__content-text">
                    I can’t wait for the meeting to start!! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Sed nihil repudiandae assumenda excepturi sapiente harum
                    deleniti eveniet porro recusandae quibusdam.
                </p>
            </div>
        </div>
    );
}
