interface ConnectionProps {
    profileImage: string;
    user: string;
}

export const Connection: React.FC<ConnectionProps> = ({ profileImage, user }) => {
    return (
        <li className="direct-message" key={user}>
            <figure style={{ display: 'flex', gap: '10px', padding: '5px 0' }}>
                <img src={profileImage} alt={user} style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                <figcaption style={{ display: 'flex', alignItems: 'center' }}>{user}</figcaption>
            </figure>
        </li>
    )
}
