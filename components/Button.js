import { Container, Sprite, Texture, Text } from '../js/pixi.mjs';

// TODO: добавить передачу текстур кнопки в контейнер, но чтобы они в функциях применялись

export const ButtonData = {
    width: 226,
    height: 96,
    textureDefault: 'assets/ButtonDefault.png',
    textureDown: 'assets/ButtonDown.png',
    textureOver: 'assets/ButtonOver.png',
    textFontFamily: 'Somerset Barnyard',
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
        this._button.eventMode = 'static';
        this._button
            .on('pointerdown', () => this.onButtonDown(action))
            .on('pointerup', () => this.onButtonUp())
            .on('pointerupoutside', () => this.onButtonUp())
            .on('pointerover', () => this.onButtonOver())
            .on('pointerout', () => this.onButtonOut());

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

    onButtonDown(action) {
        this._button.isDown = true;
        this._button.texture = Texture.from(ButtonData.textureDown);
        this._button.alpha = 1;

        this._text.style.fill = ButtonData.textColorDown;

        action();
    }

    onButtonUp() {
        this._button.isDown = false;
        if (this._button.isOver) {
            this._button.texture = Texture.from(ButtonData.textureOver);
        }
        else {
            this._button.texture = Texture.from(ButtonData.textureDefault);
        }

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
