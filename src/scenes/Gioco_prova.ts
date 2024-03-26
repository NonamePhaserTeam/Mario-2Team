import { Callbacks, globalEval } from "jquery";
import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class Gioco_prova extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    platform: Phaser.Physics.Arcade.StaticGroup;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    playerSpeed = 500;
    animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [
        { key: "idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "move", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 }
    ];
    x_prova= 0
    y_prova= 0
    //background: capire quale namespace usare
    constructor() { super(SceneKeys.Game); }

    init() {
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, false);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, false);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, false);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, false);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        //this.add.image(gameSettings.gameWidth * 0.5, gameSettings.gameHeight, "tilemap").setScale(3);
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, this.game.canvas.width / 4, this.game.canvas.height * 10, true);
        this.physics.world.setBounds(gameSettings.gameWidth * 0.25, 0, this.game.canvas.width / 2, this.game.canvas.height * 10);
    }

    create() {
        this.cameras.main.setBackgroundColor('#3498db'); // Imposta lo sfondo blu
        this.platform = this.physics.add.staticGroup();

        const image = this.platform
            .create(gameSettings.gameWidth * 0.5, gameSettings.gameHeight * 10 - 50, TextureKeys.platform)
            .setScale(1.5);
        const body = image.body;

        body.updateFromGameObject();
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 10; i++) {
            const y = Phaser.Math.Between(gameSettings.gameHeight * 7, gameSettings.gameHeight * 10);
            const x = Phaser.Math.Between(gameSettings.gameWidth * 0.26, gameSettings.gameWidth * 0.74)

            if (this.x_prova*4 !=x && this.y_prova*4 !=y) {
                this.platforms.create(x, y, 'platform');
            }else i--
            this.x_prova = x;
            this.y_prova = y;
        }
        this.player = this.physics.add
            .sprite(
                gameSettings.gameWidth * 0.75,
                gameSettings.gameHeight * 10 - 70,
                TextureKeys.player
            )
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setDrag(0.2, 0.2)
            .setMaxVelocity(900, 900)
            .setGravity(0, 200)
            .setScale(0.5);

        this.camera.startFollow(this.player, true, 1, 1);
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.platforms);
    }
    update(time: number, delta: number): void {
        this.player.setVelocity(0);
        if (this.player.body.y <= gameSettings.gameHeight * 5) {
            this.player.setY(gameSettings.gameHeight * 10 - 70,)
        }
        if (this.A.isDown) {
            this.player.setFlipX(true);
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.D.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(this.playerSpeed);
        }
        if (this.W.isDown) {
            this.player.setVelocityY(-this.playerSpeed);
        } else if (this.S.isDown) {
            this.player.setVelocityY(this.playerSpeed);
        }
        if (Phaser.Input.Keyboard.JustDown(this.SPACE) && this.player.body.touching.down) {
            this.player.setVelocityY(-this.playerSpeed - 5000);
        }
    }
}
