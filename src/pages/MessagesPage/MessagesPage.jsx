import "./MessagesPage.scss";

// components
import CurrentChat from "../../components/CurrentChat/CurrentChat";

// api calls
import { getUsers } from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import SelectUserChat from "../../components/SelectUserChat/SelectUserChat";

export default function MessagesPage() {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        getUsers().then(({ data }) => {
            setUsersData(data);
        });
    }, []);

    return (
        <div className="messages">
            <div className="messages__users">
                {usersData.map((item) => {
                    return <SelectUserChat data={item} key={item.id}/>;
                })}
            </div>
            <div className="messages__live">
                <CurrentChat />
            </div>
        </div>
    );
}
