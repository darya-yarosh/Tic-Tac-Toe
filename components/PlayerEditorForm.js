import { Container, Text, Texture } from "../js/pixi.mjs"

import { STATE } from "../index.js";

import { TextData } from "../models/Interface.js";
import { PlayerSymbolIcons } from "../models/Player.js";

import Input from "../components/general/Input.js";
import SelectGrid from "../components/SelectGrid.js";
import { SelectGridCellData } from "../components/SelectGridCell.js";


export const PlayerEditorData = {
    gap: 16,
    width: 288,
}

export default class PlayerEditor {
    constructor(xPosition, yPosition, player) {
        this._view = new Container();
        this._view.x = xPosition;
        this._view.y = yPosition;

        this._playerId = player.id;
        this._inputElement = new Input(
            0,
            0,
            "Name",
            "Enter name",
            player.name,
            (newName) => {
                player.name = newName
            }
        );
        this._view.addChild(this._inputElement.view)

        this._selectGridLabel = new Text(
            'Symbol',
            {
                fontFamily: TextData.textFontFamily,
                fontSize: 32,
                fill: TextData.textColorDefault,
                align: 'center',
            }
        )
        this._selectGridLabel.eventMode = 'none';
        this._selectGridLabel.x = 0;
        this._selectGridLabel.y = this._inputElement.view.y + this._inputElement.view.height + PlayerEditorData.gap;
        this._view.addChild(this._selectGridLabel);

        const selectedIcon = player.symbol;
        this._selectGridElement = new SelectGrid(
            0,
            0 + this._selectGridLabel.y + this._selectGridLabel.height + 4,
            (newSymbol) => this.playerChangeIcon(newSymbol),
            PlayerSymbolIcons,
            selectedIcon,
            player.tint,
        );
        this._selectGridElement.view.forEach(selectOption => {
            this._view.addChild(selectOption.view)
        })
    }

    get view() {
        return this._view;
    }

    playerChangeIcon(newSymbol) {
        const cellList = this._selectGridElement.view;
        const prevSelectedIconIndex = cellList.findIndex(cell => cell._isSelected === true);
        cellList[prevSelectedIconIndex].isSelected = false;
        cellList[prevSelectedIconIndex]._cell.texture = Texture.from(SelectGridCellData.textureDefault);
        
        
        const newSelectedIconIndex = cellList.findIndex(cell => {
            return cell._sprite.texture.textureCacheIds[1] === newSymbol
        });
        console.log(newSelectedIconIndex, newSymbol)
        cellList[newSelectedIconIndex].isSelected = true;

        const playerIndex = STATE.playerList
            .findIndex(player => player.id === this._playerId);
        STATE.playerList[playerIndex].symbol = newSymbol;
    }
}
