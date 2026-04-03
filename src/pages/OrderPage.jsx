import React, { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import { authMeApi } from "../apis/authMeApi";
import SideMenuBar from "../components/common/SideMenuBar";
import OrderReview from "../components/common/OrderReview";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 160px;
  width: 100%;
`;

const OrderContainer = styled.section`
  width: 100%;
  max-width: 930px;
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
  display: grid;
  grid-template-columns: 1fr 1.8fr 1.8fr 1fr 1fr 1fr;
  width: 100%;
  padding: 0 12px 10px 12px;
  border-bottom: 1px solid ${Theme.colors.black};
  text-align: center;

  li {
    font-size: ${Theme.fontsize.desktop.medium};
  }
`;

const OrderedList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;
`;

const OrderListItem = styled.li`
  position: relative;
  min-height: 200px;
  padding: 25px 0 0 0;
  border-bottom: 1px solid ${Theme.colors.grayline};
  overflow: hidden;
`;

const OrderItemWrap = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.8fr 1.8fr 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  padding-bottom: 25px;

  img {
    width: 120px;
    height: 150px;
    object-fit: cover;
    margin: 0 auto;
  }
`;

const ReviewButton = styled.button`
  position: absolute;
  bottom: 25px;
  right: 0;
  width: 60px;
  height: 20px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.small};
  font-weight: 400;
`;

const ConfirmDeliverButton = styled(ReviewButton)``;

const OrderReviewWrap = styled.div`
  max-height: ${({ openAccordion }) => (openAccordion ? "450px" : "0")};
  background-color: ${Theme.colors.white};
  overflow: hidden;
  transition: max-height 0.6s ease-in-out;
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
  justify-content: center;
  gap: 37px;
  margin: 0 auto;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    width: 100px;

    &:disabled {
      color: ${Theme.colors.grayline};
      cursor: auto;
    }
  }

  li:not(:has(button)) {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
`;

const EmptyOrderList = styled.div`
  height: 100%;
`;

export default function OrderPage() {
  const [userInfo, setUserInfo] = useState(null);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);
  //전체 주문 내역 상태
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const [orderData, setOrderData] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    point: 0,
    delivery: { inDelivery: 0, done: 0 },
  });

  const handleAccordionToggle = (idx) => {
    setOpenAccordion((prev) => (prev === idx ? null : idx));
  };

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
    // 주문 내역
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    // 최신 순서대로 보여주기 위해 reverse 사용
    setOrderHistory(history.reverse());

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

  const handleConfirmDelivery = (orderId, productId) => {
    //기존 데이터 상태를 복사해서 바로 수정
    const updated = orderHistory.map((order) =>
      order.id === orderId
        ? {
            ...order,
            purchasedItems: order.purchasedItems.map((item) =>
              item.id === productId ? { ...item, status: "배송완료" } : item
            ),
          }
        : order
    );
    // 상태 업데이트
    setOrderHistory(updated);
    // 새로고침 해도 상태 유지를 위해 로컬스토리지에 저장
    // 다시 순서를 뒤집어서 원상복구 후 저장
    // 다시 안뒤집으면 useEffect에서만 reverse가 돌아서 데이터 순서가 꼬임
    localStorage.setItem("orderHistory", JSON.stringify([...updated].reverse()));
  };

  // 같은 날짜에 여러 상품 주문시 칸마다 상품별로 따로 배치하기
  // 저장된 데이터는 한번의 주문에 모든 상품이 묶여있고, 나열헤야하는건 개별 상품 단위
  // flatMap : 각 주문을 순회하면서 상품 배열을 꺼낸 후, 해당 배열들이 서로 다른 중첩 배열에 있지 않도록 바닥에 깔아서 하나로 합침
  // 이후 map 함수로 각 상품들을 하나씩 순회함
  const allPurchasedItems = orderHistory.flatMap((order) =>
    order.purchasedItems.map((item) => ({
      ...item, // 원래 상품이 가지고 있던 정보를 그대로 복사
      orderId: order.id, // 이 상품이 몇번째 주문에서 온 건지 적어줌 (데이터 식별용)
      orderDate: order.orderDate, // 상품(purchasedItems) 데이터에는 날짜가 없음, 따라서 부모 기준에 적힌 날짜를 가져옴
    }))
  );

  // 주문내역이 있든 없든 항상 4개의 칸 유지
  const itemDisplay = [...allPurchasedItems.slice(0, 4)];
  // 실제 들어온 데이터보다 남은곳이 많을 경우 남은곳은 빈칸으로 채움
  while (itemDisplay.length < 4) {
    itemDisplay.push(null);
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(allPurchasedItems.length / itemsPerPage) || 1;

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  // 폼 기본 입력 이벤트 방지
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
            <DateInfo>
              기본적으로 최근 3개월간의 자료가 조회되며, 지난 주문내역을 조회하실 수 있습니다.
            </DateInfo>
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
          {itemDisplay.map((item, idx) => {
            // 주문정보가 있다면 그 데이터를 집어넣고, 없으면 빈칸 집어넣기
            const itemLKey = item ? `${item.orderId}-${item.id}` : `empty-${idx}`;
            const ReviewAccordionOpen = openAccordion === itemLKey;

            const AccordionOpen = () => {
              handleAccordionToggle(itemLKey);
            };

            const ConfirmDelivery = () => {
              handleConfirmDelivery(item.orderId, item.id);
            };

            const CloseAccordion = () => {
              handleAccordionToggle(null);
            };
            return (
              <OrderListItem key={itemLKey}>
                {item ? (
                  <>
                    <OrderItemWrap>
                      <li>{item.orderDate}</li>
                      <li>
                        <img src={item.src[0]} alt={item.name} />
                      </li>
                      <li>{item.name}</li>
                      <li>{item.quantity}</li>
                      <li>{(item.price * item.quantity).toLocaleString()}₩</li>
                      <li>{item.status === "배송완료" ? "배송완료" : "배송중"}</li>
                      {item.status === "배송완료" ? (
                        <ReviewButton onClick={AccordionOpen}>리뷰작성</ReviewButton>
                      ) : (
                        <ConfirmDeliverButton onClick={ConfirmDelivery}>
                          배송확정
                        </ConfirmDeliverButton>
                      )}
                    </OrderItemWrap>
                    <OrderReviewWrap openAccordion={ReviewAccordionOpen}>
                      <OrderReview item={item} onComplete={CloseAccordion}></OrderReview>
                    </OrderReviewWrap>
                  </>
                ) : (
                  <EmptyOrderList></EmptyOrderList>
                )}
              </OrderListItem>
            );
          })}
        </OrderedList>
        <OrderutilityWrap>
          <OrderSearchBox as="form" onSubmit={handleSearch}>
            <SearchOrder type="text" />
            <SearchButton type="button">찾기</SearchButton>
          </OrderSearchBox>
          <OrderPagination>
            <li>
              <button type="button" onClick={goToFirstPage} disabled={currentPage === 1}>
                First
              </button>
            </li>
            <li>
              <button type="button" onClick={goToPrevPage} disabled={currentPage === 1}>
                Prev
              </button>
            </li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>
              <button type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </li>
            <li>
              <button type="button" onClick={goToLastPage} disabled={currentPage === totalPages}>
                Last
              </button>
            </li>
          </OrderPagination>
        </OrderutilityWrap>
      </OrderContainer>
      <SideMenuBar />
    </OrderPageContainer>
  );
}
