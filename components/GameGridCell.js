import { Container, Sprite, Texture, Text } from '../js/pixi.mjs';

import { STATE } from '../index.js';

export const GameGridCellData = {
    width: 96,
    height: 96,
    iconWidth: 80,
    iconHeight: 80,
    textureDefault: 'CellDefault',
    textureDown: 'CellDown',
    textureOver: 'CellOver',
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}

export default class GameGridCell {
    constructor(cellIndexes, positionX, positionY, action) {
        this._indexes = cellIndexes;

        this._view = new Container();
        this._view.eventMode = 'passive';

        this._cell = new Sprite(Texture.from(GameGridCellData.textureDefault));
        this._cell.x = positionX;
        this._cell.y = positionY;
        this._cell.cursor = 'pointer';
        this._cell.eventMode = 'static';
        this._cell
            .on('pointerdown', () => this.onCellDown())
            .on('pointerup', () => this.onCellUp(action))
            .on('pointerupoutside', () => this.onCellUpOutside())
            .on('pointerover', () => this.onCellOver())
            .on('pointerout', () => this.onCellOut());
        this._cell.isDown = false;
        this._cell.isOver = false;

        this._sprite = new Sprite(null);
        this._sprite.x = this._cell.x + 1 / 2 * (
            GameGridCellData.width - GameGridCellData.iconWidth
        );
        this._sprite.y = this._cell.y + 1 / 2 * (
            GameGridCellData.height - GameGridCellData.iconHeight
        );
        this._sprite.width = GameGridCellData.iconWidth;
        this._sprite.height = GameGridCellData.iconHeight;

        this._symbol = new Text('', {
            fontFamily: GameGridCellData.textFontFamily,
            fontSize: 48,
            fill: GameGridCellData.textColorDefault,
            align: 'center',
        });
        this._symbol.eventMode = 'none';
        this._symbol.x = positionX + (GameGridCellData.width - this._symbol.width) / 2;
        this._symbol.y = positionY + (GameGridCellData.height - this._symbol.height) / 2;

        this._view.addChild(this._cell, this._symbol, this._sprite);
    }

    get view() {
        return this._view;
    }

    get indexes() {
        return this._indexes;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(newSymbol) {
        this._symbol.text = newSymbol;
    }

    get sprite() {
        return this._sprite;
    }

    set spriteSrc(newSpriteSrc) {
        this._sprite.texture = newSpriteSrc !== null
            ? Texture.from(newSpriteSrc)
            : null;
    }

    onCellDown() {
        this._cell.isDown = true;
        this._cell.texture = Texture.from(GameGridCellData.textureDown)

        this._symbol.style.fill = GameGridCellData.textColorDown;
    }

    onCellUp(action) {
        this._cell.isDown = false;
        this._cell.texture = Texture.from(GameGridCellData.textureDefault);

        this._symbol.style.fill = GameGridCellData.textColorDefault;

        if (this._symbol.text === "") {
            const movedPlayer = STATE.playerList[STATE.currentPlayerNum - 1];
            this._sprite.texture = Texture.from(movedPlayer.symbol)
            this._sprite.tint = movedPlayer.tint;
            action();
        }
    }

    onCellUpOutside() {
        this._cell.isDown = false;
        this._cell.texture = Texture.from(GameGridCellData.textureDefault);

        this._symbol.style.fill = GameGridCellData.textColorDefault;
    }

    onCellOver() {
        this._cell.isOver = true;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = Texture.from(GameGridCellData.textureOver);

        this._symbol.style.fill = GameGridCellData.textColorOver;
    }

    onCellOut() {
        this._cell.isOver = false;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = Texture.from(GameGridCellData.textureDefault);

        this._symbol.style.fill = GameGridCellData.textColorDefault
    }
}