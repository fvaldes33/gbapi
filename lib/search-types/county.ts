class County {
  /**
   * zipcode endpoint
   */
  public endpoint = 'polygon/county?county=';

  /**
   * zipcode array
   */
  public params: ICountyParams = {
    county: [],
    state: '',
  };

  /**
   * constructor
   * @param codes
   */
  constructor(params: ICountyParams) {
    this.params = {
      county: params.county,
      state: params.state,
    };
  }

  /**
   *
   */
  public getUri() {
    return `${this.endpoint}${this.params.county.join(',')}&state=${this.params.state}`;
  }

  /**
   * add code
   * @param code
   */
  public addCounty(county: string) {
    if (!this.params.county.includes(county)) {
      this.params.county.push(county);
    }
  }

  /**
   * remove code
   * @param code
   */
  public removeCode(county: string) {
    const index = this.params.county.indexOf(county);
    if (index > -1) {
      this.params.county.splice(index, 1);
    }
  }

  /**
   *
   */
  public addState(state: string) {
    this.params.state = state;
  }
}

interface ICountyParams {
  county: any;
  state: string;
}

export { County, ICountyParams };
