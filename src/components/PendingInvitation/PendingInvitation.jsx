import "./PendingInvitation.scss";

// images
import userImg from "../../assets/images/fake-profile-2.jpg";

// components
import ButtonLinkTransparent from "../ButtonLinkTransparent/ButtonLinkTransparent";

export default function PendingInvitation() {
    return (
        <div className="pending">
            <div className="pending__container">
                <div className="pending__container-left">
                    <img className="pending__container-left-img" src={userImg} alt="" />
                    <p className="pending__container-left-lessons">72 Lessons</p>
                </div>
                <div className="pending__container-right">
                    <p className="pending__container-right-name">
                        Madelaide <span className="pending__container-right-name-bold"> Beer</span>
                    </p>
                    <p className="pending__container-right-location">Madrid, Spain</p>
                    <p className="pending__container-right-lessons">1:1 Lesson (A2 - A1)</p>
                    <p className="pending__container-right-time">03:00PM (GMT+1)</p>
                </div>
            </div>
            <ButtonLinkTransparent link="/profile" text="Confirm Lesson" />
        </div>
    );
}
