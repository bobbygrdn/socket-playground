import './Channels.css';
import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { Channel } from "../../components/channel/Channel";

const channels: string[] = ['general', 'random', 'react', 'redux'];

export const Channels = (): JSX.Element => {
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
                    {channels.map((channel: string) => (
                        <Channel key={channel} channel={channel} />
                    ))}
                </ul>
            )}
        </section>
    );
};