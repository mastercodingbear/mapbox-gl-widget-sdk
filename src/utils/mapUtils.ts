let map: mapboxgl.Map | undefined;
let accessToken: string | undefined;
const storedLayers: { id: string; sourceId: string }[] = [];

export const setMap = (newMap: mapboxgl.Map) => {
  map = newMap;
};

export const getMap = (): mapboxgl.Map | undefined => {
  return map;
};

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = (): string | undefined => {
  return accessToken;
};

export const storeLayer = (layer: { id: string; sourceId: string }) => {
  storedLayers.push(layer);
};

export const getStoredLayers = (): { id: string; sourceId: string }[] => {
  return storedLayers;
};

export const restoreLayers = () => {
  const map = getMap();
  if (!map) return;

  storedLayers.forEach((layer) => {
    if (map.getSource(layer.sourceId)) {
      map.addLayer({
        id: layer.id,
        type: layer.id.includes("route") ? "line" : "fill",
        source: layer.sourceId,
        layout: layer.id.includes("route")
          ? {
              "line-join": "round",
              "line-cap": "round",
            }
          : {},
        paint: layer.id.includes("route")
          ? {
              "line-color": "#ff0000",
              "line-width": 4,
            }
          : {
              "fill-color": "#088",
              "fill-opacity": 0.5,
              "fill-outline-color": "#000",
            },
      });
    }
  });
};
