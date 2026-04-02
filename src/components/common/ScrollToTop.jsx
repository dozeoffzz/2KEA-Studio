import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// 페이지 이동시 맨위로 이동
export default function ScrollToTop() {
  const { pathname } = useLocation();
  // 부드럽게 맨위로 이동
  // 렌더링 지연 시간 고려해 딜레이 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
