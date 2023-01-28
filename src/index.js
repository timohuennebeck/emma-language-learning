import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Auth0Provider
        domain="emma-language-learning.eu.auth0.com"
        clientId="XPFPBIWb1oE6cgspdllJnV60bkbAIPfw"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
