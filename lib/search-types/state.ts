class State {
  /**
   * zipcode endpoint
   */
  public endpoint: string = 'polygon/state?state=';

  /**
   * zipcode array
   */
  public params: any = [];

  /**
   * constructor
   * @param codes
   */
  constructor(states: any) {
    this.params = states;
  }

  /**
   *
   */
  public getUri() {
    return `${this.endpoint}${this.params.join(',')}`;
  }

  /**
   * add code
   * @param code
   */
  public addState(state: string) {
    if (!this.params.includes(state)) {
      this.params.push(state);
    }
  }

  /**
   * remove code
   * @param code
   */
  public removeState(state: string) {
    const index = this.params.indexOf(state);
    if (index > -1) {
      this.params.splice(index, 1);
    }
  }
}

export { State };
