declare class State {
    /**
     * zipcode endpoint
     */
    endpoint: string;
    /**
     * zipcode array
     */
    params: any;
    /**
     * constructor
     * @param codes
     */
    constructor(states: any);
    /**
     *
     */
    getUri(): string;
    /**
     * add code
     * @param code
     */
    addState(state: string): void;
    /**
     * remove code
     * @param code
     */
    removeState(state: string): void;
}
export { State };
