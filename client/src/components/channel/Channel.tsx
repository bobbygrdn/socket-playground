interface ChannelProps {
    channel: string;
}

export const Channel: React.FC<ChannelProps> = ({ channel }) => {
    return (
        <li className="channel" key={channel}>
            <span>#</span> {channel}
        </li>
    )
}
