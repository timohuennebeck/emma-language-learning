import "./TranscriptionAIMessage.scss";

// images
import profileImg from "../../assets/images/emma-profile.jpg";

export default function TranscriptionAIMessage({ openaiMessage }) {
    return (
        <div className="transcription-ai">
            <div className="transcription-ai__profile">
                <img className="transcription-ai__profile-img" src={profileImg} alt="" />
            </div>
            <div className="transcription-ai__content">
                <p className="transcription-ai__content-name">Emma (GPT3)</p>
                <div className="transcription-ai__content-container">
                    <p className="transcription-ai__content-container-text">
                        {openaiMessage.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
