import React, { useState, useEffect } from 'react';
import WCSTGame from './WCSTGame';
import './App.css';
import './shapes-css/Card.css';
import './shapes-css/circle.css';
import './shapes-css/square.css';
import './shapes-css/star.css';
import './shapes-css/triangle.css';

function App() {
  const [game] = useState(() => new WCSTGame());
  const [gameState, setGameState] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // New state for feedback message

  useEffect(() => {
    const initGame = () => {
      const initialState = game.WCSTgame();
      setGameState(initialState);
      console.log('Initial game state:', initialState);
    };

    initGame();
  }, [game]);

  const handleCardSelection = async (selectedCard) => {
    if (!gameState.gameOver) {
      await game.handleUserSelection(selectedCard);
      const newState = game.WCSTgame();
      setGameState(newState);

      // Set feedback message based on success or mistake
      const feedback = game.checkCorrectness(selectedCard, gameState.userCard, gameState.category)
        ? 'Match!'
        : 'Mismatch';
      setFeedbackMessage(feedback);

      // Clear feedback message after 2 seconds
      setTimeout(() => {
        setFeedbackMessage('');
      }, 2000);

      console.log('Updated game state:', newState);
    }
  };

  const renderCard = (card) => {
    if (!card) return null;
    return (
      <div className="card-content">
        {[...Array(card.number)].map((_, index) => (
          <div
            key={index}
            className={`shape ${card.shape}`}
            style={{ backgroundColor: card.color }}
          ></div>
        ))}
      </div>
    );
  };

  if (!gameState) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>WCST Game</h1>
        <p>Trial: {gameState.trial}</p>
        <p>Current Category: {gameState.category}</p>
        <p>Success in Category: {gameState.successInCategory}</p>
        {gameState.gameOver && <p>Game Over!</p>}
      </header>

      <div className="game-board">
        <h2>Your Card:</h2>
        {gameState.userCard ? (
          <div className="card user-card">
            {renderCard(gameState.userCard)}
          </div>
        ) : (
          <p>No user card available</p>
        )}

        <h2>Select the matching card:</h2>
        <div className="board-cards" style={{ display: 'flex', justifyContent: 'center' }}>
          {gameState.boardCards && gameState.boardCards.length > 0 ? (
            gameState.boardCards.map((card, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleCardSelection(card)}
              >
                {renderCard(card)}
              </div>
            ))
          ) : (
            <p>No board cards available</p>
          )}
        </div>
      </div>

      {/* Feedback message below the cards */}
      <div className="feedback-message">
        <p>{feedbackMessage}</p>
      </div>
    </div>
  );
}

export default App;
