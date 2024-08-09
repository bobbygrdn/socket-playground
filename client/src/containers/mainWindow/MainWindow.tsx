import { Routes, Route } from 'react-router-dom';
import { ContextWindow } from "../contextWindow/ContextWindow";
import { Header } from '../header/Header';
import { Sidebar } from "../sidebar/Sidebar";
import { Conversation } from '../../components/conversation/Conversation';
import { CreateConversation } from '../../components/createConversation/CreateConversation';
import { Settings } from '../../components/settings/Settings';
import './MainWindow.css';
import { ChatProvider } from '../../context/ChatContext';

export const MainWindow: React.FC = (): JSX.Element => (
    <ChatProvider>
        <Header />
        <Sidebar />
        <Routes>
            <Route path="/" element={<ContextWindow />}>
                <Route path="conversations/:conversationId" element={<Conversation />} />
                <Route path="create-conversation" element={<CreateConversation />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    </ChatProvider>
);