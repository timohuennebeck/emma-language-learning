import "./LandingPage.scss";

import WhiteLogo from "../../assets/icons/logo-black-bg.jpg";
import AiGif from "../../assets/images/ai-face.gif";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__logo">
        <img className="landing__logo--img" src={WhiteLogo} alt="Emma Logo" />
        <h3 className="landing__logo--copy">Emma</h3>
      </div>

      <div className="landing__nav">
        <div className="landing__nav--left">
          <a className="landing__nav--link" href="/emma">
            Talk to Emma (AI)
          </a>
        </div>

        <div className="landing__nav--centre">
          <a className="landing__nav--link" href="/tutor/:id">
            Find a Tutor
          </a>
        </div>

        <div className="landing__nav--middle">
          <a className="landing__nav--link" href="/tutor/:id">
            Become a Tutor
          </a>
        </div>
      </div>

      <div className="landing__avatar">
        <img className="landing__avatar--gif" src={AiGif} alt="AI Gif" />
      </div>

      <div className="landing__title">
        <h1 className="landing__title--text">
          Experience the <span className="text__green-gradient">future</span> of{" "}
          <span className="text__blue-gradient">AI-powered</span> language
          learning with real-time
          <span className="text__mix-gradient"> conversations</span>
        </h1>
      </div>

      <div className="landing__copy">
        <p className="landing__copy--text">
          Emma, the advanced <b>AI language</b> tutor that can practice{" "}
          <b>real-time conversations</b>. Prefer a a human touch? Schedule a
          lesson with one of our tutors from around the world.
        </p>
      </div>

      <div className="landing__buttons">
        <button className="landing__buttons--log-in" type="button">
          <h3>Log In</h3>
        </button>
        <button className="landing__buttons--sign-up" type="button">
          <h3>Sign Up</h3>
        </button>
      </div>
    </div>
  );
}
