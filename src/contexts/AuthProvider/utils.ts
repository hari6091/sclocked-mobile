import { IUser } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setUserLocalStorage(user: IUser | null) {
  await AsyncStorage.setItem("u", JSON.stringify(user));
}

export async function getUserLocalStorage() {
  const json = await AsyncStorage.getItem("u");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}
