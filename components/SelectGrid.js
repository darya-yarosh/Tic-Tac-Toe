import { Container } from "../js/pixi.mjs";

import SelectGridCell, { SelectGridCellData } from "../components/SelectGridCell.js";

export default class SelectGrid {
    constructor(positionX, positionY, action, options, selectedOption, iconTint) {
        this._view = new Container();

        this._map = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
        this._mapSprite = [];

        for (let rowI = 0; rowI < 3; rowI++) {
            for (let cellI = 0; cellI < 3; cellI++) {
                const cellIndex = rowI * 3 + cellI;
                const cellIndexes = [rowI, cellI];
                const cellPositionX = positionX + (SelectGridCellData.width * cellI) + 4*cellI;
                const cellPositionY = positionY + (SelectGridCellData.height * rowI) + 4*rowI;

                const currentOption = options[cellIndex];
                const isSelected = currentOption.iconSrc === selectedOption

                const cell = new SelectGridCell(
                    cellIndexes,
                    cellPositionX,
                    cellPositionY,
                    isSelected,
                    currentOption.id,
                    currentOption.iconSrc,
                    iconTint,
                    () => {
                        action(currentOption.iconSrc);
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
}
