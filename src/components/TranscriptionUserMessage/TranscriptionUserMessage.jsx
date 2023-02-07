import "./TranscriptionUserMessage.scss";

// images
import profileImg from "../../assets/images/personal-profile.jpg";

export default function TranscriptionUserMessage({ userMessage }) {
    return (
        <div className="transcription-user">
            <div className="transcription-user__profile">
                <img className="transcription-user__profile-img" src={profileImg} alt="" />
            </div>
            <div className="transcription-user__content-box">
                <p className="transcription-user__content-box-name">You</p>
                <div className="transcription-user__content-box-indv">
                    <p className="transcription-user__content-box-indv-text">
                        {userMessage.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
