import { SearchType } from './search-type';

class State extends SearchType {

    /**
     * zipcode endpoint
     */
    endpoint: string = 'polygon/state?state=';

    /**
     * zipcode array
     */
    params: any = [];

    /**
     * constructor
     * @param codes 
     */
    constructor(states: any) {
        super();
        this.params = states;
    }

    /**
     * 
     */
    getUri() {
        return `${this.endpoint}${this.params.join(',')}`;
    }

    /**
     * add code
     * @param code
     */
    addState(state: string) {
        if (!this.params.includes(state)) {
            this.params.push(state);
        }
    }

    /**
     * remove code
     * @param code 
     */
    removeState(state: string) {
        const index = this.params.indexOf(state);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    }
}

export { State };