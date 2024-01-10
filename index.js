import { Container, autoDetectRenderer } from './js/pixi.mjs';

import Player from "./models/Player.js";
import { SCREEN_SIZE } from './models/Interface.js';

import DrawMenu from './pages/MenuPage.js';
import DrawGame from './pages/GamePage.js';

var renderer = autoDetectRenderer({
    width: SCREEN_SIZE.width,
    height: SCREEN_SIZE.height,
    backgroundColor: 0x000000
});
document.body.appendChild(renderer.view);

var stage = new Container();
stage.height = SCREEN_SIZE.height;
stage.width = SCREEN_SIZE.width;
stage.interactive = true;

export const PAGES = {
    menu: {
        name: "Menu",
        draw: () => DrawMenu(stage),
    },
    game: {
        name: "Game",
        draw: () => DrawGame(stage),
    }
}

export const STATE = {
    currentPage: PAGES.menu,
    playerList: [
        new Player("Player 1", "X"),
        new Player("Player 2", "O"),
    ],
    currentPlayerNum: 1,
}

function RunApp() {
    STATE.currentPage.draw();
    update();
}

RunApp()

function update() {
    requestAnimationFrame(update);
    renderer.render(stage);
};