import mapboxgl from "mapbox-gl";
import { setMap, setAccessToken } from "../utils/mapUtils";
import { MapOptions } from "../types/MapOptions";

export const initializeMap = (containerId: string, options: MapOptions) => {
  if (!options.accessToken) {
    throw new Error("Mapbox access token is required");
  }

  mapboxgl.accessToken = options.accessToken;
  setAccessToken(options.accessToken);

  const map = new mapboxgl.Map({
    container: containerId,
    style: `mapbox://styles/mapbox/${options.style}`,
    center: options.center,
    zoom: options.zoom,
  });

  setMap(map);

  // Add default map controls
  map.addControl(new mapboxgl.NavigationControl());

  return map;
};
