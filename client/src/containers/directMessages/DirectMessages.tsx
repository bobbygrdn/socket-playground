import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import './DirectMessages.css';
import profileImage from "../../assets/images/profile-image.png"
import { Connection } from '../../components/connection/Connection';

type Conversation = {
    name: string;
    id: number;
}

const users: Conversation[] = [{ name: 'Robert', id: 1 }, { name: 'Samantha', id: 2 }, { name: 'Carlos', id: 3 }, { name: 'Chan', id: 4 }];

export const DirectMessages: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <section id="direct-messages">
            <h2 style={{
                display: 'flex', fontSize: 'large', alignItems: 'center'
            }}>
                Direct Messages
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {users.map((user: Conversation) => (
                        <Connection key={user.id} profileImage={profileImage} user={user.name} userId={user.id} />
                    ))}
                </ul>
            )}
        </section>
    )
};
