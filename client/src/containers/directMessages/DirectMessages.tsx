import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import './DirectMessages.css';
import profileImage from "../../assets/images/profile-image.png"

const users: string[] = ['user1', 'user2', 'user3', 'user4'];

export const DirectMessages: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return (
        <section id="direct-messages">
            <h2 style={{ display: 'flex' }}>
                Direct Messages
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {users.map((user: string) => (
                        <li className="direct-message" key={user}>
                            <figure style={{ display: 'flex', gap: '10px', padding: '5px 0' }}>
                                <img src={profileImage} alt={user} style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                                <figcaption style={{ display: 'flex', alignItems: 'center' }}>{user}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
};
