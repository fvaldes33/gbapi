class Zip {
    
    /**
     * zipcode endpoint
     */
    endpoint: string = 'polygon/zip?zip=';

    /**
     * zipcode array
     */
    params: any = [];

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
    getUri() {
        return `${this.endpoint}${this.params.join(',')}`;
    }

    /**
     * add code
     * @param code
     */
    addCode(code: number) {
        if (!this.params.includes(code)) {
            this.params.push(code);
        }
    }

    /**
     * remove code
     * @param code 
     */
    removeCode(code: number) {
        const index = this.params.indexOf(code);
        if (index > -1) {
            this.params.splice(index, 1);
        }
    }

}

export { Zip };