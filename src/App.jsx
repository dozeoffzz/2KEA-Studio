import EventModal from "./components/modals/EventModal";
import OrderModal from "./components/modals/OrderModal";
import DeleteModal from "./components/modals/DeleteModal";
import ReservationModal from "./components/modals/ReservationModal";
import SignUpModal from "./components/modals/SignUpModal";
import TitleModal from "./components/modals/TitleModal";
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

export default function App() {
  return (
    <div>
      {MainPage && <MainIntroModal />}

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:category/:id" element={<DetailedPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/products" element={<AllListPage />} />
          <Route path="/products/seating" element={<SeatingListPage />} />
          <Route path="/products/tables" element={<TableListPage />} />
          <Route path="/products/lighting" element={<LightingListPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
