export default class Player {
    constructor(name, symbol){
        this._id = crypto.randomUUID();
        this._name = name;
        this._score = 0;
        this._symbol = symbol;
    }

    get name() {
        return this._name;
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
}