const WinWidth = window.innerWidth * window.devicePixelRatio;
const WinHeight = window.innerHeight * window.devicePixelRatio;

export let gameSettings: GameSettings = {
    gameWidth: WinWidth,
    gameHeight: WinHeight,
    bgColor: "#000000",
    gravity: {x: 0, y: 200},
    debug: true,
    zoom: 1
}
