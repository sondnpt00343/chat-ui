import { useEffect, useRef, useState } from "react";
import socketClient from "./utils/socketClient";

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatRef = useRef();

    useEffect(() => {
        // Scroll to bottom
        chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages.length]);

    useEffect(() => {
        const channel = socketClient.subscribe("k12");

        channel.bind("new-message", function (data) {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const handleChat = (e) => {
        e.preventDefault();

        fetch("http://192.168.2.110:3000/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setMessage("");
            });
    };

    return (
        <div className="chat-window">
            <ul className="chat-messages" ref={chatRef}>
                {messages.map((item, index) => (
                    <li key={index}>{item.message}</li>
                ))}
            </ul>
            <form className="chat-form" onSubmit={handleChat}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                    placeholder="Enter message..."
                ></textarea>
                <button className="chat-submit">Send</button>
            </form>
        </div>
    );
}

export default App;
