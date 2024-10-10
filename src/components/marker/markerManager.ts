import mapboxgl from "mapbox-gl";
import { getMap, storeLayer } from "../../utils/mapUtils";
import { geocodeLocation } from "../../api/geolocationApi";

interface MarkerOptions {
  id: string;
  lat?: number;
  lng?: number;
  label?: string;
  locationName?: string;
  customImageUrl?: string;
}

const markers: Record<string, mapboxgl.Marker> = {};

export const createMarker = async (options: MarkerOptions): Promise<void> => {
  const map = getMap();
  if (!map) {
    throw new Error("Map instance not found. Initialize the map first.");
  }

  let coordinates: [number, number];
  if (options.lat !== undefined && options.lng !== undefined) {
    coordinates = [options.lng, options.lat];
  } else if (options.locationName) {
    coordinates = await geocodeLocation(options.locationName);
  } else {
    throw new Error(
      "Either latitude and longitude or a location name must be provided"
    );
  }

  const el = document.createElement("div");
  el.className = "marker";
  if (options.customImageUrl) {
    const img = document.createElement("img");
    img.src = options.customImageUrl;
    img.alt = options.label || "";
    img.style.width = "30px";
    img.style.height = "30px";
    el.appendChild(img);
  } else {
    el.innerText = options.label || "";
  }

  const marker = new mapboxgl.Marker(el)
    .setLngLat([coordinates[1], coordinates[0]])
    .setPopup(
      options.label ? new mapboxgl.Popup().setText(options.label) : undefined
    )
    .addTo(map);

  markers[options.id] = marker;

  // Store the marker layer for future reference (e.g., after style change)
  storeLayer({ id: options.id, sourceId: options.id });
};

export const addMarkersFromGeoJSON = (
  geoJson: GeoJSON.FeatureCollection<GeoJSON.Point>
): void => {
  geoJson.features.forEach((feature) => {
    const { coordinates } = feature.geometry;
    const label = feature.properties?.label ?? "";
    const id =
      feature.properties?.id ?? Math.random().toString(36).substr(2, 9);
    createMarker({ id, lat: coordinates[1], lng: coordinates[0], label });
  });
};

export const removeMarkerById = (id: string): void => {
  if (markers[id]) {
    markers[id].remove();
    delete markers[id];
  }
};
