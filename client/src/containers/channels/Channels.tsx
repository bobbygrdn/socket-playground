import './Channels.css';
import { useState } from 'react';
import { CollapseButton } from '../../components/collapseButton/CollapseButton';
import { Channel } from "../../components/channel/Channel";

type Channel = {
    name: string;
    id: number;
}

const channels: Channel[] = [{ name: 'general', id: 1 }, { name: 'random', id: 2 }, { name: 'react', id: 3 }, { name: 'redux', id: 4 }];

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
                    {channels.map((channel: Channel) => (
                        <Channel key={channel.name} channel={channel.name} channelId={channel.id} />
                    ))}
                </ul>
            )}
        </section>
    );
};