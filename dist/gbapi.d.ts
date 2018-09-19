import { County, ICountyParams, State, Zip } from './search-types';
declare class GBApi {
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
     * features on map
     */
    private _FEATURES;
    /**
     * base api url
     */
    private baseUrl;
    /**
     *
     * @param params GBApiOptions
     */
    constructor(params: IGBApiOptions);
    /**
     *
     */
    zip(codes: any): GBApi;
    /**
     *
     */
    county(params: ICountyParams): GBApi;
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
     * @param map [google map]
     * @param fresh
     */
    addGeoJson(geoJson: IFeatureCollection, map: any, fresh?: boolean): void;
    /**
     * set feaures
     */
    /**
    * get features
    */
    features: any;
}
interface IGBApiOptions {
    key: string;
    map?: any;
}
interface IGeometry {
    type: string;
    coordinates: any;
}
interface IFeature {
    type: string;
    properties: any;
    geometry: IGeometry;
}
interface IFeatureCollection {
    type: string;
    features: IFeature[];
}
export { GBApi, IGBApiOptions, IGeometry, IFeature, IFeatureCollection, Zip, County, ICountyParams, State };
