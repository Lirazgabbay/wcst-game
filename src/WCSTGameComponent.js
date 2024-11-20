// Liraz and Noa 
import React, { useState, useEffect } from 'react';
import WCSTGame from './WCSTGame';
import './WCSTGameComponent.css';
import './App.js';
import './shapes-css/Card.css';
import './shapes-css/circle.css';
import './shapes-css/square.css';
import './shapes-css/star.css';
import './shapes-css/triangle.css';
import './fonts/amaranth.css';

function WCSTGameComponent({ onExit, onStartOver }) {
  const [game] = useState(() => new WCSTGame());
  const [gameState, setGameState] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isDealing, setIsDealing] = useState(false); //a boolean object that represent if the dealing process is running
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
    
    // Small delay to ensure the cards reset to starting position
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Show all three cards at once
    setDealtCards([0, 1, 2]);
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDealing(false);
  };

  const handleCardSelection = async (selectedCard) => {
    if (!gameState.gameOver && !isDealing) {
      // User selects card and we process the selection
      const feedback = game.checkCorrectness(selectedCard, gameState.userCard, gameState.category)
        ? 'Match!'
        : 'Mismatch';

      // Wait 200 millisecond before showing feedback
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Show feedback
      setFeedbackMessage(feedback);
      
      // Keep feedback visible for 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear feedback and start new round
      setFeedbackMessage('');

      // the interval between the end of the feedback and the start of the next round is 500 miliseconds
      await new Promise(resolve => setTimeout(resolve, 500));

      //continue to the next round
      await game.handleUserSelection(selectedCard);
      const newState = game.WCSTgame();
      setGameState(newState);
      await dealCards();
    }
  };

  const renderCard = (card, index, isUserCard = false) => {
    if (!card) return null;
    const isDealt = dealtCards.includes(index);
    const cardClass = isUserCard ? 'card user-card' : `card board-card ${isDealt ? 'dealt' : ''}`;
    return (
      <div
        className={cardClass}
        //!isDealing: Prevents the user from selecting a card while the cards are still being dealt.
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

  const handleExit = () => {
    const confirmExit = window.confirm('Are you sure you want to exit the game?');
    if (confirmExit) {
      onExit();
    }
  };

  const handleStartOver = () => {
      const confirmStartOver = window.confirm('Are you sure you want to start over?');
      if (confirmStartOver) {
        onStartOver();
      }
  };

  if (!gameState) return <div>Loading...</div>;
  //do not forget to delete the Current Category and Success in Category
  return (
    <div className="amaranth-regular">
      <div className="WCSTGameComponent">
        <div className="game-board">
          <header className="WCSTGameComponent-header">
            <h1>WCST Game</h1>
            <p>Trial: {gameState.trial}</p>
            {/* <p>Current Category: {gameState.category}</p>
        <p>Success in Category: {gameState.successInCategory}</p> */}
            <div className="button-container">
              <button onClick={handleExit}>Exit</button>
              <button onClick={handleStartOver}>Start Over</button>
            </div>
            {gameState.gameOver && <p>Game Over!</p>}
          </header>

          <div class="center-element">
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
            <div className={`feedback-message ${feedbackMessage === "Match!" ? 'Match' : 'Mismatch'}`}>
              <p>{feedbackMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WCSTGameComponent;