import './Channels.css';
import { useState, useContext } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { Channel } from "../../components/channel/Channel";
import { ChatContext } from '../../context/ChatContext';

type GroupChat = {
    chatName: string;
    _id: string;
}

export const Channels = (): JSX.Element => {

    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error('ContextWindow must be used within a ChatProvider');
    }

    const { groupChats } = chatContext;

    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <section id="channels">
            <h2 style={{ display: 'flex' }}>
                Channels
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {groupChats.map((groupChat: GroupChat) => (
                        <Channel key={groupChat.chatName} channel={groupChat.chatName} channelId={groupChat._id} />
                    ))}
                </ul>
            )}
        </section>
    );
};