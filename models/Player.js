export default class Player {
    constructor(name, symbol, symbolTint){
        this._id = crypto.randomUUID();
        this._name = name;
        this._score = 0;
        this._symbol = symbol;
        this._tint = symbolTint
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get score() {
        return this._score;
    }

    set score(newScore) {
        this._score = newScore;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(newSymbol) {
        this._symbol = newSymbol;
    }

    get tint() {
        return this._tint;
    }
}

export const PlayerSymbolIcons = [
    {
        id: crypto.randomUUID(),
        iconSrc: "Axolotl",
        iconAlt: "Axolotl icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Bunny-slippers",
        iconAlt: "Bunny slippers icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Capybara",
        iconAlt: "Capybara icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Goblin",
        iconAlt: "Goblin icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Hades-symbol",
        iconAlt: "Hades symbol icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Hedgehog",
        iconAlt: "Hedgehog icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Heraldic-sun",
        iconAlt: "Heraldic sun icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Hyena-head",
        iconAlt: "Hyena head icon",
    },
    {
        id: crypto.randomUUID(),
        iconSrc: "Paper-crane",
        iconAlt: "Paper crane icon",
    },
]