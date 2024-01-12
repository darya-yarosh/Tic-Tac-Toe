import { Container, Sprite, Texture, Text } from '../js/pixi.mjs';

// TODO: добавить передачу текстур кнопки в контейнер, но чтобы они в функциях применялись

export const ButtonData = {
    width: 226,
    height: 96,
    textureDefault: 'assets/ButtonDefault.png',
    textureDown: 'assets/ButtonDown.png',
    textureOver: 'assets/ButtonOver.png',
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}

export default class Button {
    constructor(positionX, positionY, text, action) {
        this._view = new Container();
        this._view.eventMode = 'passive';

        this._button = new Sprite(Texture.from(ButtonData.textureDefault));
        this._button.x = positionX;
        this._button.y = positionY;
        this._button.cursor = 'pointer';
        this._button.eventMode = 'static';
        this._button
            .on('pointerdown', () => this.onButtonDown())
            .on('pointerup', () => this.onButtonUp(action))
            .on('pointerupoutside', () => this.onButtonUpOutside())
            .on('pointerover', () => this.onButtonOver())
            .on('pointerout', () => this.onButtonOut());
        this._button.isDown = false;
        this._button.isOver = false;

        this._text = new Text(text, {
            fontFamily: ButtonData.textFontFamily,
            fontSize: 32,
            fill: ButtonData.textColorDefault,
            align: 'center',
        });
        this._text.eventMode = 'none';
        this._text.x = positionX + (ButtonData.width - this._text.width) / 2;
        this._text.y = positionY + (ButtonData.height - this._text.height) / 2;

        this._view.addChild(this._button, this._text);
    }

    get view() {
        return this._view;
    }

    onButtonDown() {
        this._button.texture = Texture.from(ButtonData.textureDown);
        this._button.isDown = true;

        this._text.style.fill = ButtonData.textColorDown;
    }

    onButtonUp(action) {
        this._button.texture = Texture.from(ButtonData.textureDefault);
        this._button.isDown = false;

        this._text.style.fill = ButtonData.textColorDefault;

        action();
    }

    onButtonUpOutside() {
        this._button.isDown = false;
        this._button.texture = Texture.from(ButtonData.textureDefault);

        this._text.style.fill = ButtonData.textColorDefault;
    }

    onButtonOver() {
        this._button.isOver = true;
        if (this._button.isDown) {
            return;
        }

        this._button.texture = Texture.from(ButtonData.textureOver);
        this._text.style.fill = ButtonData.textColorOver;
    }

    onButtonOut() {
        this._button.isOver = false;
        if (this._button.isDown) {
            return;
        }

        this._button.texture = Texture.from(ButtonData.textureDefault);

        this._text.style.fill = ButtonData.textColorDefault
    }
}
