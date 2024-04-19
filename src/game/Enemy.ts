import Phaser from "phaser";
import AnimationKeys from "../consts/AnimationKeys";
import { gameSettings } from "../consts/GameSettings";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
interface EnemyClass {
    Idle: string,
    Walk: string,
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private chase_speed: number;
    private patrol_speed: number;
    private damage: number;
    private distanza_minima: number = 500;
    private nemico: EnemyClass

    constructor(
        scene: Phaser.Scene,
        xe: number,
        ye: number,
        chase_speed: number,
        patrol_speed: number,
        texture: string,
        EnemyClass: EnemyClass,
        frame?: string,
    ) {
        super(scene, xe, ye, texture, frame);
        scene.physics.world.enable(this);
        this.nemico = EnemyClass;
        this.chase_speed = chase_speed;
        this.patrol_speed = patrol_speed;
        // scene.add.existing(this);
        this.create();
    }

    preUpdate(t: number, dt: number) {
        // update per tutte le componenti dello sprite compless
        super.preUpdate(t, dt);
    }

    private create() {
        this.setScale(3);
        this.setCollideWorldBounds(true)
        this.anims.play(this.nemico.Idle);
        this.setCollisionCategory(3)
        this.setCollidesWith(3)
    }

    OnGuard(playerx: number, playery: number) {
        let distanzaX_dal_player: number = playerx - this.x
        let distanzaY_dal_player: number = playery - this.y
        //console.log(this.y, playery, distanzaY_dal_player)
        if (distanzaY_dal_player > -50) { // quando sta a terra
            if (distanzaX_dal_player < this.distanza_minima && distanzaX_dal_player > 10) { // follow right
                this.anims.play(this.nemico.Walk, true);
                this.setFlipX(false)
                this.setVelocityX(this.chase_speed);
                if(this.body.touching.right){ this.setVelocityX(0)}
            } else if (distanzaX_dal_player > -this.distanza_minima && distanzaX_dal_player < -10) { // follow left
                this.anims.play(this.nemico.Walk, true);
                this.setFlipX(true)
                this.setVelocityX(-this.chase_speed);
                if(this.body.touching.left){ this.setVelocityX(0)}

            } else if (distanzaX_dal_player > this.distanza_minima || distanzaX_dal_player < -this.distanza_minima) { // patrol da fare

                this.anims.play(this.nemico.Idle, true);
                this.setVelocityX(0);
                //console.log("fermo in patrol")
                //  this.anims.play(this.nemico.Walk, true);
                //  this.setFlipX(true)
                //  this.setVelocityX(-this.patrol_speed);
                //  console.log("patrol left")
                //  setTimeout(() => {
                //      this.anims.play(this.nemico.Walk, true);
                //      this.setFlipX(false)
                //      this.setVelocityX(this.patrol_speed);
                //      console.log("patrol right")
                //  }, 5000);
            } else {
                this.anims.play(this.nemico.Idle, true);
                this.setVelocityX(0);
                // console.log("fermo perche' non vedo")
            }
        } else if (
            distanzaY_dal_player > -100 &&
            (distanzaX_dal_player < this.distanza_minima - 300 && distanzaX_dal_player > 30) ||
            (distanzaX_dal_player > -this.distanza_minima + 300 && distanzaX_dal_player < -30)
        ) {
            this.anims.play(this.nemico.Idle, true); // qua ci dovrebbe stare l'animazione di attacco in aria del nemico
            this.setVelocityX(0);
            //console.log("fermo perche' sto attaccando sopra")
        }else{
            this.anims.play(this.nemico.Idle, true);
            this.setVelocityX(0);
            //console.log("fermo perche' non vedo e sta sopra")
        }
        // tutti queste costanti sono abbastanza assolute 
        // -100 e' se il player sta piu' o meno sullo stesso layer del player 
        // 0 se vedere dove deve andare (da mettere che se no va in una sola direzione)
        // 150 per vedere se sta volando (da cambiare ma relativamente perche' mi baso sulla grandezza del livello che mi ha fatto vedere mariano) 
        // -300 per vedere se sta volando dentro un'area ristresttra  
        // non ho fatto come l'esempio con la scatola e i cerchi perche' questa non e' una scena e non mi da come disponibile le cose che hanno fatto quelli sul lab
    }
}
