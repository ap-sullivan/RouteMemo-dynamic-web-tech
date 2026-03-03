//  helper function for working out distance from an array of coordinates using haversine formula / haversine package
import haversine from "haversine-distance";

export const calculateDistance = (coords) => {
  if (!coords || coords.length < 2) return 0;

  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    total += haversine(coords[i - 1], coords[i]);
  }
  return total;
};