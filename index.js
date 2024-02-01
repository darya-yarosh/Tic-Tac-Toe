import { Application, Assets } from './js/pixi.mjs';

import Player, { PlayerSymbolIcons } from "./models/Player.js";
import { COLORS, SCREEN_SIZE } from './models/Interface.js';

import DrawMenu from './pages/MenuPage.js';
import DrawGame from './pages/GamePage.js';

import assetsMap from './js/assetsMap.js';

const app = new Application({
    width: SCREEN_SIZE.width,
    height: SCREEN_SIZE.height,
    backgroundColor: COLORS.lightBlue,
    view: document.getElementById("canvas"),
    antialias: true,
    autoResize: true,
    transparent: true,
});

export const PAGES = {
    menu: {
        name: "Menu",
        draw: () => DrawMenu(app.stage),
    },
    game: {
        name: "Game",
        draw: () => DrawGame(app.stage),
    }
}

export const STATE = {
    currentPage: PAGES.menu,
    playerList: [
        new Player("Player 1", PlayerSymbolIcons[0].iconSrc, "0x6568ca"),
        new Player("Player 2", PlayerSymbolIcons[1].iconSrc, "0xf94c4c"),
    ],
    currentPlayerNum: 1,
}

// Loading assets
async function loadAssets() {
    // Adding bundles
    Assets.addBundle(
        'sprites',
        assetsMap.sprites.reduce(
            (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue.name]: currentValue.url
            }), {}
        )
    )
    Assets.addBundle(
        'fonts',
        assetsMap.fonts.reduce(
            (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue.name]: currentValue.url
            }), {}
        )
    );

    const isLoadedSprites = await Assets.loadBundle('sprites');
    const isLoadedFonts = await Assets.loadBundle('fonts');

    return isLoadedSprites && isLoadedFonts;
}

const RunApp = () => {
    STATE.currentPage.draw();
}

// Start the game
loadAssets().then(() => {
    RunApp();
})