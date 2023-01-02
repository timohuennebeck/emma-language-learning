import "./LiveChatMessageDifferentUser.scss";

// images
import profileImg from "../../assets/images/fake-profile-2.jpg";

export default function LiveChatMessageDifferentUser() {
    return (
        <div className="messages-different">
            <div className="messages-different__profile">
                <img className="messages-different__profile-img" src={profileImg} alt="" />
            </div>
            <div className="messages-different__content">
                <p className="messages-different__content-name">Melanie Perkins</p>
                <div className="messages-different__content-container">
                    <p className="messages-different__content-container-text">
                        I can’t wait for the meeting to start!!
                    </p>
                    <p className="messages-different__content-container-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus,
                        sequi.
                    </p>
                </div>
            </div>
        </div>
    );
}
