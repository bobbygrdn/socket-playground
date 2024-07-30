import { Channels } from '../channels/Channels';
import { DirectMessages } from '../directMessages/DirectMessages';
import './Sidebar.css';

export const Sidebar: React.FC = (): JSX.Element => {
    return (
        <aside className='sidebar'>
            <Channels />
            <DirectMessages />
        </aside>
    );
};
