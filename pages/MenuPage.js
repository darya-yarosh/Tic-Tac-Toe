import { Text } from "../js/pixi.mjs";

import { PAGES, STATE } from "../index.js";

import ButtonList from "../components/ButtonList.js";
import { ButtonData } from "../components/Button.js";

import { SCREEN_SIZE, TextData } from "../models/Interface.js";

export default function DrawMenu(currentStage) {
    currentStage.removeChildren(0);

    // Название игры
    drawHeader(currentStage);

    // Игровое меню
    drawInterface(currentStage);

    // Поля для выбора игроков
}

function drawHeader(currentStage) {
    // Текст заголовка
    const gameTitle = new Text(`Tic-Tac-Toe`, {
        fontFamily: TextData.textFontFamily,
        fontSize: 48,
        fill: TextData.textColorDefault,
        align: 'center',
    });
    gameTitle.x = SCREEN_SIZE.width / 2 - gameTitle.width / 2;
    gameTitle.y = SCREEN_SIZE.height / 6 - gameTitle.height / 2;
    currentStage.addChild(gameTitle);

    // Текст подзаголовка
    const gameSubtitle = new Text(`Play with a friend\non a single device`, {
        fontFamily: TextData.textFontFamily,
        fontSize: 32,
        fill: TextData.textColorDefault,
        align: 'center',
    });
    gameSubtitle.id = "gameSubtitle";
    gameSubtitle.x = SCREEN_SIZE.width / 2 - gameSubtitle.width / 2;
    gameSubtitle.y = SCREEN_SIZE.height / 4 - gameSubtitle.height / 2.5;
    currentStage.addChild(gameSubtitle);
}

function drawInterface(currentStage) {
    const gameSubtitleHeight = currentStage.getChildAt(currentStage.children.length-1).height;
    const gap = 125;
    const startPosition = SCREEN_SIZE.height / 4 + gameSubtitleHeight * 1.5;

    const buttonPositions = [
        {
            position: {
                x: SCREEN_SIZE.width / 2 - ButtonData.width / 2,
                y: startPosition + gap * 0
            },
            text: "Start",
            action: () => {
                STATE.currentPage = PAGES.game;
                STATE.currentPage.draw();
            },
        },
        {
            position: {
                x: SCREEN_SIZE.width / 2 - ButtonData.width / 2,
                y: startPosition + gap * 1
            },
            text: "Settings",
            action: () => { },
        },
        {
            position: {
                x: SCREEN_SIZE.width / 2 - ButtonData.width / 2,
                y: startPosition + gap * 2
            },
            text: "About",
            action: () => { },
        },
    ];
    const buttons = new ButtonList(buttonPositions);

    buttons.view.forEach(button => {
        currentStage.addChild(button.view)
    })
}