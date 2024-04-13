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
	}

	export enum Boss{
		idle = "bossIdle",
	}
}

export default AnimationKeys;
