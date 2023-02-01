import "./InputField.scss";

export default function InputField() {
    return (
        <div className="input-field">
            <p className="input-field__title">Title</p>
            <input className="input-field__input" placeholder="Insert Term..." />
        </div>
    );
}
