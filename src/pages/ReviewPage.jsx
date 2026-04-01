import React, { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import { authMeApi } from "../apis/authMeApi";

export default function ReviewPage() {
  const [userInfo, setUserInfo] = useState(null);
  // 프로필 이미지 변경을 위한 상태값
  const [profileImg, setProfileImg] = useState(defaultProfile);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);

  const [orderData, setOrderData] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    point: 0,
    delivery: { inDelivery: 0, done: 0 },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authMeApi();
        if (res.success) {
          setUserInfo(res.userInfo);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchUser();
    // 상품 주문한 아이템
    const order = JSON.parse(localStorage.getItem("orderData")) || {};
    // 주문하고 얻은 포인트
    const point = Number(localStorage.getItem("point") || 0);
    // 배송중,배송완료 상태
    const delivery = JSON.parse(localStorage.getItem("delivery")) || {
      inDelivery: 0,
      done: 0,
    };

    setOrderData({
      // 주문한 총 갯수
      totalQuantity: order.totalQuantity || 0,
      // 주문한 총 갯수
      totalPrice: order.totalPrice || 0,
      // 포인트
      point,
      // 배송 상태
      delivery,
    });
  }, []);

  return <MyProfile userInfo={userInfo} orderData={orderData} cartItem={cartItem} profileImg={profileImg} />;
}
