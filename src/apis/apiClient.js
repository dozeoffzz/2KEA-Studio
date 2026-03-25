const BASE_URL = "/api/team2";

export async function apiClient(endpoint, option = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...option,
    headers: {
      "Content-Type": "application/json",
      ...option.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`API에러: ${response.status}`);
  }
  return response;
}
