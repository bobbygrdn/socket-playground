import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import './DirectMessages.css';
import profileImage from "../../assets/images/profile-image.png"
import { Connection } from '../../components/connection/Connection';

const users: string[] = ['user1', 'user2', 'user3', 'user4'];

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
                    {users.map((user: string) => (
                        <Connection key={user} profileImage={profileImage} user={user} />
                    ))}
                </ul>
            )}
        </section>
    )
};
