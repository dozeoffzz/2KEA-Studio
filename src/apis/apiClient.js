import { useAuthStore } from "../stores/useAuthStore";

// const BASE_URL = "/api/team2";
const BASE_URL = "https://api.mylecture.kr/api/team2";

export async function apiClient(endpoint, option = {}) {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...option.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`API에러: ${response.status}`);
  }
  return response;
}
