export type Spell = {
    name: string;
    fp: number;
    slot: number;
    int: number;
    fth: number;
    arc: number;
}
export type Weapon = {
    type: string;
    name: string;
    physicalAttack: number;
    magicAttack: number;
    fireAttack: number;
    lightningAttack: number;
    holyAttack: number;
    requireStrength: number;
    requireDexterity: number;
    requireIntelligence: number;
    requireFaith: number;
    requireArcane: number;
}