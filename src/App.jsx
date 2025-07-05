import { useEffect } from "react";
import socketClient from "./utils/socketClient";

function App() {
    useEffect(() => {
        const channel = socketClient.subscribe("k12");
        return () => {
            channel.unsubscribe();
        };
    }, []);

    return <h1>Chat UI</h1>;
}

export default App;
