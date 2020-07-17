import Filter from './filter';

export default class Column {
  private _title: string;
  private _key: string;
  private _filter: Filter;
  private _classList: { [key: string]: boolean };

  constructor(t: string, k: string, f: Filter, cl: { [key: string]: boolean }) {
    this._title = t;
    this._key = k;
    this._filter = f;
    this._classList = cl;
  }

  get title() {
    return this._title;
  }

  get key() {
    return this._key;
  }

  get filter() {
    return this._filter;
  }

  get classList() {
    return this._classList;
  }


}