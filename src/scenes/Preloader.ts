import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        // preload di tutti gli asset

        //this.load.image(TextureKeys.Logo, 'assets/images/logo.jpg')

		this.load.image(
			TextureKeys.tilemap,
			'assets/images/tilemap.png'
		)

	    this.load.atlas(TextureKeys.player, 'assets/spritesheets/player.png', 'assets/spritesheets/player.json');
	    this.load.atlas(TextureKeys.platform, 'assets/images/platform.png', 'assets/images/platform.json');

    }

    create() {
        // creazione di tutte le animazioni

        this.scene.stop(SceneKeys.Preloader);
        this.scene.start(SceneKeys.Game);
		//this.scene.start(SceneKeys.Jumper)

    }
}
