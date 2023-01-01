import "./LanguageLevel.scss";

// images
import removeImg from "../../assets/icons/plus.svg";

export default function LanguageLevel() {
    return (
        <div className="language">
            <div className="language__name">
                <p className="language__name-bold">English</p>
                <img className="language__name-img" src={removeImg} alt="" />
            </div>
            <p className="language__fade">Native</p>
        </div>
    );
}
