import "./LandingPage.scss";

import WhiteLogo from "../../assets/icons/logo-black-bg.jpg";
import AiGif from "../../assets/images/ai-face.gif";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__logo">
        <img className="landing__logo--img" src={WhiteLogo} alt="Emma Logo" />
        <h2 className="landing__logo--copy">Emma</h2>
      </div>

      <div className="landing__nav">
        <div className="landing__nav--left">
          <p className="landing__nav--copy">Talk to Emma (AI)</p>
        </div>

        <div className="landing__nav--centre">
          <p className="landing__nav--copy">Find a Tutor</p>
        </div>

        <div className="landing__nav--middle">
          <p className="landing__nav--copy">Become a Tutor</p>
        </div>
      </div>

      <div className="landing__avatar">
        <img className="landing__avatar--gif" src={AiGif} alt="AI Gif" />
      </div>

      <div className="landing__title">
        <h1 className="landing__title--text">Experience the future of AI-powered language learning with real-time conversations</h1>
      </div>

      <div className="landing__copy">
        <p className="landing__copy--text">Emma, the advanced <b>AI language</b> tutor that can practice <b>real-time conversations</b>. Prefer a a human touch? Schedule a lesson with one of our  tutors from around the world.</p>
      </div>

      <div className="landing__buttons">
        <button className="landing__buttons--login" type="button">Log In</button>
        <button className="landing__buttons--sign-up" type="button">Sign Up</button>
      </div>
    </div>
  );
}
