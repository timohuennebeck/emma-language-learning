import "./SelectUserChat.scss";

export default function SelectUserChat({ data }) {
    return (
        <div className="select-user">
            <img className="select-user__img" src={data.image_url} alt="" />
            <p className="select-user__name">
                {data.first_name} {data.last_name}
            </p>
        </div>
    );
}
