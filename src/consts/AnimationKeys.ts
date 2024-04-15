// inserire qui le animazioni sotto forma di chiave valore 
// per un utilizzo più veloce e ordinato nelle scene

namespace AnimationKeys {
    export enum Player {
		Idle = "player-idle",
		Walk = "player-run",
		Punch = "player-punch",
		Sword = "player-sword",
		Jump = "player-jump",
		Blow = "player-blow",
		fionda = "player-fionda",
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
