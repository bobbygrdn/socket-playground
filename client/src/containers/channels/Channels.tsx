import './Channels.css';
import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { Channel } from "../../components/channel/Channel";

const channels: string[] = ['general', 'random', 'react', 'redux'];

export const Channels = (): JSX.Element => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const handleToggle = (isVisible: boolean): void => setIsVisible(!isVisible);

    return (
        <section id="channels">
            <h2>
                Channels
                <CollapseButton
                    initialIsVisible={isVisible}
                    onToggle={handleToggle}
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