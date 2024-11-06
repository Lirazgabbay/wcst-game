import DeckCards from './deck_cards';
import CategoryManager from './CategoryManager';

class WCSTGame {
    constructor() {
        this.deck = new DeckCards().getDeck();
        this.userCard = null;
        this.boardCards = [];
        this.maxTrials = 128;
        this.curTrial = 0;
        this.categoryManager = new CategoryManager();
        this.InitBoard(); // Initialize the board immediately in the constructor
    }

    InitBoard() {
        this.userCard = this.generateUserCard();
        this.boardCards = this.generateBoardCards(this.userCard);
    }

    // Helper to get a random card from the deck
    // WCSTGame.js (update to ensure deck is generated before card)
    generateUserCard() {
        if (this.deck.length === 0) {
            console.error('Deck is empty. Cannot generate user card.');
            this.deck = new DeckCards().getDeck(); // Regenerate deck if empty
        }
        const randomIndex = Math.floor(Math.random() * this.deck.length);
        const randomCard = this.deck[randomIndex];
        return randomCard;
    }

    // Generate 3 board cards that match one property each
    generateBoardCards(userCard) {
        const possibleCards = this.deck.filter(card => card !== userCard); // Exclude the user card

        const colorGroup = possibleCards.filter(card => card.color === userCard.color && card.shape !== userCard.shape && card.number !== userCard.number);
        const shapeGroup = possibleCards.filter(card => card.shape === userCard.shape && card.color !== userCard.color && card.number !== userCard.number);
        const numberGroup = possibleCards.filter(card => card.number === userCard.number && card.color !== userCard.color && card.shape !== userCard.shape);

        // Helper function to choose random cards from a filtered group
        const getRandomCardFromGroup = (group) => {
            const randomIndex = Math.floor(Math.random() * group.length);
            return group[randomIndex];
        };

        const colorMatch = getRandomCardFromGroup(colorGroup);
        const shapeMatch = getRandomCardFromGroup(shapeGroup);
        const numberMatch = getRandomCardFromGroup(numberGroup);


        const result = [numberMatch, colorMatch, shapeMatch];

        // Shuffle a given array using Fisher–Yates shuffle Algorithm
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    checkCorrectness(selectedCard, userCard, currentCategory) {
        switch (currentCategory) {
            case 'color':
                return selectedCard.color === userCard.color;
            case 'shape':
                return selectedCard.shape === userCard.shape;
            case 'number':
                return selectedCard.number === userCard.number;
            default:
                return false;
        }
    }

    // Update the game based on user selection and proceed to the next iteration
    handleUserSelection(selectedCard) {
        let correctAudio = new Audio('./sounds/correct-positive-notification.wav');
        let wrongAudio = new Audio('./sounds/incorrect1.wav');
        // Set the volume for both sounds (values range from 0.0 to 1.0)
        correctAudio.volume = 0.2; // Adjust volume as needed (0.0 to 1.0)
        wrongAudio.volume = 1; // Adjust volume to the same level

        this.curTrial++;

        const currentCategory = this.categoryManager.getCurrentCategory();
        // Check correctness
        const isCorrect = this.checkCorrectness(selectedCard, this.userCard, currentCategory);
        if (isCorrect) {
            correctAudio.play();
            this.categoryManager.setBySuccess();
        } else {
            wrongAudio.play();
            this.categoryManager.setByMistake();
        }
        this.InitBoard();
    }


    WCSTgame() {
        // This method should now just return the initial state
        return {
            userCard: this.userCard,
            boardCards: this.boardCards,
            trial: this.curTrial,
            category: this.categoryManager.getCurrentCategory(),
            successInCategory: this.categoryManager.getCurrentSuccessInCategory()
        };
    }

    feedback() {
        //to do:
        console.log("Feedback to be implemented.");
    }

    // Check if the game is over based on score or max trials
    isGameOver() {
        return (
            this.categoryManager.getCategoryCount() >= this.categoryManager.getMaxCategories() &&
            this.categoryManager.getCurrentSuccessInCategory() === this.categoryManager.getMaxSuccessInCategory()
        ) || this.curTrial > this.maxTrials;
    }

    // Getters for game state
    getUserCard() {
        return this.userCard;
    }

    getBoardCards() {
        return this.boardCards;
    }

    getTrialCount() {
        return this.curTrial;
    }

    getSuccessInCategory() {
        return this.categoryManager.getCurrentSuccessInCategory();
    }

    getCurrentCategory() {
        return this.categoryManager.getCurrentCategory();
    }
}

export default WCSTGame;
