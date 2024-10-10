import { initializeMap } from "../controllers/mapInitialization";
import { addHeatmapLayer } from "../components/heatmap/heatmapLayer";
import { getMap } from "../utils/mapUtils";

beforeEach(() => {
  document.body.innerHTML = '<div id="mapContainer"></div>';
  initializeMap("mapContainer", {
    center: [0, 0],
    zoom: 2,
    style: "streets-v12",
    accessToken: "MAPBOX_ACCESS_TOKEN",
  });
});

test("should add heatmap layer", () => {
  const geoJsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
        properties: {
          mag: 5,
        },
      },
    ],
  } as GeoJSON.FeatureCollection<GeoJSON.Point>;

  addHeatmapLayer("heatmapLayerId", geoJsonData);
  const map = getMap();
  expect(map?.addSource).toHaveBeenCalledWith(
    "heatmapLayerId",
    expect.anything()
  );
  expect(map?.addLayer).toHaveBeenCalledTimes(2);
});
