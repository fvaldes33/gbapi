import { Zip, County, CountyParams, State } from './search-types';
declare class GBApi {
    /**
     * base api url
     */
    baseUrl: string;
    /**
     * features on map
     */
    _features: any;
    /**
     * api key string
     */
    key: string;
    /**
     * map handle
     */
    map: any;
    /**
     *
     */
    searchInstance: any;
    /**
     *
     * @param params GBApiOptions
     */
    constructor(params: GBApiOptions);
    /**
     *
     */
    zip(codes: any): GBApi;
    /**
     *
     */
    county(params: CountyParams): GBApi;
    /**
     *
     */
    state(states: any): GBApi;
    /**
     *
     * @param data Zip|County|State
     * @param fresh boolean
     * @return Promise
     */
    loadGeoJson(fresh?: boolean): Promise<any>;
    /**
     * Retrieve geoJson data from api
     * @param data
     * @return Promise
     */
    getGeoJson(): Promise<any>;
    /**
     * Add geojson to the map
     * @param geoJson
     * @param fresh
     */
    addGeoJson(geoJson: FeatureCollection, fresh?: boolean): void;
    /**
     * set feaures
     */
    /**
    * get features
    */
    features: any;
}
interface GBApiOptions {
    key: string;
    map?: any;
}
interface Geometry {
    type: string;
    coordinates: any;
}
interface Feature {
    type: string;
    properties: any;
    geometry: Geometry;
}
interface FeatureCollection {
    type: string;
    features: Feature[];
}
export { GBApi, GBApiOptions, Geometry, Feature, FeatureCollection, Zip, County, CountyParams, State };
