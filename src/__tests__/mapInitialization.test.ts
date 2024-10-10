import { initializeMap } from "../controllers/mapInitialization";
import { getMap } from "../utils/mapUtils";

test("should initialize map", () => {
  document.body.innerHTML = '<div id="mapContainer"></div>';
  initializeMap("mapContainer", {
    center: [0, 0],
    zoom: 2,
    style: "streets-v12",
    accessToken: "MAPBOX_ACCESS_TOKEN",
  });

  const map = getMap();
  expect(map).not.toBeNull();
  expect(map?.getCenter()).toEqual({ lat: 0, lng: 0 });
  expect(map?.getZoom()).toBe(2);
});
