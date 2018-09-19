declare class Zip {
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
    constructor(codes: any);
    /**
     *
     */
    getUri(): string;
    /**
     * add code
     * @param code
     */
    addCode(code: number): void;
    /**
     * remove code
     * @param code
     */
    removeCode(code: number): void;
}
export { Zip };
