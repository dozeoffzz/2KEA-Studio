import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// 페이지 이동시 맨위로 이동
export default function ScrollToTop() {
  const { pathname } = useLocation();
  // 부드럽게 맨위로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
