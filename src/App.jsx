<<<<<<< HEAD
import React from "react";
import Header from "./components/Header";
import Signup from "./pages/Signup";
=======
import EventModal from "./components/modals/EventModal";
import OrderModal from "./components/modals/OrderModal";
import DeleteModal from "./components/modals/DeleteModal";
import ReservationModal from "./components/modals/ReservationModal";
import SignUpModal from "./components/modals/SignUpModal";
import TitleModal from "./components/modals/TitleModal";
import { Route, Routes } from "react-router-dom";
import DetailedPage from "./pages/DetailedPage";
import ShoppingPage from "./pages/ShoppingCartPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";
import SeatingListPage from "./pages/SeatingListPage";
import TableListPage from "./pages/TableListPage";
import LightingListPage from "./pages/LightingListPage";
import AllListPage from "./pages/AllListPage";
>>>>>>> dev

export default function App() {
  return (
    <div>
<<<<<<< HEAD
      <Header />

      {/* 회원가입 페이지 */}
      <Signup />
=======
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/detailpage/:id" element={<DetailedPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/alllist" element={<AllListPage />} />
          <Route path="/seatinglist" element={<SeatingListPage />} />
          <Route path="/tablelist" element={<TableListPage />} />
          <Route path="/lightinglist" element={<LightingListPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
>>>>>>> dev
    </div>
  );
}
