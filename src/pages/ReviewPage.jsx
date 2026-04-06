import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import { useCartStore } from "../stores/useCartStore";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";
import MyProfile from "../components/common/MyProfile";
import { authMeApi } from "../apis/authMeApi";

// localStorage 전체리뷰목록, 리뷰삭제하기 숫자 형식변경 불러오기
import { getReviews, deleteReview, formatViews } from "../apis/reviewService";
import SideMenuBar from "../components/common/SideMenuBar";

// 날짜 변환 함수
// ISO 날짜 문자열을 "YY.MM.DD" 으로 바꾸기
function formatShortDate(isoString) {
  if (!isoString) return "-";
  const d = new Date(isoString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yy}.${mm}.${dd}`;
}

// 필터 카테고리, 검색, 리뷰 목록을 걸러주는 함수
function applyFilter(allReviews, category, field, keyword) {
  //원본 유지하려고 let으로 한거
  let result = allReviews;

  // 카테고리 필터 맞는것만 배열로
  if (category !== "all") {
    result = result.filter((r) => r.category === category);
  }

  // 키워드 검색어가 있을 때만 trim으로 공백만 있어도 제외
  if (keyword.trim()) {
    const kw = keyword.trim().toLowerCase();
    result = result.filter((r) => {
      let target = "";

      if (field === "title") {
        target = (r.title || "").toLowerCase();
      } else if (field === "author") {
        target = (r.author || "").toLowerCase();
      } else if (field === "createdAt") {
        // "25.03" 입력하면 25년 3월 리뷰 다 나오게
        target = formatShortDate(r.createdAt).toLowerCase();
      } else if (field === "purchasedAt") {
        target = formatShortDate(r.purchasedAt).toLowerCase();
      } else if (field === "views") {
        target = String(r.views || 0);
      }

      return target.includes(kw);
    });
  }

  // 최신순 날짜를 숫자 초로 바꿔서 내림차순으로 비교하기
  result = result.slice().sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });

  return result;
}

// 스타일 컴포넌트

// 전체 페이지 감싸는 박스
const ReviewPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 160px;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    gap: 120px;
    padding: 0 50px;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 80px;
    padding: 0 30px;
  }

  @media screen and (max-width: 420px) {
    padding: 0 10px;
  }
`;

// 리뷰 목록 섹션
const ReviewContainer = styled.section`
  width: 100%;
  max-width: 915px;
  height: auto;

  ${({ theme }) => theme.media.tablet} {
    max-width: 715px;
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: 715px;
    gap: 100px;
  }
`;

// 제목, 드롭다운, 헤더
const ReviewInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

// 작성된 리뷰
const ReviewTitle = styled.p`
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

// 분류랑 검색기준 드롭다운 가로로 묶는부분
const FilterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

// 분류
const FilterLabel = styled.span`
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 드롭다운 전체 감싸는 박스
const DropdownWrap = styled.div`
  position: relative;
  /* min-width: 120px; */
`;

// 드롭다운 버튼
const DropdownBtn = styled.button`
  width: 120px;
  height: 25px;
  padding: 0 30px 0 10px;
  /* border: 1px solid ${Theme.colors.black}; */
  font-size: ${Theme.fontsize.desktop.medium};
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  position: relative;
  color: ${Theme.colors.blacktext};

  /* CSS 삼각형 화살표 */
  &::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid ${Theme.colors.blacktext};
  }

  /* 열렸을 때 화살표 위로 반전 */
  &.open::after {
    border-top: none;
    border-bottom: 5px solid ${Theme.colors.blacktext};
  }
  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    width: 80px;
    height: 20px;
  }
`;

// 드롭다운 열렸을 때 목록
const DropdownList = styled.ul`
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  /* border: 1px solid ${Theme.colors.black}; */
  /* background-color: ${Theme.colors.graybg}; */
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  background-color: ${Theme.colors.white};
`;

// 드롭다운 각 항목
const DropdownItem = styled.li`
  padding: 8px 10px;
  font-size: ${Theme.fontsize.desktop.medium};
  cursor: pointer;

  /* 선택된 항목 배경색 */
  &.selected {
    background-color: ${Theme.colors.qrimgbg};
    font-weight: 500;
  }

  /* 마우스 올리면 배경색 */
  &:hover {
    background-color: ${Theme.colors.qrimgbg};
  }
`;

// 컬럼 제목, 작성자, 작성일, 구매일, 조회
const ReviewHeader = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 12px 10px 12px;
  border-bottom: 1px solid ${Theme.colors.black};
`;

// 헤더 각 칸 부분 props로 넘겨주는 부분
const HeaderCell = styled.li`
  font-size: ${Theme.fontsize.desktop.medium};
  width: ${({ width }) => width || "auto"};
  flex: ${({ flex }) => flex || "none"};
  text-align: ${({ align }) => align || "center"};
`;

// 리뷰 목록
const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// 리뷰 한 줄
const ReviewItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 0 50px 0;
  border-top: 1px solid ${Theme.colors.grayline};
  border-bottom: 1px solid ${Theme.colors.grayline};
  /* height: 300px; */
  min-height: 150px;
  height: auto;

  ${({ theme }) => theme.media.tablet} {
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 20px 0;
  }

  /* 리뷰 없을 때 */
  &.empty {
    justify-content: center;
    color: ${Theme.colors.textsecondary};
    padding: 170px 0;
  }
`;

const ReviewInfo = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  gap: 30px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    position: static;
    display: flex;
    justify-content: space-between;
    gap: 0;
    width: 100%;
  }
