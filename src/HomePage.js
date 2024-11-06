import React, { useState } from 'react';

function HomePage({ onNext }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    if (name && id.match(/^\d+$/)) {
      onNext(name); // Pass name to the next page
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="home-page">
      <video autoPlay loop muted className="background-video">
        <source src="your-video.mp4" type="video/mp4" />
      </video>
      <h1>WCST Game</h1>
      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      {!isValid && <p className="error">Please enter a valid name and numeric ID.</p>}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default HomePage;