import Card from './Card'; // Import the Card class

class DeckCards {
    constructor() {
        this.deck = [];
        this.colors = ["blue", "green", "yellow", "red"];
        this.shapes = ["star", "square", "circle", "triangle"];
        this.numbers = [1, 2, 3, 4];

        this.generateDeck();
    }

    generateDeck() {
        for (let color of this.colors) {
            for (let shape of this.shapes) {
                for (let number of this.numbers) {
                    this.deck.push(new Card(color, shape, number));
                }
            }
        }
    }

    getDeck() {
        return this.deck;
    }


}

export default DeckCards;