`;

// 리뷰 각 데이터 칸
const ReviewCell = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: ${Theme.fontsize.desktop.small};
  width: ${({ width }) => width || "auto"};
  flex: ${({ flex }) => flex || "none"};
  text-align: ${({ align }) => align || "center"};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    font-size: 10px;
  }

  /* 제목 칸 내용이 길면 말줄임표로 보이게 */
  &.title {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-size: ${Theme.fontsize.desktop.small};
  }
`;
const ReviewTitleText = styled.p`
  margin-bottom: 20px;
  font-weight: 600;
`;

const ImgWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const ReviewImg = styled.img`
  object-fit: cover;
  width: 98px;
  height: 115px;

  ${({ theme }) => theme.media.mobile} {
    width: 80px;
    height: 90px;
  }
`;

// 삭제 버튼
const DeleteBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.textsecondary};
  background: transparent;
  border: 1px solid ${Theme.colors.grayline};
  width: 40px;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    font-size: 10px;
    width: 30px;
  }

  /* 마우스 호버시 빨간색으로 */
  &:hover {
    color: ${Theme.colors.redaccent};
    border-color: ${Theme.colors.redaccent};
  }
`;

// 검색창, 찾기 버튼
const SearchWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding-top: 80px;
`;

// 검색 입력창
const SearchInput = styled.input`
  outline: none;
  width: 300px;
  height: 30px;
  padding: 0 6px;
  border: 1px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    width: 150px;
    height: 25px;
  }
`;

// 찾기 버튼
const SearchButton = styled.button`
  width: 120px;
  height: 30px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.medium};
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    width: 100px;
    height: 25px;
  }
`;

// 페이지
const Pagination = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 747px;
  margin: 80px auto 0 auto;

  li {
    font-size: ${Theme.fontsize.desktop.medium};
  }

  button {
    background: none;
    border: none;
    font-size: ${Theme.fontsize.desktop.medium};
    color: ${Theme.colors.black};
  }

  ${({ theme }) => theme.media.tablet} {
    li,
    button {
      font-size: ${Theme.fontsize.tablet.medium};
    }
    width: 500px;
  }

  ${({ theme }) => theme.media.mobile} {
    li,
    button {
      font-size: ${Theme.fontsize.mobile.small};
    }
    max-width: 100%;
    max-width: 330px;
    margin: 50px auto 0 auto;
  }
`;
const CarouselWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const ReviewContent = styled.p`
  margin-bottom: 10px;
  font-size: ${Theme.fontsize.desktop.mini};
  word-break: break-word;
  overflow-wrap: anywhere;

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 20px;
  }
`;

const ArrowBtn = styled.button`
  width: 24px;
  height: 24px;

  &:hover {
    background: ${Theme.colors.qrimgbg};
  }
