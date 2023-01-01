import "./Dropdown.scss";

export default function Dropdown() {
    return (
        <>
            <div className="dropdown">
                <select className="dropdown__menu">
                    <option value="Argentina">Argentina</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México" defaultValue>
                        México
                    </option>
                    <option value="Spain">Spain</option>
                </select>
            </div>

            {/* <select className="dropdown">
                {data.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    );
                })}
            </select> */}
        </>
    );
}
