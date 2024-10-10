import { getMap, restoreLayers } from "../utils/mapUtils";
import { geocodeLocation } from "../api/geolocationApi";

let currentStyle = "streets-v12";

export const flyToLocation = async (
  location: string | [number, number]
): Promise<void> => {
  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  let coordinates;
  if (typeof location === "string") {
    coordinates = await geocodeLocation(location);
  } else {
    coordinates = location;
  }

  map.flyTo({ center: [coordinates[1], coordinates[0]], essential: true });
};

export const toggleMapStyle = (): void => {
  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  currentStyle =
    currentStyle === "streets-v12" ? "satellite-streets-v12" : "streets-v12";
  map.setStyle(`mapbox://styles/mapbox/${currentStyle}`);

  // Ensure the layers are restored after style change
  map.on("style.load", () => {
    restoreLayers();
  });
};
