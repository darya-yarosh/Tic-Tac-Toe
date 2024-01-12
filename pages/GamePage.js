import { BlurFilter, Container, Graphics, Text } from "../js/pixi.mjs";

import { STATE, PAGES } from "../index.js";

import Grid from "../components/Grid.js";
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
        const winContainer = new Container();

        // Фон уведомления
        winContainer.width = SCREEN_SIZE.width;
        winContainer.height = SCREEN_SIZE.height;
        winContainer.fill = "red";
        winContainer.color = "red";
        winContainer.backgroundColor = "red";

        const bg = new Graphics();
        bg.beginFill(0x444444, 0.7);
        bg.drawRect(0, 0, SCREEN_SIZE.width, SCREEN_SIZE.height);
        bg.endFill();
        bg.eventMode = 'static';
        winContainer.addChild(bg);
        // Blurs whatever is rendered by the container
        //currentStage.filters = [new BlurFilter()];
        // Only the contents within a circle at the center should be rendered onto the screen.
        // currentStage.mask = new Graphics()
        //     .beginFill("red")
        //     .drawRect(
        //         winContainer.width, 
        //         winContainer.height, 
        //         500,
        //         500
        //     )
        //     .endFill();

        // Текст уведомления
        const winAlertText = game.winner !== null
            ? `${game.winner.name} win!`
            : 'Draw!';
        const winAllert = new Text(winAlertText, {
            fontFamily: TextData.textFontFamily,
            fontSize: 48,
            fill: TextData.textColorDefault,
            align: 'center',
        });
        winAllert.x = SCREEN_SIZE.width / 2 - winAllert.width / 2;
        winAllert.y = SCREEN_SIZE.height / 5 - winAllert.height / 1.5;
        winContainer.addChild(winAllert);

        // Кнопка рестарта
        const restartButton = new Button(
            SCREEN_SIZE.width / 2 - ButtonData.width / 2,
            SCREEN_SIZE.height / 3 - ButtonData.height / 2,
            'Restart',
            () => {
                game.restart();
                currentMap.restartMap();
                currentStage.removeChildren(currentStage.children.length - 1);
            });
        winContainer.addChild(restartButton.view);

        // Добавление всей модалки на страницу
        currentStage.addChild(winContainer);
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

