// __mocks__/mapbox-gl.ts
const mapboxgl = {
  Map: jest.fn(() => ({
    on: jest.fn(),
    addControl: jest.fn(),
    remove: jest.fn(),
    getSource: jest.fn(),
    getLayer: jest.fn(),
    setCenter: jest.fn(),
    setZoom: jest.fn(),
    flyTo: jest.fn(),
    setStyle: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    getStyle: jest.fn(() => ({ name: "satellite-streets-v12" })),
    getCenter: jest.fn(() => ({ lat: 0, lng: 0 })),
    getZoom: jest.fn(() => 2),
  })),
  NavigationControl: jest.fn(),
};

export default mapboxgl;
