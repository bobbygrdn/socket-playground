import { Outlet } from 'react-router-dom';
import './ContextWindow.css';

export const ContextWindow: React.FC = (): JSX.Element => {
    return (
        <article id="contextWindow">
            <Outlet />
        </article>
    );
}
