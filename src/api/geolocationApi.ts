import { getAccessToken } from "../utils/mapUtils";

export const geocodeLocation = async (
  locationName: string
): Promise<[number, number]> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Mapbox access token is required");
  }

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      locationName
    )}.json?access_token=${accessToken}`
  );
  const data = await response.json();
  if (data.features && data.features.length > 0) {
    const { center } = data.features[0];
    return [center[1], center[0]];
  } else {
    throw new Error("Location not found");
  }
};
