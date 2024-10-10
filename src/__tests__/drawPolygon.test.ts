import { initializeMap } from "../controllers/mapInitialization";
import {
  initializeDrawingTool,
  startDrawingPolygon,
} from "../components/drawing/drawPolygon";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { getMap } from "../utils/mapUtils";

jest.mock("@mapbox/mapbox-gl-draw", () => {
  return jest.fn().mockImplementation(() => ({
    changeMode: jest.fn(),
    add: jest.fn(),
    getAll: jest.fn(() => ({
      features: [],
    })),
  }));
});

beforeEach(() => {
  document.body.innerHTML = '<div id="mapContainer"></div>';
  initializeMap("mapContainer", {
    center: [0, 0],
    zoom: 2,
    style: "streets-v12",
    accessToken: "MAPBOX_ACCESS_TOKEN",
  });
  initializeDrawingTool();
});

test("should start drawing polygon", () => {
  startDrawingPolygon();
  const map = getMap();
  expect(map?.addControl).toHaveBeenCalled();
  expect(MapboxDraw).toHaveBeenCalled();
});
