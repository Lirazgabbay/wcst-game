import React, { useState } from 'react';
import './fonts/amaranth.css';
import './InstructionsPage.css';
import soundIcon from './sound.svg';

function InstructionsPage({ userName, onNext }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakInstructions = () => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      
      // Get all the text content
      const instructionsText = `Hello, ${userName}! Thanks for participating in the experiment. 
        The game includes 64 cards, each with three variable characteristics: 
        Color: Red, Green, Blue, Yellow. 
        Shape: Triangle, Star, Circle, Square. 
        Quantity: The number of items on the card (1, 2, 3, or 4 items).
        Three target cards are displayed in a row.
        Each round, you'll receive one card, and you'll need to decide how to match this card to one of the three target cards.
        You can match your card to any target card based on one of the attributes you choose: color, shape, or quantity.
        There are no specific instructions or pre-defined rules on how to do this.
        After each match, you'll receive feedback on whether you were correct or incorrect.
        Based on this feedback, try to understand the rule for matching the cards you receive to the target cards.
        Once you think you understand the rule, choose the appropriate card without hesitation.
        Note: The matching rules may change over time.
        Your goal: To make as many correct matches as possible according to the rule set by the game.`;

      const speech = new SpeechSynthesisUtterance(instructionsText);
      speech.lang ='en-US';
      speech.rate = 1;
      speech.pitch = 1;
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="amaranth-regular">
      <div className="instructions-page">
        <div className="instructions-container">
          <div className="header-with-speaker">
            <h1>Hello, {userName}!</h1>
            <button 
              className={`speaker-button ${isSpeaking ? 'speaking' : ''}`} 
              onClick={speakInstructions}
              aria-label="Read instructions aloud"
            >
              {/* Speaker icon */}
              <img src={soundIcon} alt="Speaker" width="24" height="24" />
            </button>
          </div>
          <p>Thanks for participating in the experiment.</p>

          <h2>Game Rules:</h2>

          <h3 className="subtitle">The Cards:</h3>
          <p>The game includes 64 cards, each with three variable characteristics:</p>
          <ul>
            <li><span className="highlighted">Color:</span> Red, Green, Blue, Yellow.</li>
            <li><span className="highlighted">Shape:</span> Triangle, Star, Circle, Square.</li>
            <li><span className="highlighted">Quantity:</span> The number of items on the card (1, 2, 3, or 4 items).</li>
          </ul>

          <h3 className="subtitle">Gameplay:</h3>
          <ul>
            <li><span className="highlighted">Three target cards</span> are displayed in a row.</li>
            <li>Each round, you’ll receive <span className="highlighted">one card</span>, and you’ll need to decide how to match this card to one
            of the three target cards.</li>
            <li>You can <span className="highlighted">match your card</span> to any target card based on one of the attributes you choose:
            color, shape, or quantity.</li>
            <li>There are <span className="highlighted">no specific instructions or pre-defined rules</span> on how to do this.</li>
            <li>After each match, you’ll receive <span className="highlighted">feedback</span> on whether you were correct or incorrect (both an auditory signal and an on-screen message).</li>
            <li><span className="highlighted">Based on this feedback, try to understand the rule</span> for matching the cards you receive to the target cards.</li>
            <li>Once you think you understand the rule, choose the appropriate card without hesitation.</li>
          </ul>
          <p> <span className="highlighted"> Note:</span> The matching rules may change over time.</p>
          <p> <span className="highlighted"> Your goal:</span> To make as many correct matches as possible according to the rule set by the game.</p>
          <button onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default InstructionsPage;
