import React from "react";
import ButtonLink from "../ButtonLink/ButtonLink";
import "./ModalMessage.scss";

export default function ModalMessage({ onRequestClose }) {
    return (
        <div className="modal-message">
            <h2>Emma Demo</h2>
            <p>
                This platform, Emma, is still in progress. Please, come back after the 31-01-23 to
                check its features.
            </p>
            <button className="modal-message__button" onClick={onRequestClose}>
                I understand. Let me test!
            </button>
        </div>
    );
}
