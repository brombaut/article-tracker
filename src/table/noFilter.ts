import FilterHandler from "./filterHandler";

export default class NoFilter extends FilterHandler {
  constructor() {
    super("none", "", () => { });
  }
}
