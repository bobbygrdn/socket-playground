import { useNavigate } from "react-router-dom";

export const NewConversationButton: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home/create-conversation");
    };

    return (
        <button id="newConversationButton" onClick={handleClick}>+</button>
    )
}
