import { apiClient } from "./apiClient";

export async function fetchMain() {
  try {
    const response = await apiClient(`/main`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("false", error);
  }
}
