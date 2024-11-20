import React, { useState } from 'react';
import './HomePage.css';

function HomePage({ onNext }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    // if (id?.match(/^\d{9}$/) && name?.match(/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/) && age >= 18 && age <= 99 && gender) {
    //     onNext(name);
    //   } else {
    //     setIsValid(false);
    //   }
      onNext(name);
    }

  return (
    <div className="amaranth-regular">

    <div className="home-page">
      <video autoPlay loop muted className="background-video">
        <source src='./homePage.mp4' type="video/mp4" />
      </video>
      
      <div className='WCSTTitle'>
        <h1>WCST Game</h1>
      </div>
      
      <h2>Sign up</h2>
      
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <input 
          type="text" 
          placeholder="ID" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
        />
        
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        
        <input 
          type="text" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        
        {!isValid && 
        <p className="error">
            Please ensure that:
            <ul>
            <li>Name should contain only English letters</li>
            <li>ID is exactly 9 numeric digits.</li>
            <li>Gender is selected.</li>
            <li>Age is valid.</li>
            </ul>
        </p>
        }

        
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
