import { Container } from "../js/pixi.mjs";

import { STATE } from "../index.js";

import GridCell, { GridCellData } from "./GridCell.js";

import { swapCurrentPlayer } from "../pages/GamePage.js";

export default class Grid {
    constructor(positionX, positionY, action) {
        this._view = new Container();

        this._map = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
        this._mapSprite = [];

        for (let rowI = 0; rowI < 3; rowI++) {
            for (let cellI = 0; cellI < 3; cellI++) {
                const cellIndexes = [rowI, cellI];
                const cellPositionX = positionX + (GridCellData.width * cellI);
                const cellPositionY = positionY + (GridCellData.height * rowI);

                const cell = new GridCell(
                    cellIndexes,
                    cellPositionX,
                    cellPositionY,
                    (cellIndexes) => {
                        this.playerMove(cellIndexes)
                        action();
                    }
                )
                this._mapSprite.push(cell);
            }
        }
    }

    get map() {
        return this._map;
    }

    get view() {
        return this._mapSprite;
    }

    playerMove(cellIndexes) {
        const [row, column] = cellIndexes;
        this._map[row][column] = this._map[row][column] === null
            ? STATE.playerList[STATE.currentPlayerNum - 1].symbol
            : this._map[row][column];
        swapCurrentPlayer();
    }

    restartMap() {
        this._map = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
        this._mapSprite = this._mapSprite.map(cell => {
            cell.symbol.text = null;
            return cell;
        });
    }
}
