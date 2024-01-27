import { BlurFilter, Container, Graphics, Text } from "../js/pixi.mjs";

import { STATE, PAGES } from "../index.js";

import Grid from "../components/Grid.js";
import AlertForm from "../components/AlertForm.js";
import { GridCellData } from "../components/GridCell.js";
import Button, { ButtonData } from "../components/Button.js";

import Game, { GAME_STATUSES } from "../models/Game.js";
import { SCREEN_SIZE, TextData } from "../models/Interface.js";

export function swapCurrentPlayer() {
    STATE.currentPlayerNum =
        STATE.currentPlayerNum === 1
            ? 2
            : 1;
}

export default function DrawGame(currentStage) {
    currentStage.removeChildren(0);

    // Старт игры
    const game = new Game();

    // Функция окончания игры
    function endGame(currentMap) {
        // Уведомление об окончании 
        const winAlertText = game.winner !== null
            ? `${game.winner.name} win!`
            : 'Draw!';
        const alertForm = new AlertForm(winAlertText, 'Reset', () => {
            game.restart();
            currentMap.restartMap();
            currentStage.removeChildren(currentStage.children.length - 1);
        })
        currentStage.addChild(alertForm.view);
    }

    // Рейтинговая строка двух игроков

    // Поле для игры
    const currentMap = new Grid(
        SCREEN_SIZE.width / 2 - GridCellData.width * 1.5,
        200,
        () => {
            // Отслеживание на выигрышные комбинации
            game.playerMove(currentMap.map);
            // Если игра окончена, запуск функции конца игры
            if (game.status === GAME_STATUSES.ended) {
                endGame(currentMap)
            }
        }
    )

    // Добавление сетки на экран
    currentMap.view.forEach(child => {
        currentStage.addChild(child.view);
    })

    // Кнопка возврата в меню
    const returnButton = new Button(
        (SCREEN_SIZE.width - ButtonData.width) / 2,
        SCREEN_SIZE.height - ButtonData.height * 2,
        'Return',
        () => {
            STATE.currentPage = PAGES.menu;
            STATE.currentPage.draw();
        });
    currentStage.addChild(returnButton.view);
}

