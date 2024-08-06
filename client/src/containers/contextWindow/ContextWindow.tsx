import { Outlet } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useEffect } from 'react';
import './ContextWindow.css';

let socket: Socket;
const ENDPOINT = 'http://localhost:5000';

export const ContextWindow: React.FC = (): JSX.Element => {

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on("connected", () => console.log("Server Connected"))
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <article id="contextWindow">
            <Outlet />
        </article>
    );
}
