import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContextWindow } from "../contextWindow/ContextWindow";
import { Header } from '../header/Header';
import { Sidebar } from "../sidebar/Sidebar";
import { Conversation } from '../../components/conversation/Conversation';
import { GroupConversation } from '../../components/groupConversation/GroupConversation';
import { Settings } from '../../components/settings/Settings';
import './MainWindow.css';

export const MainWindow: React.FC = (): JSX.Element => (
    <Router>
        <Header />
        <Sidebar />
        <Routes>
            <Route path="/" element={<ContextWindow />}>
                <Route path="conversations/:conversationId" element={<Conversation />} />
                <Route path="groupConversations/:groupId" element={<GroupConversation />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    </Router>
);