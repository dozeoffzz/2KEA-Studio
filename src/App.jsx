import EventModal from "./components/modals/EventModal";
import OrderModal from "./components/modals/OrderModal";
import DeleteModal from "./components/modals/DeleteModal";
import ReservationModal from "./components/modals/ReservationModal";
import SignUpModal from "./components/modals/SignUpModal";
import TitleModal from "./components/modals/TitleModal";
import ItemListPage from "./pages/ItemListPage";
import { Route, Routes } from "react-router-dom";
import DetailedPage from "./pages/DetailedPage";
import ShoppingPage from "./pages/ShoppingPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detailpage/:id" element={<DetailedPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/itemlist" element={<ItemListPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}
