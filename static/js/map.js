mapboxgl.accessToken = 'pk.eyJ1IjoiamVrbm93bGVkZ2UiLCJhIjoiY2p3dXhkcTU3MDNpaTRhbW03cWlwbDUxbCJ9.oaCE14mVazBw12tkUXl8Jw';
var beforeMap = new mapboxgl.Map({
  container: 'before',
  style: {

    "version": 8,
    "name": "Light-copy",
    "metadata": {
      "mapbox:type": "default",
      "mapbox:origin": "light-v10",
      "mapbox:autocomposite": true,
      "mapbox:groups": {
        "1444855786460.0557": {
          "name": "Roads",
          "collapsed": true
        },
        "1444934295202.7542": {
          "name": "Admin boundaries",
          "collapsed": true
        },
        "1444855799204.86": {
          "name": "Bridges",
          "collapsed": true
        },
        "1444855769305.6016": {
          "name": "Tunnels",
          "collapsed": true
        }
      },
      "mapbox:sdk-support": {
        "js": "0.54.0",
        "android": "6.7.0",
        "ios": "4.7.0"
      },
      "mapbox:uiParadigm": "layers"
    },
    "center": [-8.415719795577843, 41.54829818201110],
    "zoom": 16.93508223056973,
    "bearing": 0,
    "pitch": 0,
    "light": {
      "anchor": "viewport",
      "color": "hsl(0, 0%, 0%)"
    },
    "sources": {
      "composite": {
        "url": "mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v8",
        "type": "vector"
      }
    },
    "sprite": "mapbox://sprites/jeknowledge/ckcm5b1m91ayp1imzhta18u6y/1sw1ea3lo09xksdnulb73k9a7",
    "glyphs": "mapbox://fonts/jeknowledge/{fontstack}/{range}.pbf",
    "layers": [{
        "id": "land",
        "type": "background",
        "layout": {},
        "paint": {
          "background-color": "#0181d3"
        }
      },
      {
        "id": "landcover",
        "type": "fill",
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 7,
        "layout": {},
        "paint": {
          "fill-color": "#014e82",
          "fill-opacity": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            2,
            0.1,
            7,
            0
          ],
          "fill-antialias": false
        }
      },
      {
        "id": "water-shadow",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {},
        "paint": {
          "fill-translate-anchor": "viewport",
          "fill-translate": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            7,
            ["literal", [0, 0]],
            16,
            ["literal", [-1, -1]]
          ],
          "fill-color": "hsl(185, 7%, 73%)"
        }
      },
      {
        "id": "waterway",
        "type": "line",
        "source": "composite",
        "source-layer": "waterway",
        "minzoom": 8,
        "layout": {
          "line-cap": ["step", ["zoom"], "butt", 11, "round"],
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(187, 9%, 81%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "class"],
              ["canal", "river"], 0.1, 0
            ],
            20,
            ["match", ["get", "class"],
              ["canal", "river"], 8, 3
            ]
          ],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            8.5,
            1
          ]
        }
      },
      {
        "id": "water",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {},
        "paint": {
          "fill-color": "hsl(185, 9%, 81%)"
        }
      },
      {
        "id": "hillshade",
        "type": "fill",
        "source": "composite",
        "source-layer": "hillshade",
        "maxzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": [
            "match",
            ["get", "class"],
            "shadow",
            "hsl(0, 0%, 35%)",
            "hsl(0, 0%, 100%)"
          ],
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            [
              "match",
              ["get", "level"],
              [67, 56],
              0.06,
              [89, 78],
              0.03,
              0.04
            ],
            16,
            0
          ],
          "fill-antialias": false
        }
      },
      {
        "id": "land-structure-polygon",
        "type": "fill",
        "source": "composite",
        "source-layer": "structure",
        "minzoom": 13,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "land"]
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(156, 20%, 95%)"
        }
      },
      {
        "id": "building-outline",
        "type": "line",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "type"], "building:part"],
          ["==", ["get", "underground"], "false"]
        ],
        "layout": {},
        "paint": {
          "line-color": "hsl(55, 3%, 87%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            15,
            0.75,
            20,
            3
          ],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            16,
            1
          ]
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "type"], "building:part"],
          ["==", ["get", "underground"], "false"]
        ],
        "layout": {},
        "paint": {
          "fill-outline-color": "#014f83",
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            16,
            1
          ],
          "fill-color": "#014f83"
        }
      },
      {
        "id": "road-pedestrian-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "pedestrian"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            2,
            18,
            14.5
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-minor-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 1, 14, 0]
        }
      },
      {
        "id": "road-street-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 1, 14, 0]
        }
      },
      {
        "id": "road-minor-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-street-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-secondary-tertiary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["secondary", "tertiary"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            0.75,
            18,
            2
          ],
          "line-color": "#014f83",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.1,
            18,
            26
          ]
        }
      },
      {
        "id": "road-primary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["==", ["get", "class"], "primary"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            1,
            18,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ]
        }
      },
      {
        "id": "road-major-link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 10,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["motorway_link", "trunk_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-opacity": ["step", ["zoom"], 0, 11, 1]
        }
      },
      {
        "id": "road-motorway-trunk-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["match", ["get", "class"],
            ["motorway", "trunk"], true, false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            1,
            18,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ],
          "line-opacity": [
            "step",
            ["zoom"],
            ["match", ["get", "class"], "motorway", 1, 0],
            6,
            1
          ]
        }
      },
      {
        "id": "road-construction",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["get", "class"], "construction"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {},
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            2,
            18,
            18
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [0.4, 0.8]],
            15,
            ["literal", [0.3, 0.6]],
            16,
            ["literal", [0.2, 0.3]],
            17,
            ["literal", [0.2, 0.25]],
            18,
            ["literal", [0.15, 0.15]]
          ]
        }
      },
      {
        "id": "road-path",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "path"],
          [
            "step",
            ["zoom"],
            [
              "!",
              [
                "match",
                ["get", "type"],
                ["steps", "sidewalk", "crossing"],
                true,
                false
              ]
            ],
            16,
            ["!=", ["get", "type"], "steps"]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            13,
            0.5,
            14,
            1,
            15,
            1,
            18,
            4
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.75, 1]],
            16,
            ["literal", [1, 0.75]],
            17,
            ["literal", [1, 0.5]]
          ]
        }
      },
      {
        "id": "road-steps",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["get", "type"], "steps"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            15,
            1,
            16,
            1.6,
            18,
            6
          ],
          "line-color": "#014e82",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.75, 1]],
            16,
            ["literal", [1, 0.75]],
            17,
            ["literal", [0.3, 0.3]]
          ]
        }
      },
      {
        "id": "road-pedestrian",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "pedestrian"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            0.5,
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.5, 0.4]],
            16,
            ["literal", [1, 0.2]]
          ]
        }
      },
      {
        "id": "road-minor",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-street",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-color": "#014f83",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-primary",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["==", ["get", "class"], "primary"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ],
          "line-color": "hsla(204, 98%, 26%, 0.43)"
        }
      },
      {
        "id": "road-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "road",
        "minzoom": 10,
        "filter": [
          "step",
          ["zoom"],
          [
            "match",
            ["get", "class"],
            ["motorway", "trunk", "primary", "secondary", "tertiary"],
            true,
            false
          ],
          12,
          [
            "match",
            ["get", "class"],
            [
              "motorway",
              "trunk",
              "primary",
              "secondary",
              "tertiary",
              "pedestrian",
              "street",
              "street_limited"
            ],
            true,
            false
          ],
          15,
          [
            "match",
            ["get", "class"],
            ["ferry", "golf", "path"],
            false,
            true
          ]
        ],
        "layout": {
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "match",
              ["get", "class"],
              [
                "motorway",
                "trunk",
                "primary",
                "secondary",
                "tertiary"
              ],
              10,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "secondary_link",
                "tertiary_link",
                "pedestrian",
                "street",
                "street_limited"
              ],
              9,
              6.5
            ],
            18,
            [
              "match",
              ["get", "class"],
              [
                "motorway",
                "trunk",
                "primary",
                "secondary",
                "tertiary"
              ],
              16,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "secondary_link",
                "tertiary_link",
                "pedestrian",
                "street",
                "street_limited"
              ],
              14,
              13
            ]
          ],
          "text-max-angle": 30,
          "text-font": [
            "DIN Offc Pro Regular",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 42%)",
          "text-halo-color": [
            "match",
            ["get", "class"],
            ["motorway", "trunk"],
            "hsla(0, 0%, 100%, 0.75)",
            "hsl(0, 0%, 100%)"
          ],
          "text-halo-width": 1,
          "text-halo-blur": 1
        }
      },
      {
        "id": "waterway-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["canal", "river", "stream"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "text-max-angle": 30,
          "symbol-spacing": [
            "interpolate",
            ["linear", 1],
            ["zoom"],
            15,
            250,
            17,
            400
          ],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            12,
            18,
            16
          ],
          "symbol-placement": "line",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "natural-line-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 4,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["glacier", "landform"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"],
          ["<=", ["get", "filterrank"], 1]
        ],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-max-angle": 30,
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line-center",
          "text-pitch-alignment": "viewport"
        },
        "paint": {
          "text-halo-width": 0.5,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-blur": 0.5,
          "text-color": "hsl(0, 0%, 42%)"
        }
      },
      {
        "id": "natural-point-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 4,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["dock", "glacier", "landform", "water_feature", "wetland"],
            true,
            false
          ],
          ["==", ["geometry-type"], "Point"],
          ["<=", ["get", "filterrank"], 1]
        ],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "text-offset": ["literal", [0, 0]]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 42%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "water-line-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["bay", "ocean", "reservoir", "sea", "water"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
            10,
            ["step", ["get", "sizerank"], 18, 9, 12],
            18,
            ["step", ["get", "sizerank"], 18, 9, 16]
          ],
          "text-max-angle": 30,
          "text-letter-spacing": [
            "match",
            ["get", "class"],
            "ocean",
            0.25,
            ["sea", "bay"],
            0.15,
            0
          ],
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line-center",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "water-point-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["bay", "ocean", "reservoir", "sea", "water"],
            true,
            false
          ],
          ["==", ["geometry-type"], "Point"]
        ],
        "layout": {
          "text-line-height": 1.3,
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
            10,
            ["step", ["get", "sizerank"], 18, 9, 12]
          ],
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-letter-spacing": [
            "match",
            ["get", "class"],
            "ocean",
            0.25,
            ["bay", "sea"],
            0.15,
            0.01
          ],
          "text-max-width": [
            "match",
            ["get", "class"],
            "ocean",
            4,
            "sea",
            5,
            ["bay", "water"],
            7,
            10
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "poi-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "poi_label",
        "minzoom": 6,
        "filter": ["<=", ["get", "filterrank"], 1],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5,
          "text-color": [
            "step",
            ["zoom"],
            [
              "step",
              ["get", "sizerank"],
              "hsl(0, 0%, 66%)",
              5,
              "hsl(230, 0%, 56%)"
            ],
            17,
            [
              "step",
              ["get", "sizerank"],
              "hsl(0, 0%, 66%)",
              13,
              "hsl(0, 0%, 56%)"
            ]
          ]
        }
      }
    ],
    "created": "2020-07-14T16:23:59.233Z",
    "id": "ckcm5b1m91ayp1imzhta18u6y",
    "modified": "2020-07-14T16:23:59.233Z",
    "owner": "jeknowledge",
    "visibility": "private",
    "draft": false
  }
});
var beforeMarker = new mapboxgl.Marker()
.setLngLat([-8.415719795577843, 41.54829818201110])
.addTo(beforeMap);



