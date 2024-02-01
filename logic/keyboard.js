export default class Keyboard {
    constructor(onPress, onRelease) {
        // English alphabet regex: /[a-zA-Z][a-zA-Z0-9]*/
        this._characters = [];
        for (let i = 33; i < 127; i++) {
            const char = String.fromCharCode(i);
            this._characters.push(char);

            const keyObject = keyboard(char);
            keyObject.press = () => {
                onPress(keyObject.value);
            };
            keyObject.release = () => { 
                onRelease();
            };
        }

        // Add backspace
        const char = "Backspace";
        this._characters.push("char");
        const keyObject = keyboard(char);
        keyObject.press = () => {
            onPress(keyObject.value);
        };
        keyObject.release = () => { };
    }
}

function keyboard(value) {
    const key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    
    //The `downHandler`
    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}