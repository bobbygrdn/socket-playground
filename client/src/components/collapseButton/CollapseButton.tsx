import { useState, useEffect } from 'react';
import './CollapseButton.css';

type CollapseButtonProps = {
    initialIsVisible?: boolean;
    onToggle?: (isVisible: boolean) => void;
};

export const CollapseButton: React.FC<CollapseButtonProps> = ({ initialIsVisible = false, onToggle }) => {
    const [isVisible, setIsVisible] = useState(initialIsVisible);

    useEffect(() => {
        setIsVisible(initialIsVisible);
    }, [initialIsVisible]);

    const toggleVisibility = () => {
        const newVisibility = !isVisible;
        setIsVisible(newVisibility);
        if (onToggle) {
            onToggle(newVisibility);
        }
    };

    return (
        <button id="collapseButton" onClick={toggleVisibility}>
            {isVisible ? '<' : '>'}
        </button>
    );
};

