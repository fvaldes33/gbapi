declare class County {
    /**
     * zipcode endpoint
     */
    endpoint: string;
    /**
     * zipcode array
     */
    params: ICountyParams[];
    /**
     * constructor
     * @param codes
     */
    constructor(params: ICountyParams[]);
    /**
     *
     */
    getUri(): string;
    /**
     * add code
     * @param code
     */
    addCounty(county: ICountyParams): void;
    /**
     * remove code
     * @param code
     */
    removeCounty(county: ICountyParams): void;
}
interface ICountyParams {
    county: any;
    state: string;
}
export { County, ICountyParams };
