import React, { useState } from 'react';
import HomePage from './HomePage';
import InstructionsPage from './InstructionsPage';
import WCSTGameComponent from './WCSTGameComponent';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState('');

  const goToInstructions = (name) => {
    setUserName(name);
    setPage(2);
  };

  const startGame = () => setPage(3);

  return (
    <div className="App">
      {page === 1 && <HomePage onNext={goToInstructions} />}
      {page === 2 && <InstructionsPage userName={userName} onNext={startGame} />}
      {page === 3 && <WCSTGameComponent />}
    </div>
  );
}

export default App;