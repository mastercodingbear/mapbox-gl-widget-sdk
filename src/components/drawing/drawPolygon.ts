import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { getMap, storeLayer } from "../../utils/mapUtils";

let draw: MapboxDraw;
let isDrawingToolInitialized = false;

export const initializeDrawingTool = (): void => {
  if (isDrawingToolInitialized) {
    console.warn("Drawing tool is already initialized.");
    return;
  }

  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });

  map.addControl(draw);
  isDrawingToolInitialized = true;

  // Store drawn features when created or updated
  map.on("draw.create", storeDrawnFeatures);
  map.on("draw.update", storeDrawnFeatures);
};

export const startDrawingPolygon = (): void => {
  if (!draw) {
    throw new Error(
      "Drawing tool not initialized. Call initializeDrawingTool first."
    );
  }

  draw.changeMode("draw_polygon");
};

const storeDrawnFeatures = (): void => {
  const map = getMap();
  if (!map) return;

  const drawnFeatures = draw.getAll();
  drawnFeatures.features.forEach((feature) => {
    const featureId = feature.id as string;
    if (map.getSource(featureId)) {
      map.removeLayer(featureId);
      map.removeSource(featureId);
    }

    map.addSource(featureId, {
      type: "geojson",
      data: feature,
    });

    map.addLayer({
      id: featureId,
      type: "fill",
      source: featureId,
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.5,
        "fill-outline-color": "#000",
      },
    });

    // Store the layer for future reference (e.g., after style change)
    storeLayer({ id: featureId, sourceId: featureId });
  });
};
