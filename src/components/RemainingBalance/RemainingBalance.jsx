import "./RemainingBalance.scss";


export default function RemainingBalance() {
    return (
        <div className="balance">
            <div className="balance__name">
                <p className="balance__name--bold">Remaining Balance</p>
                <p className="balance__name--recharge">Recharge</p>
            </div>
            <p className="balance__amount">255, 72€</p>
        </div>
    );
}