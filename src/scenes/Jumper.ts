import Phaser, { Physics } from "phaser";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import { Player, Enemy } from "../game/components";
import AnimationKeys from "../consts/AnimationKeys";
import AlignGrid from "../utilities/alignGrid";

export default class Jumper extends Phaser.Scene {
  /* ---------- SCENA ---------- */
  player: Player;
  enemy: Enemy;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  camera: Phaser.Cameras.Scene2D.Camera;
  /* ---------- SCENA ---------- */

  /* ---------- MOVEMENT ---------- */
  W: Phaser.Input.Keyboard.Key; //climb up
  A: Phaser.Input.Keyboard.Key; // sinistra
  S: Phaser.Input.Keyboard.Key; // climb down
  D: Phaser.Input.Keyboard.Key; // destra
  SPACE: Phaser.Input.Keyboard.Key; // salta
  SHIFT: Phaser.Input.Keyboard.Key; //dasha
  /* ---------- MOVEMENT ---------- */

  /* ---------- ATTACK ---------- */
  ENTER: Phaser.Input.Keyboard.Key; //PUNCH
  X: Phaser.Input.Keyboard.Key; //PICCHIATA
  LEFT: Phaser.Input.Keyboard.Key; //FIONDA sinistra
  RIGHT: Phaser.Input.Keyboard.Key; //FIONDA destra
  UP: Phaser.Input.Keyboard.Key; //FIONDA sopra
  DOWN: Phaser.Input.Keyboard.Key;
  /* ---------- ATTACK ---------- */

	grid: AlignGrid

  worldBounds = {
    width: gameSettings.gameWidth * 4,
    height: gameSettings.gameHeight * 20,
  };

  y_piattaforme = gameSettings.gameHeight * 5 - 40;

  constructor() {
    super(SceneKeys.Jumper);
  }
  init() {
    this.W = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W,
      true,
      false
    );
    this.A = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A,
      true,
      false
    );
    this.S = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S,
      true,
      false
    );
    this.D = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D,
      true,
      false
    );
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
      true,
      false
    );
    this.SHIFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT,
      true,
      false
    );
    this.X = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X,
      true,
      false
    );
    this.ENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
      true,
      false
    );

    this.LEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
      true,
      false
    );
    this.UP = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP,
      true,
      false
    );
    this.RIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
      true,
      false
    );
    this.DOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
      true,
      false
    );

    this.camera = this.cameras.main;

    this.camera.setBounds(
      0,
      0,
      this.worldBounds.width,
      this.worldBounds.height,
      true
    );

    this.physics.world.setBounds(
      0,
      0,
      this.worldBounds.width,
      this.worldBounds.height
    );
  }

  create() {

	this.grid = new AlignGrid({
		scene: this,
		rows: 30,
		cols: 10,
		width: this.worldBounds.width,
		height: this.worldBounds.height,
	});

	this.grid.showNumbers();

    const map = this.make.tilemap({ key: "map" });

    //primo parametro è il nome che ha il tileset del software
    //secondo parametro è il layer che vogliamo utilizzare
    const tileset = map.addTilesetImage("mappa1", "tiles");

    const floor = map.createLayer("pavimento", tileset, 0, 0);
    const walls = map.createLayer("muro", tileset, 0, 0);
    const gay = map.createLayer("prova", tileset, 0, 0);
    // walls.setScale(4.5);
	this.grid.placeAtIndex(80, walls);
	this.grid.placeAtIndex(110, gay);
	this.grid.placeAtIndex(1, floor);
	walls.setScale(8, 6);
	gay.setScale(8	, 6);

    // belowLayer.rotation = Phaser.Math.DegToRad(180);

    // console.log(belowLayer.width);
    // const aboveLayer = map.createLayer("muro", tileset, 0, 0);

	// const portal = this.physics.add.sprite(0, 0, TextureKeys.Texture.portale);
	// portal.play(AnimationKeys.Portale.Opening, true);

    this.camera.setBackgroundColor(gameSettings.bgColor);
    this.platforms = this.physics.add.staticGroup();
    this.CreatePlatform(0.5, 3);

    this.y_piattaforme -= gameSettings.gameHeight / 1.3;

    for (let i = 0; i < 10; i++) {
      let k = Math.floor(Math.random() * (10 - 2 + 1)) + 1;
      switch (k) {
        case (2, 7): //piafforma centrale 2 mini mini piattaforme al lato
          this.CreatePlatform(0.29, 0.5); //left
          this.CreatePlatform(0.5, 1); //middle
          this.CreatePlatform(0.73, 0.5); //right
          this.y_piattaforme -= gameSettings.gameHeight / 1.3;
        /*  case 3, 8: // due piattaforme con spacco al centro
                    this.CreatePlatform(0.29, 1) //left 
                    this.CreatePlatform(0.73, 1) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 4, 9: // due piattaforme con spacco al a sinistra
                    this.CreatePlatform(0.29, 0.7) //left 
                    this.CreatePlatform(0.73, 2.3) //right 
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3
                case 5, 10: // due piattaforme con spacco al a destra
                    this.CreatePlatform(0.29, 2.3) //left 
                    this.CreatePlatform(0.73, 0.7) //right
                    this.y_piattaforme -= gameSettings.gameHeight / 1.3 */
      }
    }
    this.player = new Player(
      this,
      this.platforms.getChildren()[0].body.position.x + 100,
      this.platforms.getChildren()[0].body.position.y - 60,
      TextureKeys.Texture.player
    ).setScale(1.6);
    this.add.existing(this.player);

    this.enemy = new Enemy(
      this,
      0,
      0,
      100,
      50,
      TextureKeys.Texture.SkeletonEnemy,
      AnimationKeys.SkeletonEnemy
    );

    this.camera.startFollow(this.player, true, .5, .5);
	this.camera.setZoom(.7)
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.enemy, () => {
		setTimeout(() => {
			this.player.damage();
		}, 300);
	});
    this.physics.add.collider(this.platforms, this.enemy);
  }
  // todo wall climbing, wall sliding

  CreatePlatform(x_axis: number, scala_immagine: number) {
    this.platforms
      .create(gameSettings.gameWidth * x_axis, this.y_piattaforme, "platform")
      .setScale(scala_immagine, 1)
      .body.updateFromGameObject();
  }

  update(time: number, delta: number): void {
    this.player.HandleMovement(this.A, this.SHIFT, this.D);
    this.player.HandleAttack(
      this.ENTER,
      this.X,
      this.S,
      this.LEFT,
      this.RIGHT,
      this.UP,
      this.DOWN
    );
    this.enemy.OnGuard(this.player.getXY().x, this.player.getXY().y);


	if(this.W.isDown) {
		this.grid.placeAtIndex(283, this.player)
	}

    // /* CLIMBING STUFF */
    // if (this.touchingRight || this.touchingLeft) {
    //     this.player.setGravityY(gameSettings.gravity.y / 4)
    //     if (this.W.isDown) {
    //         this.player.setVelocityY(-this.playerSpeed/4);
    //     }
    //     else if (this.S.isDown) {
    //         this.player.setVelocityY(this.playerSpeed/4);
    //     }
    // }
    // /* CLIMBING STUFF */
  }
}
