export default class Filter {
  private _filterType: string;
  private _placeholder: string;
  public onchange: (val: string) => void;

  constructor(filterType: string, placeholder: string, onchange: (val: string) => void) {
    this._filterType = filterType;
    this._placeholder = placeholder;
    this.onchange = onchange;
  }

  get filterType() {
    return this._filterType;
  }

  get placeholder() {
    return this._placeholder;
  }
}