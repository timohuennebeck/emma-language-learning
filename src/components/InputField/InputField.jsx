import "./InputField.scss";

export default function InputField({ name, flashcard, onChange }) {
    return (
        <div className="input-field">
            <p className="input-field__title">Title</p>
            <input
                name={name}
                value={name === "english" ? flashcard.english : flashcard.foreign_translation}
                className="input-field__input"
                placeholder="Insert Term..."
                onChange={onChange}
            />
        </div>
    );
}
