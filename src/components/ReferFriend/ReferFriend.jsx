import "./ReferFriend.scss";

// images
import linkImg from "../../assets/icons/link.svg";

export default function ReferFriend() {
    return (
        <div className="friend">
            <div className="friend__name">
                <p className="friend__name-bold">Refer a Friend</p>
                <img className="friend__name-img" src={linkImg} alt="" />
            </div>
            <p className="friend__fade">Share this link and once a friend has signed up receive 25€ in credits.</p>
        </div>
    );
}
