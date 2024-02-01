const SCREEN_ORIENTATION_TYPES = {
    lanscape: 'landskape',
    portrait: 'portrait'
}

export const SCREEN_SIZE = {
    width: 
        window.innerWidth < window.innerHeight
        ? window.innerHeight
        : window.innerWidth,
    height: 
        window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight,
    marginPercent: 10,
    orientationType: SCREEN_ORIENTATION_TYPES.lanscape
}

export const COLORS = {
    lightBlue: 0x6fa2cc,
    black: 0x290025,
    gray: 0xc2c2c2,
    red: 0xff0000,
}

export const TextData = {
    textFontFamily: 'TunnelFront',
    textColorDefault: 'white',
    textColorDown: '#636363',
    textColorOver: '#636363',
}