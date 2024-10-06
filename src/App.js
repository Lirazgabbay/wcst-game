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
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isDealing, setIsDealing] = useState(false);
  const [dealtCards, setDealtCards] = useState([]);

  useEffect(() => {
    const initGame = async () => {
      const initialState = game.WCSTgame();
      setGameState(initialState);
      await dealCards();
    };

    initGame();
  }, [game]);

  const dealCards = async () => {
    setIsDealing(true);
    setDealtCards([]);

    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 200)); // Reduced delay for quicker animation
      setDealtCards(prev => [...prev, i]);
    }

    await new Promise(resolve => setTimeout(resolve, 200)); // Wait for the last card to finish dealing
    setIsDealing(false);
  };

  const handleCardSelection = async (selectedCard) => {
    if (!gameState.gameOver && !isDealing) {
      await game.handleUserSelection(selectedCard);
      const newState = game.WCSTgame();
      setGameState(newState);

      const feedback = game.checkCorrectness(selectedCard, gameState.userCard, gameState.category)
        ? 'Match!'
        : 'Mismatch';
      setFeedbackMessage(feedback);

      setTimeout(() => {
        setFeedbackMessage('');
      }, 2000);

      await dealCards(); // Deal new cards after selection
    }
  };

  const renderCard = (card, index, isUserCard = false) => {
    if (!card) return null;
    const isDealt = dealtCards.includes(index);
    const cardClass = isUserCard ? 'card user-card' : `card board-card ${isDealt ? 'dealt' : ''}`;
    return (
      <div
        className={cardClass}
        onClick={() => !isUserCard && !isDealing && handleCardSelection(card)}
      >
        <div className="card-content">
          {[...Array(card.number)].map((_, i) => (
            <div
              key={i}
              className={`shape ${card.shape}`}
              style={{ backgroundColor: card.color }}
            ></div>
          ))}
        </div>
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
          renderCard(gameState.userCard, null, true)
        ) : (
          <p>No user card available</p>
        )}

        <h2>Select the matching card:</h2>
        <div className={`board-cards ${isDealing ? 'dealing' : ''}`}>
          {gameState.boardCards && gameState.boardCards.length > 0 ? (
            gameState.boardCards.map((card, index) => renderCard(card, index))
          ) : (
            <p>No board cards available</p>
          )}
        </div>
      </div>

      <div className="feedback-message">
        <p>{feedbackMessage}</p>
      </div>
    </div>
  );
}

export default App;