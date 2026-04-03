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
    if (error.message.includes("401")) {
      // alert("아이디 또는 비밀번호가 올바르지 않습니다");
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다");
    }
    throw error;
  }
}
