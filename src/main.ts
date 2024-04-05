import "phaser";

import Jumper from "./scenes/Jumper";
import Preloader from "./scenes/Preloader";

import { gameSettings } from "./consts/GameSettings";
import Gioco_prova from "./scenes/Gioco_prova";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: gameSettings.bgColor,
	width: gameSettings.gameWidth,
	height: gameSettings.gameHeight,
    pixelArt: true,
	zoom: gameSettings.zoom,
    parent: "my-game",
    physics: {
        default: "arcade",
        arcade: {
            gravity: gameSettings.gravity,
            debug: gameSettings.debug,
        },
    },

    scene: [
        Preloader,
        //Jumper,
        Gioco_prova,
    ],
};

export default new Phaser.Game(config);
