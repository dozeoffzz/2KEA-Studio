import React, { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import { authMeApi } from "../apis/authMeApi";
import SideMenuBar from "../components/common/SideMenuBar";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 160px;
  width: 100%;
`;

const OrderContainer = styled.section`
  width: 915px;
  height: auto;
`;

const OrderInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const OrderDetail = styled.p`
  text-align: center;
`;

const DateFilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateFilter = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 256px;

  li {
    font-size: ${Theme.fontsize.desktop.medium};
  }
`;

const DateInfo = styled.p`
  font-size: ${Theme.fontsize.desktop.mini};
`;

const OrderInfo = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 12px 10px 12px;
  border-bottom: 1px solid ${Theme.colors.black};

  li {
    font-size: ${Theme.fontsize.desktop.medium};
  }
`;

const OrderedList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;

  li {
    height: 200px;
    padding: 25px 0;
    border-bottom: 1px solid ${Theme.colors.grayline};
  }
`;

const OrderutilityWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-top: 80px;
`;

const OrderSearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;

const SearchOrder = styled.input`
  outline: none;
  width: 300px;
  height: 30px;
  padding: 0 6px;
  border: 1px solid ${Theme.colors.black};
`;

const SearchButton = styled.button`
  width: 120px;
  height: 30px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
`;

const OrderPagination = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 747px;
  margin: 0 auto;
`;

export default function OrderPage() {
  const [userInfo, setUserInfo] = useState(null);
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <OrderPageContainer>
      <MyProfile userInfo={userInfo} orderData={orderData} cartItem={cartItem} />
      <OrderContainer>
        <OrderInfoWrap>
          <OrderDetail>주문내역</OrderDetail>
          <DateFilterWrap>
            <DateFilter>
              <li>오늘</li>
              <li>1주일</li>
              <li>1개월</li>
              <li>3개월</li>
              <li>6개월</li>
            </DateFilter>
            <DateInfo>기본적으로 최근 3개월간의 자료가 조회되며, 지난 주문내역을 조회하실 수 있습니다.</DateInfo>
          </DateFilterWrap>
          <OrderInfo>
            <li>주문일자:</li>
            <li>상품:</li>
            <li>상품정보:</li>
            <li>수량:</li>
            <li>금액:</li>
            <li>상태:</li>
          </OrderInfo>
        </OrderInfoWrap>
        <OrderedList>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </OrderedList>
        <OrderutilityWrap>
          <OrderSearchBox as="form" onSubmit={handleSearch}>
            <SearchOrder type="text" />
            <SearchButton type="button">찾기</SearchButton>
          </OrderSearchBox>
          <OrderPagination>
            <li>
              <button>First</button>
            </li>
            <li>
              <button>Prev</button>
            </li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>
              <button>Next</button>
            </li>
            <li>
              <button>Last</button>
            </li>
          </OrderPagination>
        </OrderutilityWrap>
      </OrderContainer>
      <SideMenuBar />
    </OrderPageContainer>
  );
}
