import { STATE } from "../index.js";

export const GAME_STATUSES = {
    inGame: 'inGame',
    ended: 'ended'
}

const GameWinCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
]

class Game {
    constructor() {
        this.status = GAME_STATUSES.inGame;
        this.step = 0;
        this.winner = null;
    }

    playerMove(map) {
        this.step += 1;
        if (this.step >= 5) {
            this.calculate(map)
        }
        if (this.step >= 9) {
            this.status = GAME_STATUSES.ended;
        }
    }

    calculate(map) {
        const [PlayerFirst, PlayerSecond] = STATE.playerList;
        const [PlayerFirstMap, PlayerSecondMap] =
            getSymbolsPositions(map, PlayerFirst.symbol, PlayerSecond.symbol);

        const [isPlayerFirstWin, isPlayerSecondWin] =
            checkPlayersCombinations(PlayerFirstMap, PlayerSecondMap)

        if (isPlayerFirstWin) {
            STATE.playerList[0].score += 1;
            this.winner = STATE.playerList[0];
            this.status = GAME_STATUSES.ended;
        } else if (isPlayerSecondWin) {
            STATE.playerList[1].score += 1;
            this.winner = STATE.playerList[1];
            this.status = GAME_STATUSES.ended;
        }
    }

    restart() {
        // STATE.currentPlayerNum = 1;
        this.status = GAME_STATUSES.inGame;
        this.step = 0;
        this.winner = null;
    }
}

export default Game;

function getSymbolsPositions(map, symbolFirst, symbolSecond) {
    const FirstMap = [];
    const SecondMap = [];

    map.forEach((row, indexX) => {
        row.forEach((column, indexY) => {
            switch (map[indexX][indexY]) {
                case null: {
                    break;
                }
                case symbolFirst: {
                    FirstMap.push([indexX, indexY])
                    break;
                }
                case symbolSecond: {
                    SecondMap.push([indexX, indexY])
                    break;
                }
                default: {
                    break;
                }
            }
        })
    })

    return [FirstMap, SecondMap]
}

function checkPlayersCombinations(combinationsFirst, combinationsSecond) {
    let isFirstPlayerWin = checkPlayerCombinations(combinationsFirst);
    let isSecondPlayerWin = checkPlayerCombinations(combinationsSecond);

    return [isFirstPlayerWin, isSecondPlayerWin];
}

function checkPlayerCombinations(playerCombinations) {
    let isWin = false;

    for (let i = 0; i < playerCombinations.length; i++) {
        const findedCombinations = GameWinCombinations.filter(combination => {
            const first = playerCombinations.find(playerCombination =>
                playerCombination.toString() === combination[0].toString()
            )
            const second = playerCombinations.find(playerCombination =>
                playerCombination.toString() === combination[1].toString()
            )
            const third = playerCombinations.find(playerCombination =>
                playerCombination.toString() === combination[2].toString()
            )

            return first && second && third;
        })

        isWin = findedCombinations.length > 0
            ? true
            : false;

        if (isWin) break;
    }

    return isWin;
}

