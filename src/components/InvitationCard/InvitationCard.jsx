import "./InvitationCard.scss";

//images
import profileImg from "../../assets/images/fake-profile.jpg";

import { Link } from "react-router-dom";

export default function InvitationCard() {
  return (
    <div className="invitation">
      <div className="invitation__profile">
        <div className="invitation__profile--avatar">
          <img className="tutor__profile--avatar--img" src={profileImg} alt="profile icon" />
        </div>

        <div className="invitation__profile--info">

        </div>
      </div>

      <div className="invitation__confirmation">
        <div className="invitation__confirmation--button">
            
        </div>
      </div>
    </div>
  );
}
