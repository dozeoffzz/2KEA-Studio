import OrderModal from "./components/modals/OrderModal";
import DeleteModal from "./components/modals/DeleteModal";
import SignUpModal from "./components/modals/SignUpModal";
import { Route, Routes } from "react-router-dom";
import DetailedPage from "./pages/DetailedPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";
import SeatingListPage from "./pages/SeatingListPage";
import TableListPage from "./pages/TableListPage";
import LightingListPage from "./pages/LightingListPage";
import AllListPage from "./pages/AllListPage";
import MainIntroModal from "./components/modals/MainIntroModal";
import InstagramModal from "./components/modals/InstagramModal";
import NotFoundPage from "./pages/NotFoundPage";
import CompletedPage from "./pages/CompletedPage";
import ScrollToTop from "./components/common/ScrollToTop";
import MyPage from "./pages/MyPage";
import OrderPage from "./pages/OrderPage";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <>
      {/* 페이지 이동시 스크롤 맨위로 이동 */}
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<AllListPage />} />
          <Route path="/products/seating" element={<SeatingListPage />} />
          <Route path="/products/tables" element={<TableListPage />} />
          <Route path="/products/lighting" element={<LightingListPage />} />
          <Route path="/products/:category/:id" element={<DetailedPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/me" element={<MyPage />} />
          <Route path="/auth/me/order" element={<OrderPage />} />
          <Route path="/auth/me/review" element={<ReviewPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
