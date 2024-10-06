import React from 'react';
import './Card.css';  // Include your CSS here

const shapeImages = {
    star: './shapes-css/star.css',
    circle: './shapes-css/circle.css',
    square: './shapes-css/square.css',
    triangle: './shapes-css/triangle.css'
};

const Card = ({ color, shape, number }) => {
    // Dynamically create an array of shape images
    const shapes = Array.from({ length: number }, (_, index) => (
        <img
            key={index}
            src={shapeImages[shape]}
            alt={shape}
            className="shape-image"
            style={{ filter: `hue-rotate(${colorHue(color)}deg)` }}  // Change color using hue filter
        />
    ));

    return (
        <div className="card">
            <div className="card-content">
                {shapes}
            </div>
        </div>
    );
};

// Helper function to return a hue-rotate degree based on color
function colorHue(color) {
    switch (color) {
        case 'red': return 0;
        case 'blue': return 240;
        case 'green': return 120;
        case 'yellow': return 60;
        default: return 0;
    }
}

export default Card;
