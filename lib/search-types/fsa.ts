class Fsa {
  /**
   * zipcode endpoint
   */
  public endpoint: string = 'polygon/fsa?fsa=';

  /**
   * zipcode array
   */
  public params: any = [];

  /**
   * constructor
   * @param codes
   */
  constructor(codes: any) {
    this.params = codes;
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
  public addCode(code: number) {
    if (!this.params.includes(code)) {
      this.params.push(code);
    }
  }

  /**
   * remove code
   * @param code
   */
  public removeCode(code: number) {
    const index = this.params.indexOf(code);
    if (index > -1) {
      this.params.splice(index, 1);
    }
  }
}

export { Fsa };
