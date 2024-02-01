import { Container, Sprite, Texture, Text } from '../js/pixi.mjs';

export const SelectGridCellData = {
    width: 92,
    height: 92,
    iconWidth: 76,
    iconHeight: 76,
    textureDefault: 'CellDefault',
    textureDown: 'CellDown',
    textureOver: 'CellOver',
    textureOverSelected: 'CellOverSelected',
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}

export default class SelectGridCell {
    constructor(cellIndexes, positionX, positionY, isSelected, iconId, iconSrc, iconTint, action) {
        this._indexes = cellIndexes;

        this._view = new Container();
        this._view.eventMode = 'passive';

        this._isSelected = isSelected;
        this._cell = new Sprite(this._isSelected
            ? Texture.from(SelectGridCellData.textureDown)
            : Texture.from(SelectGridCellData.textureDefault));
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

        this._sprite = new Sprite(Texture.from(iconSrc));
        this._sprite.tint = iconTint;
        this._sprite.x = this._cell.x + 1 / 2 * (
            SelectGridCellData.width - SelectGridCellData.iconWidth
        );
        this._sprite.y = this._cell.y + 1 / 2 * (
            SelectGridCellData.height - SelectGridCellData.iconHeight
        );
        this._sprite.width = SelectGridCellData.iconWidth;
        this._sprite.height = SelectGridCellData.iconHeight;

        this._symbol = new Text('', {
            fontFamily: SelectGridCellData.textFontFamily,
            fontSize: 48,
            fill: SelectGridCellData.textColorDefault,
            align: 'center',
        });
        this._symbol.eventMode = 'none';
        this._symbol.x = positionX + (SelectGridCellData.width - this._symbol.width) / 2;
        this._symbol.y = positionY + (SelectGridCellData.height - this._symbol.height) / 2;

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

    get isSelected() {
        return this._isSelected;
    }

    set isSelected(newValue) {
        this._isSelected = newValue;
    }

    onCellDown() {
        this._cell.isDown = true;
        this._cell.texture = Texture.from(SelectGridCellData.textureDown)

        this._symbol.style.fill = SelectGridCellData.textColorDown;
    }

    onCellUp(action) {
        action();

        this._cell.isDown = false;
        this._cell.texture = this._isSelected
            ? Texture.from(SelectGridCellData.textureOverSelected)
            : Texture.from(SelectGridCellData.textureOver)

        this._symbol.style.fill = SelectGridCellData.textColorDefault;
    }

    onCellUpOutside() {
        this._cell.isDown = false;
        this._cell.texture = this._isSelected
            ? Texture.from(SelectGridCellData.textureDown)
            : Texture.from(SelectGridCellData.textureDefault);

        this._symbol.style.fill = SelectGridCellData.textColorDefault;
    }

    onCellOver() {
        this._cell.isOver = true;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = this.isSelected 
            ? Texture.from(SelectGridCellData.textureOverSelected)
            : Texture.from(SelectGridCellData.textureOver);

        this._symbol.style.fill = SelectGridCellData.textColorOver;
    }

    onCellOut() {
        this._cell.isOver = false;
        if (this._cell.isDown) {
            return;
        }

        this._cell.texture = this._isSelected
            ? Texture.from(SelectGridCellData.textureDown)
            : Texture.from(SelectGridCellData.textureDefault);

        this._symbol.style.fill = SelectGridCellData.textColorDefault
    }
}