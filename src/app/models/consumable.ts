export class Consumable {
  id: number;
  ctype: string;
  ctier: number;
  cquality: number;
  crarity: number;
  cquantity: number;

  constructor(id: number, cType: string, cTier: number, cQuality: number, cRarity: number, cQuantity: number) {
    this.id = id;
    this.ctype = cType;
    this.ctier = cTier;
    this.cquality = cQuality;
    this.crarity = cRarity;
    this.cquantity = cQuantity;

  }
}
