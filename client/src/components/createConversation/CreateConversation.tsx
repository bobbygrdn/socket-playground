import React from 'react';
import { useLocation } from 'react-router-dom';
import './CreateConversation.css';

export const CreateConversation: React.FC = (): JSX.Element => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isChannel = queryParams.get('isChannel') === 'true';

    // TODO: Fix this to use the conversationServiceMethod
    const handleChannelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const channelName = formData.get('channelName');
        console.log('Creating channel with name:', channelName);
        // Add your channel creation logic here
    };

    // TODO: Fix this to use the conversationServiceMethod
    const handleDirectMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userName = formData.get('userName');
        console.log('Creating direct message with user:', userName);
        // Add your direct message creation logic here
    };

    // TODO: Update forms to have a search feature to look up users for direct messages
    return (
        <section>
            {isChannel ? (
                <form className="create-conversation-form" onSubmit={handleChannelSubmit}>
                    <h2 className="create-conversation-subtitle">Create Channel</h2>
                    <label className="create-conversation-label">
                        Channel Name:
                        <input className="create-conversation-input" type="text" name="channelName" />
                    </label>
                    <button className="create-conversation-button" type="submit">Create Channel</button>
                </form>
            ) : (
                <form className="create-conversation-form" onSubmit={handleDirectMessageSubmit}>
                    <h2 className="create-conversation-subtitle">Create Direct Message</h2>
                    <label className="create-conversation-label">
                        User Name:
                        <input className="create-conversation-input" type="text" name="userName" />
                    </label>
                    <button className="create-conversation-button" type="submit">Create Direct Message</button>
                </form>
            )}
        </section>
    );
};