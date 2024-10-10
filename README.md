# Mapbox GL Widget SDK Documentation

## Overview

I created this Mapbox GL Widget SDK as part of a Senior Frontend Developer assessment. This JavaScript library is designed to help developers easily embed interactive maps using Mapbox GL, while abstracting away the complexities. The SDK makes it simple to switch map technologies without changing the API.

## Installation

Install the SDK as an NPM package:

```sh
npm install mapbox-gl-widget-sdk
```

## Usage

### Initializing the Map

To initialize a map, specify the container ID, center coordinates, zoom level, map style, and access token:

```typescript
import { initializeMap } from "mapbox-gl-widget-sdk";

initializeMap("mapContainer", {
  center: [0, 0],
  zoom: 2,
  style: "streets-v12",
  accessToken: "YOUR_MAPBOX_ACCESS_TOKEN",
});
```

### Adding Markers

You can add a custom marker by specifying latitude, longitude, and an optional label:

```typescript
import { createMarker } from "mapbox-gl-widget-sdk";

createMarker({
  id: "marker1",
  lat: 37.7749,
  lng: -122.4194,
  label: "San Francisco",
});
```

### Drawing Routes

Draw a route between two locations by providing start and end points along with the travel mode (e.g., driving, walking, cycling):

```typescript
import { drawRoute } from "mapbox-gl-widget-sdk";

drawRoute("startLocation", "endLocation", "driving");
```

### Toggle Map Styles

Toggle between satellite and street views:

```typescript
import { toggleMapStyle } from "mapbox-gl-widget-sdk";

toggleMapStyle();
```

### Drawing a Polygon

Initialize the drawing tool and start drawing a polygon on the map:

```typescript
import {
  initializeDrawingTool,
  startDrawingPolygon,
} from "mapbox-gl-widget-sdk";

initializeDrawingTool();
startDrawingPolygon();
```

### Adding a Heatmap Layer

Add a heatmap layer to visualize density data:

```typescript
import { addHeatmapLayer } from "mapbox-gl-widget-sdk";

const geoJsonData = {
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
};

addHeatmapLayer("heatmapLayerId", geoJsonData);
```

## Testing

Run unit tests using Jest:

```sh
npm run test
```

## License

MIT License.
