import { apiClient } from "./apiClient";

export async function fetchProducts() {
  try {
    const response = await apiClient("/products");

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.log("false :");
    console.log(error);
  }
}
