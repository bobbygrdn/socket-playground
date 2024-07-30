import './Channels.css';
import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';

const channels = ['general', 'random', 'react', 'redux']

export const Channels = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <section id="channels">
            <h2>
                Channels
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={setIsVisible}
                />
            </h2>
            {isVisible && (
                <ul>
                    {channels.map(channel => (
                        <li className="channel" key={channel}>
                            <span>#</span> {channel}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
};
