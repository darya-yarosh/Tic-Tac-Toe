export const SCREEN_SIZE = {
    width: 
        window.outerWidth < window.innerWidth 
        ? window.outerWidth
        : window.innerWidth,
    height: 
        window.outerHeight < window.innerHeight 
        ? window.outerHeight
        : window.innerHeight,
    marginPercent: 10,
}

export const COLORS = {
    black: 0x000000,
    gray: 0xc2c2c2,
    red: 0xff0000,
}

export const TextData = {
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}