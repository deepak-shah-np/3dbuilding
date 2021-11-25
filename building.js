


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








    // map.on("load", function () {
    //     map.addLayer({
    //         id: "lv3",
    //         type: "fill-extrusion",
    //         source: {
    //             type: "geojson",
    //             data:
    //                 "https://raw.githubusercontent.com/hello-deepak/3dbuilding/master/ynuv-fyni.geojson"
    //         },
    //         paint: {
    //             // Get fill-extrusion-height from the source 'height' property.
    //             "fill-extrusion-height": 0,

    //             // Get fill-extrusion-base from the source 'base_height' property.
    //             "fill-extrusion-base": 0,

    //             // Make extrusions slightly opaque for see through indoor walls.
    //             "fill-extrusion-opacity": 0.4,

    //             "fill-extrusion-color": 'gray'
    //         }
    //     });
    // });

    // map.addSou

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
                     ['get','hgt_median_m']
                ],

                // Get fill-extrusion-base from the source 'base_height' property.
                "fill-extrusion-base": [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                     ['get', 'gnd_min_m']
                ],

                // Make extrusions slightly opaque for see through indoor walls.
                "fill-extrusion-opacity": 0.6,

                'fill-extrusion-color': '#aaa'
            }
        });
    });


    // map.on("load", function() {
    //     map.addLayer({
    //       id: "extrusion_bld",
    //       type: "fill-extrusion",
    //       source: {
    //         type: "geojson",
    //         data:
    //           "https://raw.githubusercontent.com/HP-Nunes/geojson_test/master/v2_bld_exelcisor.geojson"
    //       },
    //       paint: {
    //         // Get fill-extrusion-height from the source 'height' property.
    //         "fill-extrusion-height": ["get", "gnd1st_del"],
      
    //         // Get fill-extrusion-base from the source 'base_height' property.
    //         "fill-extrusion-base": 0,
      
    //         // Make extrusions slightly opaque for see through indoor walls.
    //         "fill-extrusion-opacity": 0.1,
      
    //         "fill-extrusion-color": ["get", "color"]
    //       }
    //     });
    //   });

    //   map.on("load", function() {
    //     map.addLayer({
    //       id: "lots",
    //       type: "line",
    //       paint: {
    //         "line-width": 3,
    //         "line-color": 'green',
    //         "line-dasharray": [4, 1]
    //       },
    //       source: {
    //         type: "geojson",
    //         data:
    //           "https://data.sfgov.org/resource/ynuv-fyni.geojson"
    //       }
    //     });
    //   });






}