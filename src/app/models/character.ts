import {Item} from './item';
import {Consumable} from './consumable';

export class Character {
  id: number;
  cweaponskill: number;
  carmourskill: number;
  chealth: number;
  cstamina: number;
  caction: number;
  ccriticalcooldown: number;
  cbleedcooldown: number;
  cweapon: Item;
  carmour: Item;
  cpotions: Consumable;

  constructor(id: number, cWeaponSkill: number, cArmourSkill: number, cHealth: number, cStamina: number,
              cAction: number, cCriticalCoolDown: number, cBleedCoolDown: number, cWeapon: Item,
              cArmour: Item, cPotion: Consumable) {
    this.id = id;
    this.cweaponskill = cWeaponSkill;
    this.carmourskill = cArmourSkill;
    this.chealth = cHealth;
    this.cstamina = cStamina;
    this.caction = cAction;
    this.ccriticalcooldown = cCriticalCoolDown;
    this.cbleedcooldown = cBleedCoolDown;
    this.cweapon = cWeapon;
    this.carmour = cArmour;
    this.cpotions = cPotion;

  }
}
