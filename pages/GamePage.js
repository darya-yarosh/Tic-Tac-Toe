import { STATE, PAGES } from "../index.js";

import GameGrid from "../components/GameGrid.js";
import AlertForm from "../components/general/AlertForm.js";
import { GameGridCellData } from "../components/GameGridCell.js";
import Button, { ButtonData } from "../components/general/Button.js";

import { SCREEN_SIZE } from "../models/Interface.js";
import Game, { GAME_STATUSES } from "../models/Game.js";

export function swapCurrentPlayer() {
    STATE.currentPlayerNum =
        STATE.currentPlayerNum === 1
            ? 2
            : 1;
}

export default function DrawGame(currentStage) {
    currentStage.removeChildren(0);

    // Start game
    const game = new Game();

    // A function to complete the game.
    function endGame(currentMap) {
        // End alert
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

    // TODO: The rating line of two players

    // The playing field
    const currentMap = new GameGrid(
        SCREEN_SIZE.width / 2 - GameGridCellData.width * 1.5,
        200,
        (cellIndexes) => {
            // Tracking for winning combinations
            game.playerMove(currentMap.map, cellIndexes);
            // If the game is over, start the end game function
            if (game.status === GAME_STATUSES.ended) {
                endGame(currentMap)
            }
        }
    )

    // Adding a grid to the screen
    currentMap.view.forEach(child => {
        currentStage.addChild(child.view);
    })

    // The return button to the menu
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

