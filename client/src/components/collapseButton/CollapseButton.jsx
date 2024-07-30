import { useState, useEffect } from 'react';
import './CollapseButton.css';

export const CollapseButton = ({ initialIsVisible = false, onToggle }) => {
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
        <button style={{ marginLeft: '2px' }} onClick={toggleVisibility}>
            {isVisible ? '<' : '>'}
        </button>
    );
};
