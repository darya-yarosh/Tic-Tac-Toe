import { Container } from "../js/pixi.mjs";

import GameGridCell, { GameGridCellData } from "../components/GameGridCell.js";

export default class GameGrid {
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
                const cellPositionX = positionX + (GameGridCellData.width * cellI);
                const cellPositionY = positionY + (GameGridCellData.height * rowI);

                const cell = new GameGridCell(
                    cellIndexes,
                    cellPositionX,
                    cellPositionY,
                    () => {
                        action(cellIndexes);
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

    restartMap() {
        this._map = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
        this._mapSprite = this._mapSprite.map(cell => {
            cell.spriteSrc = null;
            return cell;
        });
    }
}
