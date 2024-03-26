import { globalEval } from 'jquery'
import Phaser from 'phaser'

import { gameSettings } from '../consts/GameSettings'
import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'

export default class Jumper extends Phaser.Scene
{
	private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	private _controls: Phaser.Cameras.Controls.FixedKeyControl;
	camera: Phaser.Cameras.Scene2D.Camera;
	private _platforms: Phaser.Physics.Arcade.Group;


	constructor()
	{
		super(SceneKeys.Game)
	}

    create()
    {
        // const image = this.add.image(gameSettings.gameWidth / 2, gameSettings.gameHeight / 2, TextureKeys.tilemap)
		this._platforms = this.physics.add.group({
			bounceX: 1,
			bounceY: 1,
			collideWorldBounds: true,
		})

		let platformX = 0;
		let platformY = 0;
		while (platformY = gameSettings.gameHeight) {
			platformX = Phaser.Math.Between(200, 500);
			platformY += Phaser.Math.Between(0, 100);
			const platform = this._platforms.create(platformX, platformY, TextureKeys.platform);
		}

		/* this._cursors = this.input.keyboard.createCursorKeys();
		this._controls = new Phaser.Cameras.Controls.FixedKeyControl({
			camera: this.camera,
			left: this._cursors.left,
			right: this._cursors.right,
			up: this._cursors.up,
			down: this._cursors.down,
			speed: 0.5
		}); */
		

	}

	update(time: number, delta: number) {
		// this._controls.update(delta);
		console.log(this.camera.x, this.camera.y);

	}

}