/*-----------------------------2ºMAPA------------------------------*/

var afterMap = new mapboxgl.Map({
  container: 'after',
  style: {

    "version": 8,
    "name": "Light-copy",
    "metadata": {
      "mapbox:type": "default",
      "mapbox:origin": "light-v10",
      "mapbox:autocomposite": true,
      "mapbox:groups": {
        "1444855786460.0557": {
          "name": "Roads",
          "collapsed": true
        },
        "1444934295202.7542": {
          "name": "Admin boundaries",
          "collapsed": true
        },
        "1444855799204.86": {
          "name": "Bridges",
          "collapsed": true
        },
        "1444855769305.6016": {
          "name": "Tunnels",
          "collapsed": true
        }
      },
      "mapbox:sdk-support": {
        "js": "0.54.0",
        "android": "6.7.0",
        "ios": "4.7.0"
      },
      "mapbox:uiParadigm": "layers"
    },
    "center": [-8.407019, 41.543857],
    "zoom": 16.93508223056973,
    "bearing": 0,
    "pitch": 0,
    "light": {
      "anchor": "viewport",
      "color": "hsl(0, 0%, 0%)"
    },
    "sources": {
      "composite": {
        "url": "mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v8",
        "type": "vector"
      }
    },
    "sprite": "mapbox://sprites/jeknowledge/ckcm5b1m91ayp1imzhta18u6y/1sw1ea3lo09xksdnulb73k9a7",
    "glyphs": "mapbox://fonts/jeknowledge/{fontstack}/{range}.pbf",
    "layers": [{
        "id": "land",
        "type": "background",
        "layout": {},
        "paint": {
          "background-color": "#0181d3"
        }
      },
      {
        "id": "landcover",
        "type": "fill",
        "source": "composite",
        "source-layer": "landcover",
        "maxzoom": 7,
        "layout": {},
        "paint": {
          "fill-color": "#014e82",
          "fill-opacity": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            2,
            0.1,
            7,
            0
          ],
          "fill-antialias": false
        }
      },
      {
        "id": "water-shadow",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {},
        "paint": {
          "fill-translate-anchor": "viewport",
          "fill-translate": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            7,
            ["literal", [0, 0]],
            16,
            ["literal", [-1, -1]]
          ],
          "fill-color": "hsl(185, 7%, 73%)"
        }
      },
      {
        "id": "waterway",
        "type": "line",
        "source": "composite",
        "source-layer": "waterway",
        "minzoom": 8,
        "layout": {
          "line-cap": ["step", ["zoom"], "butt", 11, "round"],
          "line-join": "round"
        },
        "paint": {
          "line-color": "hsl(187, 9%, 81%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            9,
            ["match", ["get", "class"],
              ["canal", "river"], 0.1, 0
            ],
            20,
            ["match", ["get", "class"],
              ["canal", "river"], 8, 3
            ]
          ],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            8,
            0,
            8.5,
            1
          ]
        }
      },
      {
        "id": "water",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {},
        "paint": {
          "fill-color": "hsl(185, 9%, 81%)"
        }
      },
      {
        "id": "hillshade",
        "type": "fill",
        "source": "composite",
        "source-layer": "hillshade",
        "maxzoom": 16,
        "layout": {},
        "paint": {
          "fill-color": [
            "match",
            ["get", "class"],
            "shadow",
            "hsl(0, 0%, 35%)",
            "hsl(0, 0%, 100%)"
          ],
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            [
              "match",
              ["get", "level"],
              [67, 56],
              0.06,
              [89, 78],
              0.03,
              0.04
            ],
            16,
            0
          ],
          "fill-antialias": false
        }
      },
      {
        "id": "land-structure-polygon",
        "type": "fill",
        "source": "composite",
        "source-layer": "structure",
        "minzoom": 13,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "land"]
        ],
        "layout": {},
        "paint": {
          "fill-color": "hsl(156, 20%, 95%)"
        }
      },
      {
        "id": "building-outline",
        "type": "line",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "type"], "building:part"],
          ["==", ["get", "underground"], "false"]
        ],
        "layout": {},
        "paint": {
          "line-color": "hsl(55, 3%, 87%)",
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            15,
            0.75,
            20,
            3
          ],
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            16,
            1
          ]
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
          "all",
          ["!=", ["get", "type"], "building:part"],
          ["==", ["get", "underground"], "false"]
        ],
        "layout": {},
        "paint": {
          "fill-outline-color": "#014f83",
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            16,
            1
          ],
          "fill-color": "#014f83"
        }
      },
      {
        "id": "road-pedestrian-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "pedestrian"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            2,
            18,
            14.5
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-minor-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 1, 14, 0]
        }
      },
      {
        "id": "road-street-low",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 1, 14, 0]
        }
      },
      {
        "id": "road-minor-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-street-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-secondary-tertiary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["secondary", "tertiary"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            0.75,
            18,
            2
          ],
          "line-color": "#014f83",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.1,
            18,
            26
          ]
        }
      },
      {
        "id": "road-primary-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["==", ["get", "class"], "primary"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            1,
            18,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ]
        }
      },
      {
        "id": "road-major-link-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 10,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["motorway_link", "trunk_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.75,
            20,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-opacity": ["step", ["zoom"], 0, 11, 1]
        }
      },
      {
        "id": "road-motorway-trunk-case",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["match", ["get", "class"],
            ["motorway", "trunk"], true, false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            10,
            1,
            18,
            2
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-gap-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ],
          "line-opacity": [
            "step",
            ["zoom"],
            ["match", ["get", "class"], "motorway", 1, 0],
            6,
            1
          ]
        }
      },
      {
        "id": "road-construction",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["get", "class"], "construction"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {},
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            2,
            18,
            18
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [0.4, 0.8]],
            15,
            ["literal", [0.3, 0.6]],
            16,
            ["literal", [0.2, 0.3]],
            17,
            ["literal", [0.2, 0.25]],
            18,
            ["literal", [0.15, 0.15]]
          ]
        }
      },
      {
        "id": "road-path",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "path"],
          [
            "step",
            ["zoom"],
            [
              "!",
              [
                "match",
                ["get", "type"],
                ["steps", "sidewalk", "crossing"],
                true,
                false
              ]
            ],
            16,
            ["!=", ["get", "type"], "steps"]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            13,
            0.5,
            14,
            1,
            15,
            1,
            18,
            4
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.75, 1]],
            16,
            ["literal", [1, 0.75]],
            17,
            ["literal", [1, 0.5]]
          ]
        }
      },
      {
        "id": "road-steps",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["get", "type"], "steps"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            15,
            1,
            16,
            1.6,
            18,
            6
          ],
          "line-color": "#014e82",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.75, 1]],
            16,
            ["literal", [1, 0.75]],
            17,
            ["literal", [0.3, 0.3]]
          ]
        }
      },
      {
        "id": "road-pedestrian",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 12,
        "filter": [
          "all",
          ["==", ["get", "class"], "pedestrian"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            0.5,
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-dasharray": [
            "step",
            ["zoom"],
            ["literal", [1, 0]],
            15,
            ["literal", [1.5, 0.4]],
            16,
            ["literal", [1, 0.2]]
          ]
        }
      },
      {
        "id": "road-minor",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "step",
            ["zoom"],
            ["==", ["get", "class"], "track"],
            14,
            [
              "match",
              ["get", "class"],
              ["track", "secondary_link", "tertiary_link", "service"],
              true,
              false
            ]
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            14,
            ["match", ["get", "class"], "track", 1, 0.5],
            18,
            12
          ],
          "line-color": "hsl(204, 98%, 26%)",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-street",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "minzoom": 11,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["street", "street_limited", "primary_link"],
            true,
            false
          ],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            12,
            0.5,
            14,
            2,
            18,
            18
          ],
          "line-color": "#014f83",
          "line-opacity": ["step", ["zoom"], 0, 14, 1]
        }
      },
      {
        "id": "road-primary",
        "type": "line",
        "metadata": {
          "mapbox:group": "1444855786460.0557"
        },
        "source": "composite",
        "source-layer": "road",
        "filter": [
          "all",
          ["==", ["get", "class"], "primary"],
          ["match", ["get", "structure"],
            ["none", "ford"], true, false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            5,
            0.75,
            18,
            32
          ],
          "line-color": "hsla(204, 98%, 26%, 0.43)"
        }
      },
      {
        "id": "road-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "road",
        "minzoom": 10,
        "filter": [
          "step",
          ["zoom"],
          [
            "match",
            ["get", "class"],
            ["motorway", "trunk", "primary", "secondary", "tertiary"],
            true,
            false
          ],
          12,
          [
            "match",
            ["get", "class"],
            [
              "motorway",
              "trunk",
              "primary",
              "secondary",
              "tertiary",
              "pedestrian",
              "street",
              "street_limited"
            ],
            true,
            false
          ],
          15,
          [
            "match",
            ["get", "class"],
            ["ferry", "golf", "path"],
            false,
            true
          ]
        ],
        "layout": {
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "match",
              ["get", "class"],
              [
                "motorway",
                "trunk",
                "primary",
                "secondary",
                "tertiary"
              ],
              10,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "secondary_link",
                "tertiary_link",
                "pedestrian",
                "street",
                "street_limited"
              ],
              9,
              6.5
            ],
            18,
            [
              "match",
              ["get", "class"],
              [
                "motorway",
                "trunk",
                "primary",
                "secondary",
                "tertiary"
              ],
              16,
              [
                "motorway_link",
                "trunk_link",
                "primary_link",
                "secondary_link",
                "tertiary_link",
                "pedestrian",
                "street",
                "street_limited"
              ],
              14,
              13
            ]
          ],
          "text-max-angle": 30,
          "text-font": [
            "DIN Offc Pro Regular",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line",
          "text-padding": 1,
          "text-rotation-alignment": "map",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-letter-spacing": 0.01
        },
        "paint": {
          "text-color": "hsl(0, 0%, 42%)",
          "text-halo-color": [
            "match",
            ["get", "class"],
            ["motorway", "trunk"],
            "hsla(0, 0%, 100%, 0.75)",
            "hsl(0, 0%, 100%)"
          ],
          "text-halo-width": 1,
          "text-halo-blur": 1
        }
      },
      {
        "id": "waterway-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 13,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["canal", "river", "stream"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "text-max-angle": 30,
          "symbol-spacing": [
            "interpolate",
            ["linear", 1],
            ["zoom"],
            15,
            250,
            17,
            400
          ],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            12,
            18,
            16
          ],
          "symbol-placement": "line",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "natural-line-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 4,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["glacier", "landform"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"],
          ["<=", ["get", "filterrank"], 1]
        ],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-max-angle": 30,
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line-center",
          "text-pitch-alignment": "viewport"
        },
        "paint": {
          "text-halo-width": 0.5,
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-blur": 0.5,
          "text-color": "hsl(0, 0%, 42%)"
        }
      },
      {
        "id": "natural-point-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "minzoom": 4,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["dock", "glacier", "landform", "water_feature", "wetland"],
            true,
            false
          ],
          ["==", ["geometry-type"], "Point"],
          ["<=", ["get", "filterrank"], 1]
        ],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "text-offset": ["literal", [0, 0]]
        },
        "paint": {
          "text-color": "hsl(0, 0%, 42%)",
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5
        }
      },
      {
        "id": "water-line-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["bay", "ocean", "reservoir", "sea", "water"],
            true,
            false
          ],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
            10,
            ["step", ["get", "sizerank"], 18, 9, 12],
            18,
            ["step", ["get", "sizerank"], 18, 9, 16]
          ],
          "text-max-angle": 30,
          "text-letter-spacing": [
            "match",
            ["get", "class"],
            "ocean",
            0.25,
            ["sea", "bay"],
            0.15,
            0
          ],
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "symbol-placement": "line-center",
          "text-pitch-alignment": "viewport",
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "water-point-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "natural_label",
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["bay", "ocean", "reservoir", "sea", "water"],
            true,
            false
          ],
          ["==", ["geometry-type"], "Point"]
        ],
        "layout": {
          "text-line-height": 1.3,
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7,
            ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
            10,
            ["step", ["get", "sizerank"], 18, 9, 12]
          ],
          "text-font": [
            "DIN Offc Pro Italic",
            "Arial Unicode MS Regular"
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ],
          "text-letter-spacing": [
            "match",
            ["get", "class"],
            "ocean",
            0.25,
            ["bay", "sea"],
            0.15,
            0.01
          ],
          "text-max-width": [
            "match",
            ["get", "class"],
            "ocean",
            4,
            "sea",
            5,
            ["bay", "water"],
            7,
            10
          ]
        },
        "paint": {
          "text-color": "hsl(187, 7%, 51%)"
        }
      },
      {
        "id": "poi-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "poi_label",
        "minzoom": 6,
        "filter": ["<=", ["get", "filterrank"], 1],
        "layout": {
          "text-size": [
            "step",
            ["zoom"],
            ["step", ["get", "sizerank"], 18, 5, 12],
            17,
            ["step", ["get", "sizerank"], 18, 13, 12]
          ],
          "text-font": [
            "DIN Offc Pro Medium",
            "Arial Unicode MS Regular"
          ],
          "text-field": ["coalesce", ["get", "name_en"],
            ["get", "name"]
          ]
        },
        "paint": {
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 0.5,
          "text-halo-blur": 0.5,
          "text-color": [
            "step",
            ["zoom"],
            [
              "step",
              ["get", "sizerank"],
              "hsl(0, 0%, 66%)",
              5,
              "hsl(230, 0%, 56%)"
            ],
            17,
            [
              "step",
              ["get", "sizerank"],
              "hsl(0, 0%, 66%)",
              13,
              "hsl(0, 0%, 56%)"
            ]
          ]
        }
      }
    ],
    "created": "2020-07-14T16:23:59.233Z",
    "id": "ckcm5b1m91ayp1imzhta18u6y",
    "modified": "2020-07-14T16:23:59.233Z",
    "owner": "jeknowledge",
    "visibility": "private",
    "draft": false
  }

});

var afterMarker = new mapboxgl.Marker()
.setLngLat([-8.407019, 41.543857])
.addTo(afterMap);

beforeMap.scrollZoom.disable();
afterMap.scrollZoom.disable();
