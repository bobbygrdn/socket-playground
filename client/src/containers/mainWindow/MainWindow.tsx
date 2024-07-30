import { ContextWindow } from "../contextWindow/ContextWindow";
import { Header } from '../header/Header';
import { Sidebar } from "../sidebar/Sidebar";
import './MainWindow.css';

export const MainWindow: React.FC = (): JSX.Element => (
    <>
        <Header />
        <Sidebar />
        <ContextWindow />
    </>
);