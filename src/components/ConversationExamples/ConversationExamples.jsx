import { useState } from "react";
import "./ConversationExamples.scss";

export default function ConversationExamples({ flag, language, handleGPT }) {
    const [showExamples, setShowExamples] = useState();

    let exampleOne;
    let exampleTwo;
    let exampleThree;
    let exampleFour;
    let exampleFive;

    switch (language) {
        case "English":
            exampleOne = "What is the best place you have ever traveled to and why?";
            exampleTwo = "What hobbies do you enjoy doing in your free time?";
            exampleThree = "What is your favorite dish to cook or eat?";
            exampleFour = "What is your go-to gadget or technology that you can't live without?";
            exampleFive = "Who is your favorite musician or band? Why do you like them?";
            break;
        case "French":
            exampleOne = "Quel est le meilleur endroit où tu as voyagé et pourquoi ?";
            exampleTwo = "Quels sont les passe-temps que tu aimes faire pendant ton temps libre ?";
            exampleThree = "Quel est ton plat préféré à cuisiner ou à manger ?";
            exampleFour =
                "Quel est ton gadget ou ta technologie préférée dont tu ne peux pas te passer ?";
            exampleFive = "Qui est ton musicien ou ton groupe préféré ? Pourquoi les aimes-tu ?";
            break;
        case "Spanish":
            exampleOne = "¿Cuál es el mejor lugar al que has viajado y por qué?";
            exampleTwo = "¿Qué aficiones te gusta hacer en tu tiempo libre?";
            exampleThree = "¿Cuál es tu plato favorito para cocinar o comer?";
            exampleFour = "¿Cuál es tu aparato o tecnología favorita sin la que no puedes vivir?";
            exampleFive = "¿Quién es tu músico o grupo favorito? ¿Por qué te gustan?";
            break;
        case "German":
            exampleOne = "Welches ist der beste Ort, an den du je gereist bist, und warum?";
            exampleTwo = "Welchen Hobbies gehst du in deiner Freizeit gerne nach?";
            exampleThree = "Welches Gericht kochst oder isst du am liebsten?";
            exampleFour =
                "Welches ist dein Lieblingsgadget oder deine Lieblingstechnologie, ohne die du nicht leben kannst?";
            exampleFive =
                "Wer ist dein Lieblingsmusiker oder deine Lieblingsband? Warum magst du sie?";
            break;
    }

    return (
        <div className="conversation-examples" onClick={() => setShowExamples(!showExamples)}>
            <div className="conversation-examples__box">
                <img className="conversation-examples__box-img" src={flag} alt="" />
            </div>

            {showExamples ? (
                <div className="conversation-examples__quotes">
                    <p
                        className="conversation-examples__quotes-indv"
                        onClick={() => handleGPT(exampleOne)}
                    >
                        {exampleOne}
                    </p>
                    <p
                        className="conversation-examples__quotes-indv"
                        onClick={() => handleGPT(exampleTwo)}
                    >
                        {exampleTwo}
                    </p>
                    <p
                        className="conversation-examples__quotes-indv"
                        onClick={() => handleGPT(exampleThree)}
                    >
                        {exampleThree}
                    </p>
                    <p
                        className="conversation-examples__quotes-indv"
                        onClick={() => handleGPT(exampleFour)}
                    >
                        {exampleFour}
                    </p>
                    <p
                        className="conversation-examples__quotes-indv"
                        onClick={() => handleGPT(exampleFive)}
                    >
                        {exampleFive}
                    </p>
                </div>
            ) : null}
        </div>
    );
}
