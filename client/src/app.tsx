import { MainWindow } from './containers/mainWindow/MainWindow';
import { ChatProvider } from './context/ChatContext';

export const App: React.FC = (): JSX.Element => {
    return (
        <ChatProvider>
            <MainWindow />
        </ChatProvider>
    );
}
