import { Zip, County, CountyParams, State } from './search-types';
declare class GBApi {
    /**
     * base api url
     */
    baseUrl: string;
    /**
     * handle on google
     */
    google: any;
    /**
     * api key string
     */
    _key: string;
    /**
     * map handle
     */
    _map: any;
    /**
     * features on map
     */
    _features: any;
    /**
     *
     * @param params GBApiOptions
     */
    constructor(params: GBApiOptions);
    /**
     *
     */
    zip(codes: any): Zip;
    /**
     *
     */
    county(params: CountyParams): County;
    /**
     *
     */
    state(states: any): State;
    /**
     *
     * @param data Zip|County|State
     * @param fresh boolean
     * @return Promise
     */
    loadGeoJson(data: Zip | County | State, fresh?: boolean): Promise<any>;
    /**
     * Retrieve geoJson data from api
     * @param data
     * @return json
     */
    getGeoJson(data: Zip | County | State): Promise<any>;
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
    /**
     * set google map
     */
    /**
    * get map
    */
    map: any;
    /**
     * set api key
     */
    /**
    * get api key
    */
    key: string;
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
