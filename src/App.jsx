import { useEffect } from "react";
import socketClient from "./utils/socketClient";

function App() {
    useEffect(() => {
        const channel = socketClient.subscribe("k12");
        return () => {
            channel.unsubscribe();
        };
    }, []);

    return (
        <div className="chat-window">
            <ul className="chat-messages">
                <li className="me">Hello anh em!</li>
                <li>Hello lại 1!</li>
                <li>Hello lại 2!</li>
                <li>Hello lại 3!</li>
            </ul>
            <form className="chat-form">
                <textarea
                    className="chat-input"
                    placeholder="Enter message..."
                ></textarea>
                <button className="chat-submit">Send</button>
            </form>
        </div>
    );
}

export default App;
