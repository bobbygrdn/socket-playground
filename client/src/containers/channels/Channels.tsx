import './Channels.css';
import { useState, useContext } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { NewConversationButton } from '../../components/newConversationButton/NewConversationButton';
import { Channel } from "../../components/channel/Channel";
import { ChatContext } from '../../context/ChatContext';

type Channel = {
    chatName: string;
    _id: string;
}

export const Channels: React.FC = (): JSX.Element => {

    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error('ContextWindow must be used within a ChatProvider');
    }

    const { channels } = chatContext;

    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <section id="channels">
            <h2 style={{ display: 'flex' }}>
                <NewConversationButton />
                Channels
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {channels?.map((channel: Channel) => (
                        <Channel key={channel.chatName} channel={channel.chatName} channelId={channel._id} />
                    ))}
                </ul>
            )}
        </section>
    );
};