import "./LoginButton.scss";

// libraries
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ name }) => {
    const { loginWithRedirect } = useAuth0();

    const redirectUri = name === "Log In" ? "/login" : "/register";

    return (
        <button
            className="login-button"
            onClick={() => loginWithRedirect({ redirect_uri: redirectUri })}
        >
            {name}
        </button>
    );
};

export default LoginButton;
