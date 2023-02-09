import { Link, Outlet } from "react-router-dom";
import "./NavigationInterface.scss";

// components
import NavLinkButton from "../../components/NavLinkButton/NavLinkButton";
import { useAuth0 } from "@auth0/auth0-react";

// images
import emmaLogo from "../../assets/images/emma-logo.png";
import dashboardImg from "../../assets/icons/Discovery.svg";
import readingsImg from "../../assets/icons/Menu.svg";
import flashcardsImg from "../../assets/icons/Note.svg";
import tutorsImg from "../../assets/icons/Video-coco.svg";
import chatbotImg from "../../assets/icons/Presentation.svg";
import conversationImg from "../../assets/icons/Two-user.svg";
import messagesImg from "../../assets/icons/Send-coco.svg";
import settingsImg from "../../assets/icons/Setting - 3.svg";
import logOutImg from "../../assets/icons/Lock.svg";

export default function NavigationInterface() {
    const { logout } = useAuth0();

    return (
        <div className="nav-interface">
            <div className="nav-interface__indv">
                <div className="nav-interface__indv-left">
                    <Link to="/">
                        <img className="nav-interface__indv-left-img" src={emmaLogo} alt="" />
                    </Link>
                    <div className="nav-interface__indv-left-nav">
                        <NavLinkButton link="/" hover="Dashboard" img={dashboardImg} />
                        <NavLinkButton link="/readings" hover="Readings" img={readingsImg} />
                        <NavLinkButton link="/flashcards" hover="Flashcards" img={flashcardsImg} />
                        <NavLinkButton
                            link="/conversation"
                            hover="AI Conversation (Emma)"
                            img={conversationImg}
                        />
                        <NavLinkButton link="/chatbot" hover="AI Chatbot (Emma)" img={chatbotImg} />
                        <NavLinkButton
                            link="/tutors"
                            hover="Browse Language Tutors"
                            img={tutorsImg}
                        />
                    </div>
                </div>
                <div>
                    {/* <NavLinkButton link="/messages" hover="Messages" img={messagesImg} /> */}
                    {/* <NavLinkButton link="/settings" hover="Settings" img={settingsImg} /> */}
                    <NavLinkButton
                        onClick={() =>
                            logout({ returnTo: "https://emma-language-learning.herokuapp.com" })
                        }
                        hover="Log Out"
                        img={logOutImg}
                    />
                </div>
            </div>
            <div className="nav-interface__outlet">
                <Outlet />
            </div>
        </div>
    );
}
