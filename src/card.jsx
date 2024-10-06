import React from 'react';
// import './Card.css';

const Card = ({ color, shape, number }) => {
    // Create a number of shape elements based on the 'number' prop
    const shapes = Array.from({ length: number }, (_, index) => (
        <div key={index} className={`shape ${shape}`} style={{ backgroundColor: color }}></div>
    ));

    // TODO: learn the meaning of the names
    return (
        <div className="card">
            <div className="card-content">
                {shapes}
            </div>
        </div>
    );
};

export default Card;
