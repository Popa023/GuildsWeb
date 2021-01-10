export class Item {
  id: number;
  itype: string;
  itier: number;
  iquality: number;
  irarity: number;
  idurability: number;

  constructor(id: number, iType: string, iTier: number, iQuality: number, iRarity: number, iDurability: number) {
    this.id = id;
    this.itype = iType;
    this.itier = iTier;
    this.iquality = iQuality;
    this.irarity = iRarity;
    this.idurability = iDurability;

  }
}
