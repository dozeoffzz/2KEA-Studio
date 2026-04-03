import { useAuthStore } from "../stores/useAuthStore";

// const BASE_URL = "/api/team2";
const BASE_URL = "https://api.mylecture.kr/api/team2";

export async function apiClient(endpoint, option = {}) {
  const token = useAuthStore.getState().token;

  const isAuthFree = endpoint.includes("/auth/login") || endpoint.includes("/auth/signup");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
      ...(!isAuthFree && token ? { Authorization: `Bearer ${token}` } : {}),
      ...option.headers,
    },
  });
  if (response.status === 401 && !isAuthFree) {
    localStorage.removeItem("token");
    useAuthStore.getState().logout();

    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");

    window.location.href = "/auth/login";
    return;
  }
  if (!response.ok) {
    throw new Error(`API에러: ${response.status}`);
  }
  return response;
}
