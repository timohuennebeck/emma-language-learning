import "./AddNewLanguage.scss";

// images
import addImg from "../../assets/icons/plus.svg";

export default function AddNewLanguage() {
    return (
        <div className="AddNewLanguage">
            <div className="AddNewLanguage__name">
                <p className="AddNewLanguage__name--text">Add New Language</p>
                <img className="AddNewLanguage__name--img" src={addImg} alt="" />
            </div>
        </div>
    );
}
