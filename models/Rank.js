export default class Rank {
    constructor() {
        this._table = []
    }

    get table() {
        this.sortTable();
        return this._table;
    }

    sortTable() {
        this._table = this._table.sort();
    }

    addPlayer(player) {
        this._table.push(player)
    }
}