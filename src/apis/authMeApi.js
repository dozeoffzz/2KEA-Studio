import { apiClient } from "./apiClient";

export async function authMeApi() {
  const response = await apiClient("/auth/me", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
