class County {
  /**
   * zipcode endpoint
   */
  public endpoint = 'polygon/county?county=';

  /**
   * zipcode array
   */
  public params: ICountyParams[] = [
    {
      county: '',
      state: '',
    },
  ];

  /**
   * constructor
   * @param codes
   */
  constructor(params: ICountyParams[]) {
    this.params = params;
  }

  /**
   *
   */
  public getUri() {
    const queryString = this.params.map((param: ICountyParams) => {
      return `${param.county}|${param.state}`;
    });
    return `${this.endpoint}${queryString.join(',')}`;
  }

  /**
   * add code
   * @param code
   */
  public addCounty(county: ICountyParams) {
    if (!this.params.includes(county)) {
      this.params.push(county);
    }
  }

  /**
   * remove code
   * @param code
   */
  public removeCounty(county: ICountyParams) {
    const index = this.params.indexOf(county);
    if (index > -1) {
      this.params.splice(index, 1);
    }
  }
}

interface ICountyParams {
  county: any;
  state: string;
}

export { County, ICountyParams };
