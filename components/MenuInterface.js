import { Container, Text } from "../js/pixi.mjs"

import { PAGES, STATE } from "../index.js";

import { TextData } from "../models/Interface.js";

import ButtonList from "../components/general/ButtonList.js";

export const MenuInterfaceData = {
    gap: 24,
    subGap: 4,
    width: 229,
    height: 235
}

export default class MenuInterface {
    constructor(xPosition, yPosition) {
        this._view = new Container();
        this._view.x = xPosition;
        this._view.y = yPosition;

        // Text of game title
        this._gameTitle = new Text(`Tic-Tac-Toe`, {
            fontFamily: TextData.textFontFamily,
            fontSize: 48,
            fill: TextData.textColorDefault,
            align: 'center',
        });
        this._gameTitle.x = 0;
        //this._gameTitle.y = SCREEN_SIZE.height / 6 - gameTitle.height / 2;
        this._gameTitle.y = 0;
        this._view.addChild(this._gameTitle);
        
        // Text of game subtitle
        this._gameSubtitle = new Text(`Play with a friend\non a single device`, {
            fontFamily: TextData.textFontFamily,
            fontSize: 32,
            fill: TextData.textColorDefault,
            align: 'center',
        });
        this._gameSubtitle.id = "gameSubtitle";
        this._gameSubtitle.x = 0;
        this._gameSubtitle.y = this._gameTitle.y + this._gameTitle.height + MenuInterfaceData.subGap;
        this._view.addChild(this._gameSubtitle);

        const buttonPositions = [
            {
                position: {
                    x: 0,
                    y: this._gameSubtitle.y + this._gameSubtitle.height + MenuInterfaceData.gap * 1
                },
                text: "Start",
                action: () => {
                    STATE.currentPage = PAGES.game;
                    STATE.currentPage.draw();
                },
            },
        ];
        this._buttons = new ButtonList(buttonPositions);

        this._buttons.view.forEach(button => {
            this._view.addChild(button.view)
        })
    }

    get view() {
        return this._view;
    }
}