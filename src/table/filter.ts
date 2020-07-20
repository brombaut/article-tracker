export default class Filter {
  private _type: string;

  private _value: string;

  constructor(t: string, v: string) {
    this._type = t;
    this._value = v;
  }

  get type(): string {
    return this._type;
  }

  get value(): string {
    return this._value;
  }
}
