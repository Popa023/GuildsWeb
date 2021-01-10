import {Character} from './character';
import {Warehouse} from './warehouse';

export class User {
  id: string;
  uname: string;
  uemail: string;
  ukingdom: string;
  ukingdomFavor: number;
  uvictories: number;
  uwarehouse: Warehouse;
  ucharacter: Character;

  constructor(id: string, uName: string, uEmail: string, uKingdom: string,
              uKingdomFavor: number, uVictories: number, uWarehouse: Warehouse, uCharacter: Character) {
    this.id = id;
    this.uname = uName;
    this.uemail = uEmail;
    this.ukingdom = uKingdom;
    this.ukingdomFavor = uKingdomFavor;
    this.uvictories = uVictories;
    this.uwarehouse = uWarehouse;
    this.ucharacter = uCharacter;

  }
}
