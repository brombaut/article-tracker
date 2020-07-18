import FilterHandler from "./filterHandler";

export default class Column {
  private _title: string;

  private _key: string;

  private _filter: FilterHandler;

  private _classList: { [key: string]: boolean };

  constructor(t: string, k: string, f: FilterHandler, cl: { [key: string]: boolean }) {
    this._title = t;
    this._key = k;
    this._filter = f;
    this._classList = cl;
  }

  get title(): string {
    return this._title;
  }

  get key(): string {
    return this._key;
  }

  get filter(): FilterHandler {
    return this._filter;
  }

  get classList(): { [key: string]: boolean } {
    return this._classList;
  }
}
