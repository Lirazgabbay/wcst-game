class Card {
    constructor(color, shape, number) {
        this.color = color;
        this.shape = shape;
        this.number = number;
    }

    toString() {
        return `${this.number} ${this.color} ${this.shape}(s)`;
    }
}

export default Card;
