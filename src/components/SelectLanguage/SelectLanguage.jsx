import "./SelectLanguage.scss";

export default function SelectLanguage({ name, flag, currentLanguage, onClick }) {
    return (
        <div
            className={
                name === currentLanguage ? "select-language highlight-box" : "select-language"
            }
            name={name}
            onClick={onClick}
        >
            <img src={flag} alt="" className="select-language-flag" />
            <p>{name}</p>
        </div>
    );
}
