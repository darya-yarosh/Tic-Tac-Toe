import { Container, Sprite, Texture, Text } from '../js/pixi.mjs';

import { STATE } from '../index.js';

export const GridCellData = {
    width: 96,
    height: 96,
    textureDefault: 'assets/CellDefault.png',
    textureDown: 'assets/CellDown.png',
    textureOver: 'assets/CellOver.png',
    textFontFamily: 'Somerset Barnyard',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}

export default class GridCell {
    constructor(cellIndexes, positionX, positionY, action) {
        this._indexes = cellIndexes;

        this._view = new Container();
        this._view.eventMode = 'passive';

        this._cell = new Sprite(Texture.from(GridCellData.textureDefault));
        this._cell.interactive = true;
        this._cell.cursor = 'hover';
        this._cell.x = positionX;
        this._cell.y = positionY;
        this._cell.eventMode = 'static';
        this._cell
            .on('pointerdown', () => this.onCellDown(action))
            .on('pointerup', () => this.onCellUp())
            .on('pointerupoutside', () => this.onCellUp())
            .on('pointerover', () => this.onCellOver())
            .on('pointerout', () => this.onCellOut());

        this._symbol = new Text('', {
            fontFamily: GridCellData.textFontFamily,
            fontSize: 48,
            fill: GridCellData.textColorDefault,
            align: 'center',
        });
        this._symbol.eventMode = 'none';
        this._symbol.x = positionX + (GridCellData.width - this._symbol.width) / 2;
        this._symbol.y = positionY + (GridCellData.height - this._symbol.height) / 2;

        this._view.addChild(this._cell, this._symbol);
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

    onCellDown(action) {
        this._cell.isDown = true;
        this._cell.texture = Texture.from(GridCellData.textureDown);
        this._cell.alpha = 1;

        this._symbol.style.fill = GridCellData.textColorDown;

        if (this._symbol.text === "") {
            this._symbol.text = STATE.playerList[STATE.currentPlayerNum - 1].symbol;
    
            action(this.indexes);
        }
    }

    onCellUp() {
        this._cell.isDown = false;
        if (this._cell.isOver) {
            this._cell.texture = Texture.from(GridCellData.textureOver);
        }
        else {
            this._cell.texture = Texture.from(GridCellData.textureDefault);
        }

        this._symbol.style.fill = GridCellData.textColorDefault;
    }

    onCellOver() {
        this._cell.isOver = true;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = Texture.from(GridCellData.textureOver);

        this._symbol.style.fill = GridCellData.textColorOver;
    }

    onCellOut() {
        this._cell.isOver = false;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = Texture.from(GridCellData.textureDefault);

        this._symbol.style.fill = GridCellData.textColorDefault
    }
}