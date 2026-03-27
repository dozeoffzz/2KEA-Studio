import { apiClient } from "./apiClient";

export async function authSignupApi(signupData) {
  const response = await apiClient("/auth/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
  });
  const data = response.json();
  return data;
}