`;

//  현재 선택된 겂 onChange로 선택 바뀌면 호출되는 함수
function CustomDropdown({ options, value, onChange }) {
  // 드롭다운 열리고 닫히는 상태
  const [isOpen, setIsOpen] = useState(false);

  // 클릭 감지용 ref 드롭다운 바깥을 클릭하면 자동으로 닫히게
  const dropdownRef = useRef(null);

  // 현재 선택된 항목의 label 찾기
  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  // 드롭다운 바깥 클릭하면 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      // 안에 클릭한 곳이 없으면 → 외부 클릭
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    // 전체에 클릭 이벤트 달기
    document.addEventListener("mousedown", handleClickOutside);
    // 컴포넌트 사라질 때 이벤트 제거
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownWrap ref={dropdownRef}>
      {/* 클릭하면 열리고 닫히는 토글 */}
      <DropdownBtn className={isOpen ? "open" : ""} onClick={() => setIsOpen((prev) => !prev)}>
        {selectedLabel}
      </DropdownBtn>

      {/* isOpen true일 때만 목록 표시 */}
      {isOpen && (
        <DropdownList>
          {options.map((opt) => (
            <DropdownItem
              key={opt.value}
              className={opt.value === value ? "selected" : ""}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false); // 선택하면 닫기
              }}
            >
              {opt.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrap>
  );
}

// ReviewPage 컴포넌트
export default function ReviewPage() {
  const [imageIndexMap, setImageIndexMap] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);

  const [orderData, setOrderData] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    point: 0,
    delivery: { inDelivery: 0, done: 0 },
  });

  // 보여줄 리뷰 목록
  const [reviews, setReviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 현재 페이지 데이터
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reviews.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(reviews.length / itemsPerPage) || 1;
  // 항상 4칸 유지
  const itemDisplay = [...currentItems];
  while (itemDisplay.length < 4) {
    itemDisplay.push(null);
  }
  // 드롭다운 all, seating, tables, lighting)
  const [category, setCategory] = useState("all");

  // 검색 할때 드롭다운 title, author, createdAt, purchasedAt, views
  const [searchField, setSearchField] = useState("title");

  // 검색창에 입력중일때
  const [keyword, setKeyword] = useState("");

  // 찾기 버튼 눌렀을 때만
  const [appliedKeyword, setAppliedKeyword] = useState("");

  // 404나 인터넷 안될때
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authMeApi();
        if (res.success) {
          setUserInfo(res.userInfo);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
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

    // steTimeout 넣고 (() => {}, 0) 하면 지금 실행중인 코드 끝내고 실행 되고 useEffect 안에서 setState바로 호출되는 오류 해결
    setTimeout(() => {
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
    }, 0);
  }, []);

  // 검색 바뀔 때마다 리뷰 목록 다시 필터링 하기
  useEffect(() => {
    setTimeout(() => {
      // 로컬에서 전체 리뷰 꺼내서 필터에 넣기
      const allReviews = getReviews();
      const filtered = applyFilter(allReviews, category, searchField, appliedKeyword);
      setReviews(filtered);
    }, 0);
  }, [category, searchField, appliedKeyword]);

  // 삭제 버튼 눌렀을 때
  function handleDelete(id) {
    // 실수로 누를 수도 있으니 한 번 더 확인
    if (!window.confirm("리뷰를 삭제하시겠습니까?")) return;
    // 삭제한 함수 불러서 로컬에서 삭제하기
    deleteReview(id);

    // 삭제하고 리뷰바로 조정하기
    const allReviews = getReviews();
    const filtered = applyFilter(allReviews, category, searchField, appliedKeyword);
    setReviews(filtered);
  }

  // 찾기 버튼 눌렀을 때
  function handleSearch() {
    setAppliedKeyword(keyword);
  }

  // 엔터로도 검색 되게
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  // 검색 바뀌면 검색어 초기화
  // CustomDropdown이 val(문자열)로 바로 넘겨줘서 e.target.value 대신 val로 받음
  function handleFieldChange(val) {
    setSearchField(val);
    setKeyword("");
    setAppliedKeyword("");
  }

  // 리뷰 이미지 캐러셀
  const handlePrevImage = (reviewId) => {
    setImageIndexMap((prev) => {
      const current = prev[reviewId] || 0;
      return {
        ...prev,
        [reviewId]: Math.max(current - 1, 0),
      };
    });
  };

  const handleNextImage = (reviewId, total) => {
    setImageIndexMap((prev) => {
      const current = prev[reviewId] || 0;
      return {
        ...prev,
        [reviewId]: current + 3 < total ? current + 1 : current,
      };
    });
  };

  // 페이지 이동 함수
  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  const getPageNumbers = () => {
    const pageNumbers = [];

    let start = Math.max(currentPage - 1, 1);
    let end = start + 2;

    // totalPages보다 커도 그냥 3개 유지
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  // 이름 가운데 *로 가려지게
  function maskName(name) {
    if (!name) return "";

    // 2글자면 뒤만 가림
    if (name.length === 2) {
      return name[0] + "*";
    }

    // 3글자 이상이면 가운데만 가림
    if (name.length >= 3) {
      return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    }

    return name;
  }
  return (
    <ReviewPageContainer>
      <SideMenuBar />
      <MyProfile userInfo={userInfo} orderData={orderData} cartItem={cartItem} />

      <ReviewContainer>
        <ReviewInfoWrap>
          {/* 페이지 제목 */}
          <ReviewTitle>작성된 리뷰</ReviewTitle>

          {/* 분류링 검색 드롭다운 */}
          <FilterWrap>
            <FilterLabel>분류 :</FilterLabel>

            {/* 분류 커스텀 드롭다운 */}
            <CustomDropdown
              options={[
                { value: "all", label: "All" },
                { value: "seating", label: "Seating" },
                { value: "tables", label: "Tables" },
                { value: "lighting", label: "Lighting" },
              ]}
              value={category}
              onChange={(val) => setCategory(val)}
            />

            {/* 검색 기준 커스텀 드롭다운 - 바꾸면 검색어 자동으로 초기화 */}
            <CustomDropdown
              options={[
                { value: "title", label: "제목" },
                { value: "author", label: "작성자" },
                { value: "createdAt", label: "작성일" },
                { value: "purchasedAt", label: "구매일" },
              ]}
              value={searchField}
              onChange={handleFieldChange}
            />
          </FilterWrap>

          {/* <ReviewHeader>
            <HeaderCell flex="1" align="left">
              제목 :
            </HeaderCell>
            <HeaderCell width="100px">작성자 :</HeaderCell>
            <HeaderCell width="130px">작성일 :</HeaderCell>
            <HeaderCell width="100px">구매일 :</HeaderCell>
            <HeaderCell width="90px">조회 :</HeaderCell>
            <HeaderCell width="30px"></HeaderCell>
          </ReviewHeader> */}
        </ReviewInfoWrap>

        {/* 리뷰 목록 */}
        <ReviewList>
          {reviews.length === 0 ? (
            // 리뷰가 하나도 없을 때
            <ReviewItem className="empty">작성된 리뷰가 없습니다.</ReviewItem>
          ) : (
            // map으로 렌더링 하고 key React가 항목 구분할 때 쓰는 고유값임
            itemDisplay.map((review, idx) =>
              review ? (
                <ReviewItem key={review.id}>
                  {/* 제목 너무 길면 말줄임표... */}
                  <ReviewCell className="title" flex="1" align="left">
                    <ReviewTitleText>{review.title}</ReviewTitleText>
                    {/* 리뷰 이미지 캐러셀 */}
                    {review.images && review.images.length > 0 && (
                      <CarouselWrap>
                        {/* 이미지 4개 이상일 때만 이전 버튼 */}
                        {review.images?.length > 3 && (
                          <ArrowBtn onClick={() => handlePrevImage(review.id)}>{"<"}</ArrowBtn>
                        )}
                        <ImgWrap>
                          {review.images
                            ?.slice(imageIndexMap[review.id] || 0, (imageIndexMap[review.id] || 0) + 3)
                            .map((img, i) => (
                              <ReviewImg key={i} src={img} />
                            ))}
                        </ImgWrap>
                        {review.images?.length > 3 && (
                          <ArrowBtn onClick={() => handleNextImage(review.id, review.images.length)}>{">"}</ArrowBtn>
                        )}
                      </CarouselWrap>
                    )}
                    <ReviewContent>{review.content}</ReviewContent>
                  </ReviewCell>
                  <ReviewInfo>
                    {/* 작성자 */}
                    <ReviewCell>작성자: {maskName(review.author)}</ReviewCell>
                    {/* 작성일  */}
                    <ReviewCell>작성일: {formatShortDate(review.date)}</ReviewCell>
                    {/* 구매일 */}
                    <ReviewCell>구매일: {formatShortDate(review.orderDate)}</ReviewCell>
                    {/* 조회수 */}
                    <ReviewCell>조회: {formatViews(review.views)}</ReviewCell>
                    {/* 삭제 버튼 */}
                    <DeleteBtn onClick={() => handleDelete(review.id)}>삭제</DeleteBtn>
                  </ReviewInfo>
                </ReviewItem>
              ) : (
                <ReviewItem key={`empty-${idx}`} />
              ),
            )
          )}
        </ReviewList>
        {/* 검색창이랑 찾기 버튼 */}
        <SearchWrap>
          <SearchInput
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            // 검색 기준에 따라 placeholder 다르게
            placeholder={
              searchField === "title"
                ? "제목으로 검색"
                : searchField === "author"
                  ? "작성자로 검색"
                  : searchField === "createdAt"
                    ? "작성일 검색 (ex: 25.03)"
                    : searchField === "purchasedAt"
                      ? "구매일 검색 (ex: 25.03)"
                      : "제목, 카테고리별로 검색"
            }
          />
          <SearchButton onClick={handleSearch}>찾기</SearchButton>
        </SearchWrap>
        <Pagination>
          <li>
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
              First
            </button>
          </li>
          <li>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Prev
            </button>
          </li>
          {getPageNumbers().map((page) => (
            <li
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                cursor: "pointer",
                fontWeight: currentPage === page ? "bold" : "normal",
                textDecoration: currentPage === page ? "underline" : "none",
              }}
            >
              {page}
            </li>
          ))}
          <li>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
          <li>
            <button onClick={goToLastPage} disabled={currentPage === totalPages}>
              Last
            </button>
          </li>
        </Pagination>
      </ReviewContainer>
    </ReviewPageContainer>
  );
}
