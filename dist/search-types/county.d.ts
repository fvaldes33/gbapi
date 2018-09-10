import { SearchType } from './search-type';
declare class County extends SearchType {
    /**
     * zipcode endpoint
     */
    endpoint: string;
    /**
     * zipcode array
     */
    params: CountyParams;
    /**
     * constructor
     * @param codes
     */
    constructor(params: CountyParams);
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
interface CountyParams {
    county: any;
    state: string;
}
export { County, CountyParams };
