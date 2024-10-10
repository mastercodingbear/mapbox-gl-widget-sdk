import { getMap, storeLayer } from "../../utils/mapUtils";

export const addHeatmapLayer = (
  layerId: string,
  geoJsonData: GeoJSON.FeatureCollection<GeoJSON.Point>
): void => {
  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  if (map.getSource(layerId)) {
    map.removeLayer(layerId);
    map.removeSource(layerId);
  }

  map.addSource(layerId, {
    type: "geojson",
    data: geoJsonData,
  });

  map.addLayer(
    {
      id: `${layerId}-heat`,
      type: "heatmap",
      source: layerId,
      maxzoom: 9,
      paint: {
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "mag"],
          0,
          0,
          6,
          1,
        ],
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "rgb(103,169,207)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(239,138,98)",
          1,
          "rgb(178,24,43)",
        ],
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
      },
    },
    "waterway-label"
  );

  map.addLayer(
    {
      id: `${layerId}-point`,
      type: "circle",
      source: layerId,
      minzoom: 7,
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
          16,
          ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
        ],
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "mag"],
          1,
          "rgba(33,102,172,0)",
          2,
          "rgb(103,169,207)",
          3,
          "rgb(209,229,240)",
          4,
          "rgb(253,219,199)",
          5,
          "rgb(239,138,98)",
          6,
          "rgb(178,24,43)",
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
      },
    },
    "waterway-label"
  );

  storeLayer({ id: `${layerId}-heat`, sourceId: layerId });
  storeLayer({ id: `${layerId}-point`, sourceId: layerId });
};
