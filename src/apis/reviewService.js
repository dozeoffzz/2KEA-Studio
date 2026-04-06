// localStorage에 저장할 키 이름
const REVIEWS_KEY = "reviews";
// 리뷰 기본 조회수 1,223으로
const BASE_VIEWS = 1223;

// 유저 네임 저장하고 불러오기
// 로그인이랑 회원가입 성공 후 userInfo.name을 로컬저장
// LoginPage와 SignupPage에서 login 바로 다음에 호출하기
export function saveUserName(userInfo) {
  // userInfo있고 네임값 있을 때만 저장
  if (userInfo?.name) {
    localStorage.setItem("userName", userInfo.name);
  }
}

// 저장된 네임 이름 불러오기 리뷰 작성할때는 author작성자로 사용함
export function getUserName() {
  return localStorage.getItem("userName") || null;
}

// 전체 리뷰 목록 불러오기
// 로컬에 JSON 문자열로 저장되어 있어서 파싱해서 배열로 반환하기
export function getReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
  } catch {
    // 실패하면 빈 배열로
    return [];
  }
}

// 리뷰 저장
function saveReviews(reviews) {
  // JSON.stringify사용해서 배열에서 문자열로 바꿔서 저장
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// 리뷰 추가 리뷰작성페이지나 주문목록페이지에서 등록 버튼 눌렀을 때 호출
export function addReview(reviewData) {
  const reviews = getReviews();

  // 구매일 CompletedPage에서 저장한거
  const orderData = JSON.parse(localStorage.getItem("orderData")) || {};

  const newReview = {
    // id: 현재 시각을 초로해서 문자열로
    id: Date.now().toString(),
    // 리뷰 작성한 제품 아이디
    productId: reviewData.productId,
    // 로컬에서 이름 꺼낼때 없으면 그냥 회원
    author: getUserName() || "회원",

    title: reviewData.title,
    content: reviewData.content,
    // 카테고리 all, seating. tables, lighting 중에 없으면 all로
    category: reviewData.category || "all",
    // 별점없으면 기본으로 5로
    rating: reviewData.rating || 5,
    images: reviewData.images || [],
    // 리뷰 작성일  ISO 형식으로 저장해서 쓰기
    createdAt: new Date().toISOString(),
    // 구매일은 주문 완료뜰때 CompletedPage에서 저장한 날짜
    purchasedAt: orderData.purchasedAt || null,
    // 조회수는 기본 1,223 처음부터 많이 보이게 아니면 랜덤으로 해야함
    views: BASE_VIEWS,
  };

  // 새 리뷰를 맨 앞에 넣기
  saveReviews([newReview, ...reviews]);
  return newReview;
}

// 리뷰 상세 페이지 들어갈 때 자동으로 호출
export function incrementViews(id) {
  const reviews = getReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  // 보고있는 리뷰 기본 조회수에 +1 해서 나오게ㅐ
  reviews[idx] = { ...reviews[idx], views: reviews[idx].views + 1 };
  saveReviews(reviews);
  return reviews[idx];
}

// 리뷰 상세 페이지에서 사용
export function getReviewById(id) {
  const review = getReviews().find((r) => r.id === id);
  if (!review) return null;
  // 조회하면 한번에 바뀌게
  return incrementViews(id);
}

// 리뷰 삭제
export function deleteReview(id) {
  // 해당 id만 빼고 나머지는 필터링해서 다시 저장
  const reviews = getReviews().filter((r) => r.id !== id);
  saveReviews(reviews);
}

// 리뷰 목록 페이지에서 카테고리, 검색어, 정렬 바꿀 때마다 호출
export function filterReviews({
  category = "all",
  keyword = "",
  // 기본 검색은 제목
  searchField = "title",
  // 기본 작성일
  sortBy = "createdAt",
  // 최신순으로
  sortOrder = "desc",
} = {}) {
  let reviews = getReviews();

  // 카테고리 all이면 필터 안하고 나머지면 해당하는걸로
  if (category !== "all") {
    reviews = reviews.filter((r) => r.category === category);
  }

  // 키워드 검색 문자열이면 안되게
  if (keyword.trim()) {
    // 대소문자 상관없이 검색되게
    const kw = keyword.trim().toLowerCase();
    reviews = reviews.filter((r) => {
      // searchField에 맞는거 소문자로 바꾸고 맞는지 확인하게
      const target = (r[searchField] || "").toLowerCase();
      return target.includes(kw);
    });
  }

  // 정렬
  reviews = reviews.slice().sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // 날짜 문자열은 숫자 초로 바꿔서
    if (sortBy === "createdAt" || sortBy === "purchasedAt") {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    }

    // 최신순
    return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
  });

  return reviews;
}

// 날짜, 조회수

// ISO 날짜 문자열을  YYYY.MM.DD HH:MM 으로 바꾸기
export function formatDate(isoString) {
  // 없으면 -
  if (!isoString) return "-";
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

// 조회수 숫자 기본 1223 인데 1,223 으로 , 들어가게
export function formatViews(views) {
  return views?.toLocaleString() || "0";
}
// 리뷰 수정기능
export function updateReview(updatedReview) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const newReviews = reviews.map((r) => (r.id === updatedReview.id ? updatedReview : r));

  localStorage.setItem("reviews", JSON.stringify(newReviews));
}
