class County {

    /**
     * zipcode endpoint
     */
    endpoint = 'polygon/county?county=';

    /**
     * zipcode array
     */
    params: CountyParams = {
        county: [],
        state: ''
    };

    /**
     * constructor
     * @param codes 
     */
    constructor(params: CountyParams) {
        this.params = {
            county: params.county,
            state: params.state
        };
    }

    /**
     * 
     */
    getUri() {
        return `${this.endpoint}${this.params.county.join(',')}&state=${this.params.state}`;
    }

    /**
     * add code
     * @param code
     */
    addCounty(county: string) {
        if (!this.params.county.includes(county)) {
            this.params.county.push(county);
        }
    }

    /**
     * remove code
     * @param code 
     */
    removeCode(county: string) {
        const index = this.params.county.indexOf(county);
        if (index > -1) {
            this.params.county.splice(index, 1);
        }
    }

    /**
     * 
     */
    addState(state: string) {
        this.params.state = state;
    }
}

interface CountyParams {
    county: any;
    state: string;
}

export { County, CountyParams };