# Geobarriers Javascript Library [Client Side Only]

[![Version](https://img.shields.io/npm/v/@geobarriers/gbapi.svg?colorB=6AC8F8)](https://www.npmjs.com/package/@geobarriers/gbapi)
[![Downloads](https://img.shields.io/npm/dt/@geobarriers/gbapi.svg?colorB=6AC8F8)](https://www.npmjs.com/package/@geobarriers/gbapi)

The Geobarriers Javascript library provides convenient access to the Geobarriers API from
applications written in client-side JavaScript.

The REST API that allows developers to easily integrate zipcode, county, and state boundaries into websites, Google Maps, GIS systems or any client applications that can consume GeoJson.

## Documentation

See the [API docs](https://www.geobarriers.io/docs).

## Installation

Install the package with:

    npm install @geobarriers/gbapi --save

    // or using yarn
    yarn add @geobarriers/gbapi

## Usage

The library needs to be configured with your api key on instantiation like below. The map property is optional if you plan on autoloading geojson onto a map.

``` js
import GBApi from '@geobarriers/gbapi';

//.. do google map stuff (if you want)

const gb = new GBApi({ key: 'your-api-key', map });
gb.zip(28203).getGeoJson()
    .then(geojson => {
        // ...do geojson things 
    })
    .catch(error => {
        // ...handle errors
    });
    
```

Or using Async/Await:

``` js
import GBApi from '@geobarriers/gbapi';

const gb = new GBApi({ key: 'your-api-key' });

try {
    const geojson = await gb.zip(28203).getGeoJson();
    //... do geojson things
} catch (error) {
    // ...handle errors
}

```

### Search Types

There are currently 3 search types:
- zip code
- county 
- state

#### Zip Search
Zip search type can take a string or array of zip codes.

``` js

const gb = new GBApi({ key: 'your-api-key' });
try {
    const geojson = await gb.zip([28203, 28208, 28202]).getGeoJson();
    //... do geojson things
} catch (error) {
    // ...handle errors
}

```

#### County Search
County search type can take a string or array of counties and a state abbreviation.
``` js

const gb = new GBApi({ key: 'your-api-key' });
try {
    const geojson = await gb.county({ 
        county: ['Union', 'Mecklenburg'], 
        state: 'NC' 
    }).getGeoJson();
    //... do geojson things
} catch (error) {
    // ...handle errors
}

```

#### State Search
State search type can take a string or array of states abbreviation.

``` js

const gb = new GBApi({ key: 'your-api-key' });
try {
    const geojson = await gb.county(['Florida', 'Georgia']).getGeoJson();
    //... do geojson things
} catch (error) {
    // ...handle errors
}

```

### Using Google Maps
The Geobarriers library provides a method to load geojson data directly onto the map. Skipping a whole step. The only parameter is a boolean to clear all current features on the map. Defaults to true.

``` js

//... google map stuff 

const gb = new GBApi({ key: 'your-api-key', map }); // <- must init with map object
try {
    await gb.zip([28208, 28203]).loadGeoJson(true);
    
} catch (error) {
    // ...handle errors
}

```

You can also just pass the map into the `addGeoJson` method as well.

``` js

//... google map stuff 

const gb = new GBApi({ key: 'your-api-key' }); //<- no map provided at init
try {
    const geoJson = await gb.zip([28208, 28203]).getGeoJson();
    gb.addGeoJson(geoJson, map, true); //<- true argument will clear out previous data layer on your map
} catch (error) {
    // ...handle errors
}

```


### Response Object
```js
{
    "data": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    //...
                },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        //...
                    ]
                }
            }
        ]
    }
}
```

### TODO
- Need to write some test
- Need to provide browser support [polyfill.io](https://polyfill.io/v2/docs/)
- Add Canada postal codes FSA & LDU