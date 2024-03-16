import { globalEval } from "jquery";
import Phaser, { Physics } from "phaser";

import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platform: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;

    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;

    constructor() {
        super(SceneKeys.Game);
    }

    init() {
        this.cameras.main.setBackgroundColor("#05d3f2");
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);

        this.camera = this.cameras.main;
        this.camera.setBounds(
            0,
            0,
            this.game.canvas.width / 4,
            this.game.canvas.height * 10
        );

        this.physics.world.setBounds(
            500,
            1,
            this.game.canvas.width / 2,
            this.game.canvas.height * 10
        );
    }

    create() {
        this.platform = this.physics.add.staticGroup()

        const image = this.platform.create(
            gameSettings.gameWidth * 0.5,
            gameSettings.gameHeight * 0.5 + 100,
            TextureKeys.Logo
        ).setScale(0.2)

        const body = image.body
        body.updateFromGameObject()

        this.player = this.physics.add
            .sprite(
                gameSettings.gameWidth * 0.5,
                gameSettings.gameHeight * 1,
                TextureKeys.player
            )
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setDrag(0.2, 0.2)
            .setMaxVelocity(900, 900)
            .setGravity(100, 700)
            .setScale(0.5);

        this.camera.startFollow(
            this.player,
            true,
            0.05,
            0.05
        );
    }

    update(time: number, delta: number): void {
        this.physics.add.collider(this.player, this.platform);
        //this.physics.add.collider(this.player, this.matter.world);
        this.physics.add.overlap(this.player, this.platform, () => {
            if (this.player.body.touching.up) {
                this.player.setVelocityY(-5000);
            } else if (this.player.body.touching.down) {
                this.player.setVelocityY(5000);
            } else if (this.player.body.touching.left) {
                this.player.setVelocityX(5000)
            } else if (this.player.body.touching.right) {
                this.player.setVelocityX(-5000);
            }
        });


        const speed = 500;

        this.player.setVelocity(0);

        if (this.A.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.D.isDown) {
            this.player.setVelocityX(speed);
        }
        if (this.S.isDown) {
            this.player.setVelocityY(speed);
        } else if (this.W.isDown) {
            this.player.setVelocityY(-speed + 200);
        }
    }
}
