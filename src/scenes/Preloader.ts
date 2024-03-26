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

        this.load.image(
            TextureKeys.Logo, 
            'assets/images/logo.jpg'
        )

		this.load.image(
			TextureKeys.tilemap,
			'assets/images/tilemap.png'
		)

		this.load.image(
			TextureKeys.platform, 
			'assets/images/caveFloatingPlatform.png'
		)
    }

    create() {
        // creazione di tutte le animazioni

        this.scene.stop(SceneKeys.Preloader);
        this.scene.start(SceneKeys.Game);
    }
}
