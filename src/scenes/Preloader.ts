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

    //this.load.image(TextureKeys.tilemap, 'assets/images/tilemap.png')

	    this.load.atlas(TextureKeys.Texture.player, 'assets/spritesheets/player/player.png', 'assets/spritesheets/player/player.json');
	    this.load.atlas(TextureKeys.Texture.platform, 'assets/images/platform.png', 'assets/images/platform.json');
	    this.load.atlas(TextureKeys.Texture.SkeletonEnemy, 'assets/spritesheets/skeleton/skeleton.png', 'assets/spritesheets/skeleton/skeleton.json');
		this.load.image("tiles", "/assets/tilesets/walls_rosso.png")
		this.load.tilemapTiledJSON("map", "assets/tilesets/mappa_1.json")
        this.load.atlas(TextureKeys.Texture.portale, 'assets/spritesheets/portal/portali.png', 'assets/spritesheets/portal/portali.json');
	    this.load.atlas(TextureKeys.Texture.fionda, 'assets/spritesheets/fionda.png', '../assets/spritesheets/fionda.json');
    }

	/* private LoadImages(): void {
		this.load.image(TextureKeys.Texture.Background, "images/background.png");
		this.load.image(TextureKeys.Texture.Platform, "images/background.png");
		// this.load.image(TextureKeys.Texture.Player, "images/Character/000.png");
		this.load.image(TextureKeys.Texture.Boss, "images/Character/0001.png");
		this.load.image(TextureKeys.Texture.Bomb, "images/bomb.png");
		this.load.image(BarKeys.Background, "images/background.png");
		this.load.image(BarKeys.HealthBar1, "images/vita1.png");
		this.load.image(BarKeys.HealthBar2, "images/vita2.png");
		this.load.image(BarKeys.HealthBar3, "images/vita3.png");
		this.load.image(BarKeys.ButtonDown, "images/buttondown.png");
		this.load.image(BarKeys.ButtomUp, "images/buttonup.png");
	  } */

    create() {
		// creazione di tutte le animazioni
		this.CreatePlayerAnims();
		this.CreateEnemiesAnims();
		this.CreateEntitiesAnims();

		this.scene.stop(SceneKeys.Preloader);
        // this.scene.start(SceneKeys.Game);
		this.scene.start(SceneKeys.Jumper)

    this.load.atlas(
      TextureKeys.Texture.Boss,
      "assets/spritesheets/boss.png",
      "../assets/spritesheets/boss.json"
    );
    this.load.atlas(
      TextureKeys.Texture.portale,
      "assets/spritesheets/portal/portali.png",
      "assets/spritesheets/portal/portali.json"
    );
    this.load.atlas(
      TextureKeys.Texture.fionda,
      "assets/spritesheets/fionda.png",
      "../assets/spritesheets/fionda.json"
    );
    this.load.image("mariano", "/assets/images/mariano.png");
  }

	CreatePlayerAnims() {
        this.anims.create({
            key: AnimationKeys.Player.Walk,
            frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
                start: 1,
                end: 8,
                zeroPad: 1,
                prefix: 'camminata',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

    this.scene.stop(SceneKeys.Preloader);
    // this.scene.start(SceneKeys.Game);
    this.scene.start(SceneKeys.Jumper);

	this.anims.create({
		key: AnimationKeys.Player.Jump,
		frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
			start: 4,
			end: 6,
			zeroPad: 1,
			prefix: 'jumpsprite',
			suffix: '.png'
		}),
		frameRate: 2,
		repeat: 0,
	});

	this.anims.create({
		key: AnimationKeys.Player.Punch,
		frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
			start: 2,
			end: 10,
			zeroPad: 1,
			prefix: 'fight',
			suffix: '.png'
		}),
		frameRate: 12,
		repeat: 0,
	});

    this.anims.create({
      key: AnimationKeys.Player.Jump,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 4,
        end: 6,
        zeroPad: 1,
        prefix: "jump",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: AnimationKeys.Player.Punch,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.player, {
        start: 1,
        end: 12,
        zeroPad: 1,
        prefix: "fight",
        suffix: ".png",
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: AnimationKeys.Player.fionda,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 2,
        end: 3,
        zeroPad: 1,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 12,
      repeat: 0,
    });

    this.anims.create({
      key: "loadfionda",
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 2,
        end: 2,
        zeroPad: 0,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "sparofionda",
      frames: this.anims.generateFrameNames(TextureKeys.Texture.fionda, {
        start: 3,
        end: 3,
        zeroPad: 0,
        prefix: "sparo fionda",
        suffix: ".png",
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  CreateEnemiesAnims() {
    this.anims.create({
      key: AnimationKeys.SkeletonEnemy.Idle,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.SkeletonEnemy, {
        start: 1,
        end: 4,
        zeroPad: 1,
        prefix: "skeleton-idle",
        suffix: ".png",
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.SkeletonEnemy.Walk,
      frames: this.anims.generateFrameNames(TextureKeys.Texture.SkeletonEnemy, {
        start: 1,
        end: 8,
        zeroPad: 1,
        prefix: "skeleton-walk",
        suffix: ".png",
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  CreateEntitiesAnims() {
    // this.anims.createFromAseprite(TextureKeys.portale);
    /* this.anims.create({
			key: AnimationKeys.Portale.Opening,
			frames: this.anims.generateFrameNames(TextureKeys.SkeletonEnemy, {
				start: 1,
				end: 8,
				zeroPad: 1,
				prefix: 'skeleton-walk',
				suffix: '.png',
			}),
			frameRate: 6,
			repeat: -1,
		}); */
  }
}
