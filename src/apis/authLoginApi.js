import { apiClient } from "./apiClient";

export async function authLoginApi({ id, password }) {
  try {
    const response = await apiClient(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        id,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "false");
  }
}
