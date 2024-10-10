import { getAccessToken, getMap, storeLayer } from "../../utils/mapUtils";
import { geocodeLocation } from "../../api/geolocationApi";

export const drawRoute = async (
  start: string | [number, number],
  end: string | [number, number],
  profile: "driving" | "walking" | "cycling" = "driving"
): Promise<any> => {
  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  let startCoordinates;
  let endCoordinates;

  if (typeof start === "string") {
    startCoordinates = await geocodeLocation(start);
  } else {
    startCoordinates = start;
  }

  if (typeof end === "string") {
    endCoordinates = await geocodeLocation(end);
  } else {
    endCoordinates = end;
  }

  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${
    startCoordinates[1]
  },${startCoordinates[0]};${endCoordinates[1]},${
    endCoordinates[0]
  }?geometries=geojson&steps=true&access_token=${getAccessToken()}`;

  const response = await fetch(directionsUrl);
  const data = await response.json();
  if (data.code !== "Ok") {
    throw new Error(`${data.code} - ${data.message}`);
  }

  const route = data.routes[0];
  const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    properties: {},
    geometry: route.geometry,
  };

  // Remove existing route layer if present
  if (map.getSource("route")) {
    map.removeLayer("routeLayer");
    map.removeSource("route");
  }

  // Add new route to the map
  map.addSource("route", {
    type: "geojson",
    data: routeGeoJSON,
  });

  map.addLayer({
    id: "routeLayer",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ff0000",
      "line-width": 4,
    },
  });

  // Store the added route layer for future reference (e.g., after style change)
  storeLayer({ id: "routeLayer", sourceId: "route" });

  return route;
};
