import { apiClient } from "./apiClient";

export async function detailApi(productId) {
  try {
    const response = await apiClient(`/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "false");
  }
}
