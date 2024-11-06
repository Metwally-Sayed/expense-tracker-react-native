import AsyncStorage from "@react-native-async-storage/async-storage";

export const generateRandomId = (length = 10): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const storeData = async <T extends { id: string }>(
  value: T,
  key: string
) => {
  try {
    // Retrieve existing data
    const prevData = await getData(key);

    // Check if item exists by ID; if so, update it; otherwise, add as new
    const updatedData = prevData.some((item: T) => item.id === value.id)
      ? prevData.map((item: T) => (item.id === value.id ? value : item))
      : [...prevData, value];

    // Save updated data
    await AsyncStorage.setItem(key, JSON.stringify(updatedData));
    console.log("Data successfully updated in AsyncStorage");
  } catch (e) {
    console.log("Error updating AsyncStorage:", e);
  }
};

export const getData = async (key: string): Promise<any[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(jsonValue, "Retrieved JSON Value from AsyncStorage");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log("Error retrieving data:", e);
    return []; // Ensure an array is returned in case of error
  }
};
