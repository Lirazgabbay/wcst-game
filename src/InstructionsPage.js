import React from 'react';
import './fonts/amaranth.css';
import './InstructionsPage.css';

function InstructionsPage({ userName, onNext }) {
  return (
    <div className="amaranth-regular">
    <div className="instructions-page">
      <div className="instructions-container">
        <h1>Hello, {userName}!</h1>
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
