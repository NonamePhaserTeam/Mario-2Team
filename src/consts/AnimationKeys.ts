// inserire qui le animazioni sotto forma di chiave valore 
// per un utilizzo più veloce e ordinato nelle scene

namespace AnimationKeys {
    export enum Player {
		Idle = "player-idle", // fatto
		Walk = "player-run", //fatto
		Punch = "player-punch", //fatto
		Sword = "player-sword", //fatto
		Jump = "player-jump", //fatto
		Blow = "player-blow",
		Fionda = "player-sparo fionda",
        Walk_fionda = "player-fionda camminata",
        Walk_sword = "player-spada camminata",
        Walk_punch = "player-punch camminata",
        Death = "player-death",
        Ginocchio = "player-ginocchio",
        Dush = "plyaer-dush"
	}

	export enum Boss{
		idle = "bossIdle",
	}

	export enum SkeletonEnemy {
		Idle = "skeleton-idle",
		Walk = "skeleton-walk",
	}

	export enum Portale {
		Opening = "portale-opening",
		Idle = "portale-idle",
		Closiing = "portale-closing",
	}
}

export default AnimationKeys;
