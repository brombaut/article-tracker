export default class GaugeData {
  private _title: string;

  private _primaryValue: number;

  private _secondaryValue: number;

  constructor(t: string, p: number, s: number) {
    this._title = t;
    this._primaryValue = p;
    this._secondaryValue = s;
  }

  get title(): string {
    return this._title;
  }

  get primaryValue(): number {
    return this._primaryValue;
  }

  get secondaryValue(): number {
    return this._secondaryValue;
  }
}
