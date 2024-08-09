import { useNavigate } from "react-router-dom";
import './NewConversationButton.css';

type NewConversationButtonProps = {
    isChannel: boolean
}

export const NewConversationButton: React.FC<NewConversationButtonProps> = ({ isChannel }): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/home/create-conversation?isChannel=${isChannel}`);
    };

    return (
        <button id="newConversationButton" onClick={handleClick}>+</button>
    )
}
