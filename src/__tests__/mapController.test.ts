import { initializeMap } from "../controllers/mapInitialization";
import { toggleMapStyle, flyToLocation } from "../controllers/mapController";
import { getMap } from "../utils/mapUtils";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  document.body.innerHTML = '<div id="mapContainer"></div>';
  initializeMap("mapContainer", {
    center: [0, 0],
    zoom: 2,
    style: "streets-v12",
    accessToken: "MAPBOX_ACCESS_TOKEN",
  });
  fetchMock.resetMocks();
});

test("should toggle map style", () => {
  toggleMapStyle();
  const map = getMap();
  expect(map?.getStyle()?.name).toBe("satellite-streets-v12");
});

test("should fly to specified location", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      features: [
        {
          center: [-122.4194, 37.7749],
        },
      ],
    })
  );
  await flyToLocation("San Francisco, CA");
  const map = getMap();
  expect(map?.flyTo).toHaveBeenCalledWith({
    center: [-122.4194, 37.7749],
    essential: true,
  });
});
