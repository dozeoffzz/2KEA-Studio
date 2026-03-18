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
import InstagramModal from "./components/modals/InstagramModal";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detailpage/:id" element={<DetailedPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/allproducts" element={<AllListPage />} />
          <Route path="/seatingproducts" element={<SeatingListPage />} />
          <Route path="/tableproducts" element={<TableListPage />} />
          <Route path="/lightingproducts" element={<LightingListPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}
