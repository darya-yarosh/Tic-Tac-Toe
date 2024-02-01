import { Container } from "../js/pixi.mjs";

import { STATE } from "../index.js";

import { SCREEN_SIZE } from "../models/Interface.js";

import PlayerEditor, { PlayerEditorData } from "../components/PlayerEditorForm.js";
import MenuInterface, { MenuInterfaceData } from "../components/MenuInterface.js";

export default function DrawMenu(currentStage) {
    currentStage.removeChildren(0);

    const GAP = 24;
    const menuContainer = new Container();

    const firstPlayerPosition = {
        x: 0,
        y: SCREEN_SIZE.height/6,
    };
    const menuInterfacePosition = {
        x: PlayerEditorData.width + GAP,
        y: SCREEN_SIZE.height / 4,
    };
    const secondPlayerPosition = {
        x: menuInterfacePosition.x + MenuInterfaceData.width + GAP,
        y: SCREEN_SIZE.height/6
    };

    // Game menu
    drawMenuInterface(menuContainer, menuInterfacePosition)

    // The form of changing the data of the first player
    drawPlayerEditor(menuContainer, STATE.playerList[0], firstPlayerPosition);

    // The form of changing the data of the second player
    drawPlayerEditor(menuContainer, STATE.playerList[1], secondPlayerPosition);

    menuContainer.x = SCREEN_SIZE.width /2 - menuContainer.width/2; // до 900px в ширину
    currentStage.addChild(menuContainer)
    
}

function drawMenuInterface(currentStage, position) {
    const menuInterface = new MenuInterface(
        position.x,
        position.y
    )
    currentStage.addChild(menuInterface.view)
}

function drawPlayerEditor(currentStage, player, position) {
    const playerEditorForm = new PlayerEditor(
        position.x,
        position.y,
        player,
    )
    currentStage.addChild(playerEditorForm.view)
}