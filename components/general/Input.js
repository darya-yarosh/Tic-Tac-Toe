import { Container, Sprite, Texture, Text } from '../../js/pixi.mjs';

import Keyboard from '../../logic/keyboard.js';

export const InputData = {
    width: 226,
    height: 76,
    gap: 4,
    padding: 16,
    textureDefault: 'InputDefault',
    textureDown: 'InputDown',
    textureOver: 'InputOver',
    textFontFamily: 'TunnelFront',
    valueColorDefault: 'white',
    valueColorDown: '#636363',
    valueColorOver: '#636363',
    labelColorDefault: 'white',
    labelColorDown: '#636363',
    labelColorOver: '#636363',
}

export default class Input {
    constructor(positionX, positionY, label, placeholder, value, action) {
        this._view = new Container();
        this._view.eventMode = 'passive';
        this._view.y = positionY;
        this._view.x = positionX;

        this._label = new Text(label, {
            fontFamily: InputData.textFontFamily,
            fontSize: 32,
            fill: InputData.labelColorDefault,
            align: 'center',
        });
        this._label.eventMode = 'none';
        this._label.x = 0;
        this._label.y = 0;

        this._input = new Sprite(Texture.from(InputData.textureDefault));
        this._input.x = 0;
        this._input.y = 0 + InputData.gap + this._label.height;
        this._input.width = InputData.width;
        this._input.height = InputData.height;
        this._input.cursor = 'pointer';
        this._input.eventMode = 'static';
        //this._input.eventMode = 'dynamic';
        this._input
            .on('pointerdown', () => this.onDown())
            .on('pointerup', () => this.onUp(action))
            .on('pointerupoutside', () => this.onUpOutside())
            .on('pointerover', () => this.onOver())
            .on('pointerout', () => this.onOut());
        this._input.isDown = false;
        this._input.isOver = false;

        this._value = new Text(value, {
            fontFamily: InputData.textFontFamily,
            fontSize: 32,
            fill: InputData.valueColorDefault,
            align: 'center',
        });
        this._value.eventMode = 'none';
        this._value.x = 0 + InputData.padding;
        this._value.y = this._input.y + (InputData.height / 2) - this._value.height / 2;
        this._value.maxLength = 10;

        this._isActive = false;
        this._keyboard = new Keyboard(
            (key) => this.onKeyDown(key, action),
            () => { }
        )

        this._placeholder = placeholder;
        this._view.addChild(this._input, this._label, this._value);
    }

    get view() {
        return this._view;
    }

    get value() {
        return this._value.text;
    }

    onKeyDown(newText, action) {
        if (!this._isActive) {
            return;
        }
        else if (newText === "Backspace") {
            if (this._value.text === this._placeholder) {
                return;
            }

            this._value.text = this._value.text.slice(0, -1);
            action(this._value.text);
            if (this._value.text.length === 0) {
                this._value.text = this._placeholder;
                this._value.alpha = 0.5;
            }
            return;
        }
        else if (this._value.text === this._placeholder) {
            this._value.text = '';
            this._value.alpha = 1;
        }
        else if (this._value.text.length === this._value.maxLength) {
            return;
        }

        this._value.text = this._value.text + newText;
        action(this._value.text)
    }

    onDown() {
        this._input.texture = Texture.from(InputData.textureDown);
        this._input.isDown = true;

        this._value.style.fill = InputData.valueColorDown;
        this._isActive = true;
    }

    onUp(action) {
        action();

        this._input.texture = Texture.from(InputData.textureDown);
        this._input.isDown = false;

        this._value.style.fill = InputData.valueColorDefault;
    }

    onUpOutside() {
        this._input.isDown = false;
        this._input.texture = Texture.from(InputData.textureDefault);

        this._value.style.fill = InputData.valueColorDefault;
    }

    onOver() {
        this._input.isOver = true;
        if (this._input.isDown) {
            return;
        }

        this._input.texture = Texture.from(InputData.textureOver);
        this._value.style.fill = InputData.valueColorOver;
    }

    onOut() {
        this._input.isOver = false;
        if (this._input.isDown) {
            return;
        }

        this._input.texture = Texture.from(InputData.textureDefault);

        this._value.style.fill = InputData.valueColorDefault;
        this._isActive = false;
    }
}
