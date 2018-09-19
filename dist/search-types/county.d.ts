declare class County {
    /**
     * zipcode endpoint
     */
    endpoint: string;
    /**
     * zipcode array
     */
    params: ICountyParams;
    /**
     * constructor
     * @param codes
     */
    constructor(params: ICountyParams);
    /**
     *
     */
    getUri(): string;
    /**
     * add code
     * @param code
     */
    addCounty(county: string): void;
    /**
     * remove code
     * @param code
     */
    removeCode(county: string): void;
    /**
     *
     */
    addState(state: string): void;
}
interface ICountyParams {
    county: any;
    state: string;
}
export { County, ICountyParams };
