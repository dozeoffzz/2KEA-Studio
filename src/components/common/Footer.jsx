import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div
      style={{
        height: "350px",
        borderTop: "1px solid #0c0c0c",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NavLink to={"/"}>메인 페이지로 이동</NavLink>
      <NavLink to={"/allproducts"}>아이템 리스트 페이지로 이동</NavLink>
      <NavLink to={"/cart"}>쇼핑 카트 페이지로 이동</NavLink>
      <NavLink to={"/login"}>로그인 페이지로 이동</NavLink>
    </div>
  );
}
