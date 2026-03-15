import React from "react";
import Header from "./components/Header";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div>
      <Header />

      {/* 회원가입 페이지 */}
      <Signup />
    </div>
  );
}
