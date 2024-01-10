import Button from './Button.js';

export default class ButtonList {
    constructor(buttonsInfo) {
        this._view = [];

        for (let i = 0; i < buttonsInfo.length; i++) {
            const button = new Button(
                buttonsInfo[i].position.x,
                buttonsInfo[i].position.y,
                buttonsInfo[i].text,
                buttonsInfo[i].action
            )
            this._view.push(button)
        }
    }

    get view() {
        return this._view;
    }
}