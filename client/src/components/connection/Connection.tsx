import { Link } from "react-router-dom";

interface ConnectionProps {
    profileImage: string;
    user: string;
    userId: string;
}

export const Connection: React.FC<ConnectionProps> = ({ profileImage, user, userId }) => {
    return (
        <li className="direct-message" key={user}>
            <Link to={`/home/conversations/${userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <figure style={{ display: 'flex', gap: '10px', padding: '5px 0' }}>
                    <img src={profileImage} alt={user} style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                    <figcaption style={{ display: 'flex', alignItems: 'center' }}>{user}</figcaption>
                </figure>
            </Link>
        </li>
    )
}
