import { Container, Graphics, Text } from "../js/pixi.mjs"

import Button, { ButtonData } from "../components/Button.js";

import { SCREEN_SIZE, TextData } from "../models/Interface.js";

export default class AlertForm {
    constructor(message, buttonText, buttonAction) {
        this._view = new Container();
        this._view.width = SCREEN_SIZE.width;
        this._view.height = SCREEN_SIZE.height;

        // Фон уведомления
        this._bg = new Graphics();
        this._bg.beginFill(0x444444, 0.7);
        this._bg.drawRect(0, 0, SCREEN_SIZE.width, SCREEN_SIZE.height);
        this._bg.endFill();
        this._bg.eventMode = 'static';
        this._view.addChild(this._bg)
        // // Размывает все, что отображается контейнером
        // this._view.filters = [new BlurFilter()];
        // // На экран должно выводиться только содержимое внутри прямоугольника в центре со скругленными краями.
        // this._view.mask = new Graphics()
        //     .beginFill("red")
        //     .drawRoundedRect(
        //         SCREEN_SIZE.width / 2 - ButtonData.width,
        //         ButtonData.height,
        //         ButtonData.width * 2,
        //         ButtonData.height * 3,
        //         20
        //     )
        //     .endFill();

        // Текст уведомления
        this._message = new Text(message, {
            fontFamily: TextData.textFontFamily,
            fontSize: 48,
            fill: TextData.textColorDefault,
            align: 'center',
        });
        this._message.eventMode = 'none';
        this._message.x = SCREEN_SIZE.width / 2 - this._message.width / 2;
        this._message.y = SCREEN_SIZE.height / 5 - this._message.height / 1.5;
        this._view.addChild(this._message)

        // Кнопка формы уведомления
        this._button = new Button(
            SCREEN_SIZE.width / 2 - ButtonData.width / 2,
            SCREEN_SIZE.height / 3 - ButtonData.height / 2,
            buttonText,
            () => {
                buttonAction()
            });

        this._view.addChild(this._button.view);
    }

    get view() {
        return this._view;
    }
}