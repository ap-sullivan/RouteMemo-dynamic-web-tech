// util function to add photo uri to a run 

import AsyncStorage from "@react-native-async-storage/async-storage";

export const addPhotoToRun = async (runId, uri) => {
  const existing = await AsyncStorage.getItem("activities");
  const parsed = existing ? JSON.parse(existing) : [];

  // map through activities and add the new photo uri to the photos array of the matching runId
  const updated = parsed.map((item) =>
    item.id === runId
      ? { ...item, photos: [...(item.photos || []), uri] }
      : item
  );

  await AsyncStorage.setItem("activities", JSON.stringify(updated));

  return updated.find((item) => item.id === runId); 
};