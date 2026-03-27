import { apiClient } from "./apiClient";

export async function fetchProducts({ category = "all", page = 1, limit = 7 }) {
  try {
    const query = new URLSearchParams();
    // 카테고리 all이면 category를 보내지 않음(products)
    if (category && category !== "all") {
      query.append("category", category);
    }

    query.append("page", page);
    query.append("limit", limit);

    const response = await apiClient(`/products?${query.toString()}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "false");
  }
}
