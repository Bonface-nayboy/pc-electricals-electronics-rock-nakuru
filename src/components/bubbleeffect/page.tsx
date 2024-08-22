"use client";
import React, { useEffect } from 'react';


const BubbleEffect: React.FC = () => {
    useEffect(() => {
        const handleStarsIncreased = () => {
            const bubbles = document.createElement('div');
            bubbles.className = 'bubbles';
            document.body.appendChild(bubbles);

            setTimeout(() => {
                document.body.removeChild(bubbles);
            }, 3000); // Adjust duration as needed
        };

        window.addEventListener('stars-increased', handleStarsIncreased);

        return () => {
            window.removeEventListener('stars-increased', handleStarsIncreased);
        };
    }, []);

    return null;
};

export default BubbleEffect;
