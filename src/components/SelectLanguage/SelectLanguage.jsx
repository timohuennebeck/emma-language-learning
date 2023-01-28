import "./SelectLanguage.scss";

export default function SelectLanguage({ name, flag, onClick }) {
    return (
        <div className="select-language" name={name} onClick={onClick}>
            <img src={flag} alt="" className="select-language-flag" />
            <p>{name}</p>
        </div>
    );
}
