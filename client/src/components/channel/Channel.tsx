import { Link } from "react-router-dom";

interface ChannelProps {
    channel: string;
    channelId: string;
}

export const Channel: React.FC<ChannelProps> = ({ channel, channelId }) => {
    return (
        <li className="channel" key={channel}>
            <Link to={`/groupConversations/${channelId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>#</span> {channel}
            </Link>
        </li>
    )
}
