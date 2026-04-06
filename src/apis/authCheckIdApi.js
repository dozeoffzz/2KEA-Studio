import { apiClient } from "./apiClient";

// 아이디 중복 확인
export async function authcheckIdApi(id) {
  const res = await apiClient(`/auth/check-id`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });
  return res.json();
}
