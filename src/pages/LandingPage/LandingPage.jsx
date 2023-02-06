import "./LandingPage.scss";

import logoImg from "../../assets/images/emma-logo.png";
import aiImg from "../../assets/images/ai-face.gif";
import LoginButton from "../../components/LoginButton/LoginButton";

export default function LandingPage() {
    return (
        <div className="landing">
            <div className="landing--bg">
                <div className="landing__left">
                    <div className="landing__left-logo">
                        <img className="landing__left-logo-img" src={logoImg} alt="" />
                    </div>
                    <div className="landing__left-ai">
                        <img className="landing__left-ai-img" src={aiImg} alt="" />
                    </div>
                    <h1 className="landing__left-header">
                        Experience the{" "}
                        <span className="landing__left-header-span medium-line">future</span> of{" "}
                        <span className="landing__left-header-span medium-line">AI-powered</span>{" "}
                        language learning with real-time{" "}
                        <span className="new-line medium-line">conversations</span> and{" "}
                        <span className="landing__left-header-span medium-line">translation</span>.
                    </h1>
                    <p>
                        Emma, the advanced AI language tutor that can practice real-time
                        conversations. Prefer a a human touch? Schedule a lesson with one of our
                        tutors from around the world.
                    </p>
                    <div className="landing__left-button">
                        <LoginButton />
                        <button className="landing__left-button-signup">Sign Up</button>
                    </div>
                </div>
                <div className="landing__right-ai">
                    <img className="landing__right-ai-img" src={aiImg} alt="" />
                </div>
            </div>
        </div>
    );
}
