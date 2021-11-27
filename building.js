
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlcGFrMDAwIiwiYSI6ImNrazQycng1ZjEwM3cycG9iZXd4MjFjamgifQ.5weuL4VO1EzrbXhg_QGFZQ';


if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL, please use a more recent browser');
} else {
    var center = [-122.449310, 37.799714];

    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
        center: center,
        zoom: 17,
        pitch: 50,
        bearing: 80,
        antialias: true
    });


    map.on("load", function () {
        map.addLayer({
            id: "buildings-footprint",
            type: "fill-extrusion",
            source: {
                type: "geojson",
                data:
                    "https://raw.githubusercontent.com/hello-deepak/3dbuilding/master/ynuv-fyni.geojson"
            },
            paint: {
                // Get fill-extrusion-height from the source 'height' property.
                "fill-extrusion-height":
                    [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        //  10
                        ['get', 'hgt_median_m']
                    ],

                // Get fill-extrusion-base from the source 'base_height' property.
                "fill-extrusion-base": 0,

                // Make extrusions slightly opaque for see through indoor walls.
                "fill-extrusion-opacity": 0.6,

                'fill-extrusion-color': '#aaa'
            }
        });
    });




    map.on('click', function (e) {
        var feature = queryFeatures(e.point)

        feature = map.getZoom() > 17 ? queryFeatures(null, feature.properties.id) : feature


        onSelectBuilding(feature)
    })

}


function queryFeatures(query, id) {
    var options = { layers: ['buildings-footprint'] }
    if (id) options.filter = ['==', 'id', id]

    var features = id ? map.queryRenderedFeatures(options) : map.queryRenderedFeatures(query, options);
    console.log(features);
    var data = features[0];
    if (features.length > 1) {
        data = {
            type: 'Feature',
            geometry: features[0].geometry,
            properties: features[0].properties
        };
        for (var i = 1, len = features.length; i < len; i++) {
            var f1 = {
                type: 'Feature',
                geometry: features[i].geometry,
                properties: features[i].properties
            };

            data = turf.union(data, f1);
           
        }
    }
    data['name']=makeid(9);
    return data
}



function onSelectBuilding(feature) {
    var randomid = makeid(10);
    console.log(randomid)
    map.addSource(randomid, {
        'type': 'geojson',
        'data': feature
    })

        map.addLayer({
            id: feature['name'],
            type: "fill-extrusion",
            source: randomid,
            paint: {
                // Get fill-extrusion-height from the source 'height' property.
                "fill-extrusion-height": 20,

                // Get fill-extrusion-base from the source 'base_height' property.
                "fill-extrusion-base": ['get', 'hgt_median_m'],

                // Make extrusions slightly opaque for see through indoor walls.
                "fill-extrusion-opacity": 0.8,

                "fill-extrusion-color": 'yellow'
            }
        });
   





}


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}