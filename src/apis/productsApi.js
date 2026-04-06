import { apiClient } from "./apiClient";

// 카테고리 all, 페이지 1, 페이지당 가져올 상품 개수 7 (기본값)
export async function fetchProducts({ category = "all", page = 1, limit = 7 }) {
  try {
    // URLSearchParams는 자동으로  products?category=seating 이런 형태를 만들어준다
    const query = new URLSearchParams();
    // 카테고리 all이면 category를 보내지 않음(products)
    if (category && category !== "all") {
      // products?category=seating (seating 카테고리)
      query.append("category", category);
    }
    // 페이지 데이터만 반환하도록 (전체 말고 1페이지에 해당하는 데이터만)
    query.append("page", page);
    // 상품을 몇개 가져와서 보여줄지 (기본값 7)
    query.append("limit", limit);
    // 총 상품 28개에서 7개씩 보여주니까 전체 페이지 4

    const response = await apiClient(`/products?${query.toString()}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "false");
  }
}
