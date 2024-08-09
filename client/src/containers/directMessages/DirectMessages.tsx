import { useState, useContext } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { NewConversationButton } from '../../components/newConversationButton/NewConversationButton';
import './DirectMessages.css';
import profileImage from "../../assets/images/profile-image.png"
import { Connection } from '../../components/connection/Connection';
import { ChatContext } from '../../context/ChatContext';

type Chat = {
    chatName: string;
    _id: string;
}

export const DirectMessages: React.FC = (): JSX.Element => {

    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error('ContextWindow must be used within a ChatProvider');
    }

    const { chats } = chatContext;

    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <section id="direct-messages">
            <h2 style={{
                display: 'flex', fontSize: 'large', alignItems: 'center'
            }}>
                <NewConversationButton />
                Direct Messages
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {chats?.map((chat: Chat) => (
                        <Connection key={chat._id} profileImage={profileImage} user={chat.chatName} userId={chat._id} />
                    ))}
                </ul>
            )}
        </section>
    )
};
