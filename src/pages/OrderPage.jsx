import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink, useNavigate } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import { authMeApi } from "../apis/authMeApi";
import SideMenuBar from "../components/common/SideMenuBar";
import OrderReview from "../components/common/OrderReview";

//날짜 필터링을 위한 배열 선언
const FILTER_DATES = ["전체", "오늘", "1주일", "1개월", "3개월"];

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 160px;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 20px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0 20px;
    gap: 100px;
  }

  /* @media screen and (max-width: 467px) {
    padding: 0 10px;
  } */
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

const DateFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;

const DateFilterWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 256px;
`;

const DateFilter = styled.li`
  color: ${({ isActive }) => (isActive ? Theme.colors.blacktext : Theme.colors.textsecondary)};
  font-size: ${Theme.fontsize.desktop.medium};
  cursor: pointer;
`;

const DateInfo = styled.p`
  font-size: ${Theme.fontsize.desktop.mini};

  ${({ theme }) => theme.media.mobile} {
    border-bottom: 2px solid ${Theme.colors.grayline};
    padding-bottom: 20px;
    font-size: 11px;
  }
`;

const MobileBr = styled.br`
  display: none;

  @media screen and (max-width: 440px) {
    display: block;
  }
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

  ${({ theme }) => theme.media.tablet} {
    li {
      font-size: ${Theme.fontsize.tablet.content};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    li {
      font-size: ${Theme.fontsize.mobile.small};
    }
  }
  @media screen and (max-width: 650px) {
    display: none;
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
  border-bottom: 1px solid ${Theme.colors.grayline};
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    min-height: auto;
    padding: 16px 0 0 0;
  }
`;

const OrderItemWrap = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.8fr 1.8fr 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
  min-height: 200px;

  img {
    width: 120px;
    height: 150px;
    object-fit: cover;
    margin: 0 auto;
  }

  ${({ theme }) => theme.media.tablet} {
    li {
      font-size: ${Theme.fontsize.tablet.small};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    li {
      font-size: ${Theme.fontsize.mobile.mini};
    }
  }
  // 모바일에서는 각 칸마다 상품별로 따로 배치하기
  @media screen and (max-width: 650px) {
    grid-template-columns: 120px;
    // 각 칸마다 상품별로 따로 배치
    grid-template-areas:
      "date date"
      "image name"
      "image quantity"
      "image price"
      "image status"
      "button button";
    row-gap: 3px;
    align-items: start;
    text-align: left;
    padding-bottom: 50px;

    li:nth-of-type(1) {
      grid-area: date;
    }

    li:nth-of-type(2) {
      grid-area: image;
    }

    li:nth-of-type(3) {
      grid-area: name;
      text-align: right;
    }

    li:nth-of-type(4) {
      grid-area: quantity;
      text-align: right;
      margin-top: -4px;
    }

    li:nth-of-type(5) {
      grid-area: price;
      text-align: right;
      margin-top: -4px;
    }

    li:nth-of-type(6) {
      grid-area: status;
      text-align: right;
      margin-top: -4px;
    }
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

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const ConfirmDeliverButton = styled(ReviewButton)``;

const OrderReviewWrap = styled.div`
  max-height: ${({ openAccordion }) => (openAccordion ? "450px" : "0")};
  background-color: ${Theme.colors.white};
  overflow: hidden;
  transition: max-height 0.6s ease-in-out;

  ${({ theme }) => theme.media.mobile} {
    max-height: ${({ openAccordion }) => (openAccordion ? "700px" : "0")};
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

  ${({ theme }) => theme.media.mobile} {
    gap: 10px;
  }
`;

const SearchOrder = styled.input`
  outline: none;
  width: 300px;
  height: 30px;
  padding: 0 6px;
  border: 1px solid ${Theme.colors.black};

  ${({ theme }) => theme.media.tablet} {
    height: 27px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 300px;
    min-width: 150px;
    margin: 10px;
    height: 25px;
  }
`;

const SearchButton = styled.button`
  width: 120px;
  height: 30px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};

  ${({ theme }) => theme.media.tablet} {
    width: 100px;
    height: 27px;
    font-size: ${Theme.fontsize.tablet.medium};
  }

  ${({ theme }) => theme.media.mobile} {
    width: 80px;
    height: 25px;
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const OrderPaginationWrap = styled.ul`
  display: flex;
  justify-content: center;
  gap: 37px;
  margin: 0 auto;
  width: 100%;
`;

const PaginationList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
`;

const PaginationButton = styled.button`
  width: 100%;
  height: 100%;

  &:disabled {
    color: ${Theme.colors.textsecondary};
    cursor: auto;
  }
`;

const PageNumber = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const PageNumberButton = styled.button`
  width: 100%;
  height: 100%;
  color: ${({ isActive }) => (isActive ? Theme.colors.blacktext : Theme.colors.textsecondary)};
`;

const EmptyOrderList = styled.div`
  height: 100%;
  min-height: 200px;
`;

export default function OrderPage() {
  const [userInfo, setUserInfo] = useState(null);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);
  //전체 주문 내역 상태
  const [orderHistory, setOrderHistory] = useState([]);
  //현재 주문내역 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  //아코디언 메뉴 오픈 상태
  const [openAccordion, setOpenAccordion] = useState(null);
  // 주문 날짜 필터링(기본값 전체)
  const [dateFilter, setDateFilter] = useState("전체");
  // 아코디언 열 때 해당 아이템 리뷰를 가져와 폼 초기값
  const [editingReview, setEditingReview] = useState(null);
  // 검색창에 입력중일때
  const [keyword, setKeyword] = useState("");
  // 찾기 버튼 눌렀을 때만
  const [appliedKeyword, setAppliedKeyword] = useState("");

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
            purchasedItems: order.purchasedItems.map((item) => {
              // 이미 배송완료면 그대로 반환 (중복 방지 핵심)
              if (item.id === productId && item.status !== "배송완료") {
                return { ...item, status: "배송완료" };
              }
              return item;
            }),
          }
        : order,
    );

    // 상태 업데이트
    setOrderHistory(updated);
    // delivery 상태 업데이트
    const delivery = JSON.parse(localStorage.getItem("delivery")) || {
      inDelivery: 0,
      done: 0,
    };
    const targetOrder = orderHistory.find((o) => o.id === orderId);
    const targetItem = targetOrder?.purchasedItems.find((i) => i.id === productId);

    // 기존 상태가 "배송중"일 때만 증가
    if (targetItem && targetItem.status !== "배송완료") {
      const newDelivery = {
        inDelivery: Math.max((delivery.inDelivery || 1) - 1, 0),
        done: (delivery.done || 0) + 1,
      };

      localStorage.setItem("delivery", JSON.stringify(newDelivery));

      setOrderData((prev) => ({
        ...prev,
        delivery: newDelivery,
      }));
    }
    // 새로고침 해도 상태 유지를 위해 로컬스토리지에 저장
    // 다시 순서를 뒤집어서 원상복구 후 저장
    // 다시 안뒤집으면 useEffect에서만 reverse가 돌아서 데이터 순서가 꼬임
    localStorage.setItem("orderHistory", JSON.stringify([...updated].reverse()));
  };

  // 주문 히스토리가 바뀔 때마다 최신 로컬스토리지 읽기
  const allPurchasedItems = useMemo(() => {
    //같은 날짜에 주문한 내역(다차원 배열)을 1차원 상품 배열로 펼치기
    return orderHistory.reduce((acc, order) => {
      order.purchasedItems.forEach((item) => {
        //기존 상품에 주문ID, 주문날짜, 리뷰 여부 데이터 합치기
        acc.push({
          ...item,
          orderId: order.id,
          orderDate: order.orderDate,
        });
      });
      return acc;
    }, []);
  }, [orderHistory]);

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
  const handleSearch = () => {
    setAppliedKeyword(keyword);
    setCurrentPage(1);
  };

  const keyBoardSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getFilterDate = (period) => {
    if (period == "전체") return null;

    const now = new Date();

    switch (period) {
      case "1주일":
        now.setDate(now.getDate() - 7);
        break;
      case "1개월":
        now.setMonth(now.getMonth() - 1);
        break;
      case "3개월":
        now.setMonth(now.getMonth() - 3);
        break;
      // 오늘 일때는 아무것도 수정하지 않음
      case "오늘":
        break;
      // 혹시 모를 에러 방지
      default:
        break;
    }
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // 선택된 날짜 필터에 따라 화면에 표시
  const filteredItems = allPurchasedItems.filter((item) => {
    const startDate = getFilterDate(dateFilter);
    // startDate가 null 이면 전체 상태 이므로 무조건 true
    // 특정 기간이 선택됐다면 주문일이 기준일보다 크거나 같은지 확인
    const dateMatch = startDate === null || item.orderDate >= startDate;
    const nameMatch = item.name.toLowerCase().includes(appliedKeyword.toLowerCase().trim()); //단어가 상품명에 포함 되어 있는지 확인
    return dateMatch && nameMatch; // 날짜 조건과 이름 조건이 모두 같아야 화면에 표시
  });

  //날짜 필터 입력 필터링 클릭 이벤트
  const handleFilterClick = (period) => {
    setDateFilter(period);
    setCurrentPage(1);
  };

  //주문내역 단어 검색
  const searchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  // 한 페이지에 보일 주문 내역 갯수
  const itemsPerPage = 4;
  //필터링된 아이템 갯수에 따라 페이지 생성
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  //날짜필터 등 이유로 페이지 수가 줄어들 경우 자동으로 1페이지로 보내기
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredItems, totalPages]);

  // 현재 페이지 번호에 맞춰서 itemsPerPage만큼 즉 4개씩 잘라내기
  const itemDisplay = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // 실제 들어온 데이터보다 남은곳이 많을 경우 남은곳은 빈칸으로 채움
  while (itemDisplay.length < 4) {
    itemDisplay.push(null);
  }

  // 한번에 보여줄 리뷰 페이지 갯수
  const pagesPerGroup = 3;

  // 현재 페이지 그룹 시작 번호 계산 (1, 4, 7....)
  const startPage = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
  // 현재 페이지 그룹 끝 번호 계산 (3, 6, 9....)
  // 전체 페이지 수를 넘기지 않게 Math.min 함수로 둘중 더 작은쪽 선택
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  // 화면에 보일 페이지 번호 배열 생성
  const pageNumbers = [];

  //페이지 끝 번호까지 존재하는 페이지 갯수 추가
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleReviewComplete = () => {
    setOpenAccordion(null);
  };
  return (
    <OrderPageContainer>
      <MyProfile userInfo={userInfo} orderData={orderData} cartItem={cartItem} />
      <OrderContainer>
        <OrderInfoWrap>
          <OrderDetail>주문내역</OrderDetail>
          <DateFilterContainer>
            <DateFilterWrap>
              {FILTER_DATES.map((p) => (
                <DateFilter key={p} isActive={dateFilter === p} onClick={() => handleFilterClick(p)}>
                  {p}
                </DateFilter>
              ))}
            </DateFilterWrap>
            <DateInfo>최근 3개월간의 자료가 조회되며, 지난 주문내역을 조회하실 수 있습니다.</DateInfo>
          </DateFilterContainer>
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
            //각각 주문 정보에 알맞는 아코디언 열기
            const ReviewAccordionOpen = openAccordion === itemLKey;

            //아코디언 열기
            const AccordionOpen = () => {
              setEditingReview(null); // 항상 새 리뷰
              handleAccordionToggle(`${item.orderId}-${item.id}`); // 아코디언 열기
            };

            //주문 확정하기
            const ConfirmDelivery = () => {
              if (confirm("배송을 확정하시겠습니까?")) {
                handleConfirmDelivery(item.orderId, item.id);
              }
            };
            return (
              <OrderListItem key={itemLKey}>
                {item ? (
                  <>
                    <OrderItemWrap>
                      <li>{item.orderDate}</li>
                      <li>
                        <NavLink to={`/products/${item.caregory}/${item.id}`}>
                          <img src={item.src[0]} alt={item.name} />
                        </NavLink>
                      </li>
                      <li>{item.name}</li>
                      <li>{item.quantity}</li>
                      <li>{(item.price * item.quantity).toLocaleString()}₩</li>
                      <li>{item.status === "배송완료" ? "배송완료" : "배송중"}</li>
                      {item.status === "배송완료" ? (
                        <ReviewButton
                          onClick={() => {
                            handleAccordionToggle(itemLKey);
                          }}
                        >
                          리뷰작성
                        </ReviewButton>
                      ) : (
                        <ConfirmDeliverButton onClick={ConfirmDelivery}>배송확정</ConfirmDeliverButton>
                      )}
                    </OrderItemWrap>
                    <OrderReviewWrap openAccordion={ReviewAccordionOpen}>
                      <OrderReview item={item} onComplete={handleReviewComplete} />
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
          <OrderSearchBox>
            <SearchOrder type="text" value={keyword} onChange={searchKeyword} onKeyDown={keyBoardSearch} />
            <SearchButton type="button" onClick={handleSearch}>
              찾기
            </SearchButton>
          </OrderSearchBox>
          <OrderPaginationWrap>
            <PaginationList>
              <PaginationButton type="button" onClick={goToFirstPage} disabled={currentPage === 1}>
                First
              </PaginationButton>
            </PaginationList>
            <PaginationList>
              <PaginationButton type="button" onClick={goToPrevPage} disabled={currentPage === 1}>
                Prev
              </PaginationButton>
            </PaginationList>
            {pageNumbers.map((number) => (
              <PageNumber key={number}>
                <PageNumberButton onClick={() => setCurrentPage(number)} isActive={currentPage === number}>
                  {number}
                </PageNumberButton>
              </PageNumber>
            ))}
            <PaginationList>
              <PaginationButton type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
              </PaginationButton>
            </PaginationList>
            <PaginationList>
              <PaginationButton type="button" onClick={goToLastPage} disabled={currentPage === totalPages}>
                Last
              </PaginationButton>
            </PaginationList>
          </OrderPaginationWrap>
        </OrderutilityWrap>
      </OrderContainer>
      <SideMenuBar />
    </OrderPageContainer>
  );
}
