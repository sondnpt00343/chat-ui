import PusherJS from "pusher-js";

const socketClient = new PusherJS("app1", {
    cluster: "",
    wsHost: "103.75.180.92",
    wsPort: 6001,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
});

export default socketClient;
