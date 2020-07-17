import Filter from './filter';

export default class NoFilter extends Filter {
  constructor() {
    super("none", "", () => { });
  }
}