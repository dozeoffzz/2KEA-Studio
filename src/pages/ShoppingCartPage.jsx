import React, { useEffect, useRef, useState } from "react";
import DeleteModal from "../components/modals/DeleteModal";
import DeleteProductBtn from "../assets/icons/deleteProductButton.svg";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import OrderModal from "../components/modals/OrderModal";
import { useCartStore } from "../stores/useCartStore";
import { NavLink } from "react-router-dom";
import { authMeApi } from "../apis/authMeApi";

const CartContainer = styled.div`
  margin-top: 180px;
  padding: 40px 80px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 120px;
  min-height: calc(100vh - 100px);
  align-items: start;

  @media screen and (max-width: 1282px) {
    gap: 80px;
    padding: 30px 40px;
    grid-template-columns: 1fr;
    height: auto;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 20px 20px;
    grid-template-columns: 1fr;
    height: auto;
    gap: 80px;
  }
`;

const CartListWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 24px;

  &::-webkit-scrollbar {
    height: 16px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
    box-shadow: inset 0 0 0 0.3px ${Theme.colors.black};
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.black};
    border-radius: 20px;
    border: 5px solid transparent;
    background-clip: content-box;
  }

  ${({ theme }) => theme.media.mobile} {
    overflow-x: visible;
    overflow-y: visible;
    padding-bottom: 0;
  }
`;

const CartList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 950px;
  /* height: calc(100vh - 100px); */
  height: auto;
  min-height: 0;

  @media screen and (max-width: 1282px) {
    height: auto;
    min-width: 818px;
    overflow: visible;
  }

  ${({ theme }) => theme.media.mobile} {
    min-width: 100%;
    height: auto;
    overflow: visible;
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr 2fr 2fr 1fr;
  column-gap: 30px;
  align-items: center;
  min-height: 230px;

  @media screen and (max-width: 1282px) {
    grid-template-columns: 30px 1fr 1.4fr 0.9fr 150px;
    grid-template-rows: auto;
    font-size: ${Theme.fontsize.tablet.content};
  }

  @media screen and (max-width: 1060px) {
    grid-template-columns: 30px 1fr 1.2fr 0.8fr 100px;
    grid-template-rows: auto;
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 5px 120px 1fr 5px;
    grid-template-rows: auto auto;
    font-size: ${Theme.fontsize.mobile.content};
    min-height: auto;
    align-items: start;
    column-gap: 20px;
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${Theme.colors.black};

  ${({ theme }) => theme.media.mobile} {
    grid-column: 1;
    grid-row: 1;
    align-self: center;
    width: 15px;
  }
`;

const ItemImg = styled.div`
  position: relative;
  width: 198px;
  height: 231px;
  background-color: ${Theme.colors.overlay};

  @media screen and (max-width: 1282px) {
    width: 198px;
    height: 231px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 132px;
    height: 153px;

    grid-column: 2;
    grid-row: 1 / 3;
  }
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.9s ease;
`;

const ItemInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${Theme.fontsize.desktop.content};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    grid-column: 3;
    grid-row: 1;
  }
`;

const ItemName = styled.p`
  white-space: nowrap;
  font-size: ${Theme.fontsize.desktop.section};
  margin-bottom: 40px;

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
    font-size: 18px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
  /* @media screen and (max-width: 390px) {
    font-size: 12px;
  } */
`;

const ItemDelevery = styled.p`
  font-size: ${Theme.fontsize.desktop.content};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  @media screen and (max-width: 400px) {
    display: none;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const QuantityWrap = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: ${Theme.fontsize.desktop.content};
  gap: 20px;

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    margin-top: 100px;
    font-size: ${Theme.fontsize.mobile.mini};
    grid-column: 4;
    grid-row: 1;
    gap: 5px;
  }
`;

const DeleteProduct = styled.button`
  ${({ theme }) => theme.media.mobile} {
    margin-right: 0;
    grid-column: 4;
    grid-row: 1;
    width: 15px;
    justify-self: end;
    align-self: start;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const Quantity = styled.div`
  display: flex;
  gap: 60px;

  @media screen and (max-width: 1282px) {
    gap: 40px;
  }
  ${({ theme }) => theme.media.mobile} {
    gap: 20px;
  }
`;

const QuantityUpDown = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  gap: 20px;

  ${({ theme }) => theme.media.mobile} {
    margin-top: 0;
  }
`;

const UpButton = styled.button`
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.black};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const OrderInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  min-width: 400px;
  max-width: 605px;
  position: sticky;
  top: 100px;

  @media screen and (max-width: 1282px) {
    position: static;
    top: auto;
    max-width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    position: static;
    top: auto;
    max-width: 100%;
    min-width: 250px;
  }
`;

const OrderInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1282px) {
    padding: 0 30px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 0 15px;
  }
`;

const OrderName = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${Theme.fontsize.desktop.content};
  border-bottom: 1px solid ${Theme.colors.black};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const Ordermobile = styled(OrderName)``;
const OrderEmail = styled(OrderName)``;
const OrderAddress = styled(OrderName)``;

const EditInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditInfoBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
`;

const EditCancel = styled.button`
  margin-right: 20px;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
`;

const ErrorMsg = styled.p`
  font-size: ${Theme.fontsize.desktop.mini};
  text-align: right;
  color: ${Theme.colors.redaccent};
`;

const InputName = styled.input`
  text-align: right;
  outline: transparent;
  width: 80%;
`;

const Inputmobile = styled(InputName)``;
const InputEmail = styled(InputName)``;
const InputAddress = styled(InputName)``;

const InputNameEdit = styled.input`
  padding: 5px 0;
  outline: none;
  border: none;
  text-align: right;
  width: 80%;
`;
const InputPhoneEdit = styled(InputNameEdit)``;
const InputEmailEdit = styled(InputNameEdit)``;
const InputAddressEdit = styled(InputNameEdit)``;

// 폰 010 고정 + 중간 + 끝 가로로 묶는 박스
const PhoneInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  flex: 1;
`;

// 폰 010 고정 텍스트랑 - 기호 2개
const PhoneFixed = styled.span`
  font-size: ${Theme.fontsize.desktop.content};
  white-space: nowrap;

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 중간이랑 끝 4자리 입력창
const PhonePartInput = styled.input`
  width: 55px;
  text-align: center;
  outline: none;
  border: none;
  ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.black)};
  font-size: ${Theme.fontsize.desktop.content};
  background: transparent;

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
    width: 45px;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    width: 38px;
  }
`;

const ThanksMsg = styled.p`
  display: flex;
  align-self: center;
  font-size: ${Theme.fontsize.desktop.section};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.section};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

const ProductPriceWrap = styled.div`
  padding: 20px 0 20px 0;
  border-top: 1px solid ${Theme.colors.black};
  border-bottom: 1px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.content};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ProductPriceList = styled.ul`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const ProductPrice = styled.li`
  display: flex;
  justify-content: space-between;
`;

const ProductNameQuantity = styled.div`
  white-space: nowrap;
  display: flex;
  gap: 30px;
`;

const ProductPriceQuantity = styled.div`
  display: flex;
  gap: 20px;
`;

const TotalQuantity = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${Theme.fontsize.desktop.content};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const DeleteButton = styled.button`
  min-width: 120px;
  width: 100%;
  min-height: 50px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.black};

  @media screen and (max-width: 1282px) {
    font-size: ${Theme.fontsize.tablet.content};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
  @media screen and (max-width: 1024px) {
    flex: 1;
  }
`;

const OrderButton = styled(DeleteButton)`
  min-width: 120px;
  width: 100%;
  min-height: 50px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.black};
`;

export default function ShoppingCartPage() {
  // 모달 상태값 저장하기
  const [isOpen, setIsOpen] = useState(false);
  const [OrderIsOpen, setOrderIsOpen] = useState(false);
  // 이미지 호버시 변경을 위해 상태값 저장
  const [hoverImg, setHoverImg] = useState(null);
  // useCaretStore에서 정의한 함수 구조분해로 가져오기
  const { cartItems, handleQuantity, handleCheck, handleDelete } = useCartStore();

  const [userInfo, setUserInfo] = useState(null);
  // 정보 수정을 위한 상태값
  const [isEdit, setIsEdit] = useState(false);

  // 폰 중간 4자리 채우면 끝번호로 자동 이동하는 ref
  const phoneEndRef = useRef(null);

  // 유효성 기존 mobile 하나였던거 phoneMid, phoneEnd 로 회원가입 처럼 만든거
  const [form, setForm] = useState({
    name: "",
    phoneMid: "",
    phoneEnd: "",
    email: "",
    address: "",
    baseAddress: "",
  });

  // api 연결하기
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await authMeApi();
        if (data.success) {
          const savedUser = JSON.parse(localStorage.getItem("userInfo"));
          // 로컬스토리지에서 주소 가져오기
          const savedAddress = localStorage.getItem("address");
          // 입력한 주소 또는 기본주소
          const finalUser = {
            ...data.userInfo,
            // 수정값 덮어쓰기
            ...(savedUser || {}),
            address: savedAddress || data.userInfo.address,
          };

          const rawPhone = finalUser.phone || "";
          const phone = rawPhone.replace(/[^0-9]/g, "");

          const phoneMid = phone.length >= 7 ? phone.slice(3, 7) : "";
          const phoneEnd = phone.length >= 11 ? phone.slice(7, 11) : "";
          setUserInfo({
            ...finalUser,
            phoneMid,
            phoneEnd,
          });
          setForm({
            name: finalUser.name || "",
            phoneMid,
            phoneEnd,
            email: finalUser.email || "",
            address: finalUser.address || "",
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchUser();
  }, []);

  // 에러 났을때 상황,메세지
  const [error, setError] = useState({});
  const [msg, setMsg] = useState({});

  function handleInput(e) {
    const { name, value } = e.target;
    let okValue = value;

    // 폰 중간이랑 끝 숫자만 입력할수 있고 4자리 넘어가면 막기
    if (name === "phoneMid" || name === "phoneEnd") {
      okValue = value.replace(/[^0-9]/g, "");
      if (okValue.length > 4) return;
    }

    // 이름 한글만 입력
    if (name === "name") {
      okValue = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    // 이메일 한글 못쓰게
    if (name === "email") {
      okValue = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: okValue }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: false }));
      setMsg((prev) => ({ ...prev, [name]: "" }));
    }

    // 폰 중간 4자리 채우면 끝번호로 자동으로 이동
    if (name === "phoneMid" && okValue.length === 4) {
      phoneEndRef.current.focus();
    }
  }

  // 회원가입이랑 같은 유효성 검사
  function validateForm() {
    let newErrors = {};
    let newMsgs = {};

    // 이름 한글만 2~10글자
    const nameRegex = /^[가-힣]{2,10}$/;
    if (!form.name.trim()) {
      newErrors.name = true;
      newMsgs.name = "이름을 입력해주세요";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = true;
      newMsgs.name = "이름은 한글로 2~10글자 입력해주세요";
    }

    // 폰 중간이랑 끝 각 4자리
    if (!form.phoneMid.trim() || !form.phoneEnd.trim()) {
      newErrors.phoneMid = true;
      newMsgs.phoneMid = "전화번호를 입력해주세요";
    } else if (form.phoneMid.length < 4 || form.phoneEnd.length < 4) {
      newErrors.phoneMid = true;
      newMsgs.phoneMid = "전화번호는 각 4자리씩 입력해주세요";
    }

    // 이메일형식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = true;
      newMsgs.email = "이메일을 입력해주세요";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = true;
      newMsgs.email = "이메일 형식이 올바르지 않습니다";
    }

    // 주소는 빈칸
    if (!form.address.trim()) {
      newErrors.address = true;
      newMsgs.address = "주소를 입력해주세요";
    }

    setError(newErrors);
    setMsg(newMsgs);

    // 에러 없으면 true → 주문 진행
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 체크된 상품의 총 가격
  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  // 상품이 없을때 구매 버튼을 막기 위해 갯수 체크
  const HaveItems = cartItems.length > 0;
  // 체크된 상품이 없을때 구매 버튼을 막기 위해 갯수 체크
  const HaveCheckedItems = cartItems.some((item) => item.checked);

  const handleOrder = () => {
    // 상품이 없다면 되돌아 가라!
    if (!HaveItems) return;
    // 폼 유효성 검사 통과해야 주문 진행
    const isValid = validateForm();
    if (!isValid) return;

    // 구매 데이터 계산
    const purchasedItems = cartItems;
    const totalQuantity = purchasedItems.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = purchasedItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    // 포인트
    const earnedPoint = Math.floor(totalPrice * 0.01);

    // 기존 포인트 가져오기
    const currentPoint = Number(localStorage.getItem("point") || 0);

    // 주문 날짜 생성
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const orderDate = `${year}-${month}-${day}`;
    // 매우 길고 복잡한 무작위 문자열 생성
    const orderId = crypto.randomUUID();

    // 주문 내역 가져오기
    const prevOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    // 주문 내역 로컬스토리지에 저장할 데이터
    const newOrder = {
      id: orderId,
      totalQuantity,
      totalPrice,
      earnedPoint,
      orderDate,
      purchasedItems,
    };

    // 저장
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        totalQuantity,
        totalPrice,
        earnedPoint,
      })
    );

    // 주문 내역 저장
    localStorage.setItem("orderHistory", JSON.stringify([...prevOrders, newOrder])); // 누적해야 하기 때문에 배열에 계속 추가하는 식으로 저장
    // 포인트 저장
    localStorage.setItem("point", currentPoint + earnedPoint);

    // 배송 상태 저장
    localStorage.setItem(
      "delivery",
      JSON.stringify({
        inDelivery: totalQuantity,
        done: 0,
      })
    );

    // 있으면 모달
    setOrderIsOpen(true);
  };

  const handleCheckedOrder = () => {
    if (!HaveCheckedItems) return;
    // 폼 유효성 검사 통과해야 주문 진행
    const isValid = validateForm();
    if (!isValid) return;

    // 구매 데이터 계산
    const purchasedItems = cartItems;
    const totalQuantity = purchasedItems.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = purchasedItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    // 포인트
    const earnedPoint = Math.floor(totalPrice * 0.01);

    // 기존 포인트 가져오기
    const currentPoint = Number(localStorage.getItem("point") || 0);

    // 주문 날짜 생성
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const orderDate = `${year}-${month}-${day}`;
    // 복잡한 무작위 UUID 생성
    const orderId = crypto.randomUUID();

    // 주문 내역 가져오기
    const prevOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    // 주문 내역 로컬스토리지에 저장할 데이터
    const newOrder = {
      id: orderId,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      earnedPoint: earnedPoint,
      orderDate: orderDate,
      purchasedItems: purchasedItems.map((item) => ({
        ...item,
        status: "배송중", // 처음 주문하면 배송중 상태로 시작
      })),
    };

    // 저장
    localStorage.setItem(
      "orderData",
      JSON.stringify({
        totalQuantity,
        totalPrice,
        earnedPoint,
        orderDate,
      })
    );

    // 주문 내역 저장(누적해야 하기 때문에 배열에 계속 추가하는 식으로 저장)
    localStorage.setItem("orderHistory", JSON.stringify([...prevOrders, newOrder]));
    // 포인트 저장
    localStorage.setItem("point", currentPoint + earnedPoint);

    // 배송 상태 저장
    localStorage.setItem(
      "delivery",
      JSON.stringify({
        inDelivery: totalQuantity,
        done: 0,
      })
    );

    setOrderIsOpen(true);
  };

  const handleDeleteAll = () => {
    if (!HaveItems) return;
    setIsOpen(true);
  };

  // 수정 내용 저장
  const handleSave = () => {
    const fullPhone = `010${form.phoneMid}${form.phoneEnd}`;
    const updatedUser = {
      name: form.name,
      phone: fullPhone,
      email: form.email,
      address: form.address,
    };

    // 저장
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    localStorage.setItem("address", form.address);

    // 상태 업데이트
    setUserInfo({
      ...updatedUser,
      phoneMid: form.phoneMid,
      phoneEnd: form.phoneEnd,
    });

    setIsEdit(false);
  };

  const handleEditToggle = () => {
    if (!isEdit) {
      const rawPhone = userInfo?.phone || "";
      const phone = rawPhone.replace(/[^0-9]/g, "");
      setForm({
        name: userInfo?.name || "",
        phoneMid: phone.slice(3, 7),
        phoneEnd: phone.slice(7, 11),
        email: userInfo?.email || "",
        address: userInfo?.address || "",
      });
    }
    setIsEdit((prev) => !prev);
  };

  return (
    <CartContainer>
      <CartListWrap>
        <CartList>
          {/* 디테일 페이지에서 상품 추가 리스트 배열 받아오기 예시 */}
          {cartItems.map((item, index) => (
            <Item key={item.id}>
              <CheckBox
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />
              <ItemImg
                onMouseEnter={() => setHoverImg(index)}
                onMouseLeave={() => setHoverImg(null)}
              >
                <NavLink
                  key={item.id}
                  large={item.large ? 1 : 0}
                  to={`/products/${item.category}/${item.id}`}
                >
                  <Img src={item.src?.[0]} alt={item.name} visible={hoverImg !== index} />
                  <Img src={item.src?.[1]} alt={item.name} visible={hoverImg === index} />
                </NavLink>
              </ItemImg>
              <ItemInfoWrap>
                <ItemName>{item.name}</ItemName>
                <p style={{ whiteSpace: "nowrap" }}>{item.price.toLocaleString()} ₩</p>
                <ItemDelevery>적립: {Math.floor(item.price * 0.01).toLocaleString()}P</ItemDelevery>
                <ItemDelevery>배송비: 무료</ItemDelevery>
              </ItemInfoWrap>
              <QuantityWrap>
                <Quantity>
                  <p>Quantity:</p>
                  <p>{item.quantity}</p>
                </Quantity>
                <QuantityUpDown>
                  {/* 아이템 아이디, 프롭스를 useCartStore에 넘김 */}
                  <UpButton onClick={() => handleQuantity(item.id, "dec")}>-</UpButton>
                  <p>{item.quantity}</p>
                  <UpButton onClick={() => handleQuantity(item.id, "inc")}>+</UpButton>
                </QuantityUpDown>
              </QuantityWrap>
              <DeleteProduct onClick={() => handleDelete(item.id)}>
                <img src={DeleteProductBtn} />
              </DeleteProduct>
            </Item>
          ))}
        </CartList>
      </CartListWrap>

      <OrderInfoWrap>
        {/* 주문 폼 */}
        <OrderInfoForm onSubmit={handleSubmit}>
          {/* 이름 */}
          <OrderName>
            <p>Name</p>
            {isEdit ? (
              <InputNameEdit
                name="name"
                placeholder="Name"
                type="text"
                value={form.name}
                onChange={handleInput}
              />
            ) : (
              <InputName
                name="name"
                placeholder="Name"
                type="text"
                value={userInfo?.name || ""}
                onChange={handleInput}
              />
            )}
          </OrderName>
          {msg.name && <ErrorMsg>{msg.name}</ErrorMsg>}

          {/* 폰 */}
          <Ordermobile>
            <p>Phone</p>
            {isEdit ? (
              <PhoneInputWrap>
                <PhoneFixed>010</PhoneFixed>
                <PhoneFixed>-</PhoneFixed>
                {/* 중간 4자리 입력하면 끝번호로 자동 이동 */}
                <PhonePartInput
                  name="phoneMid"
                  type="text"
                  value={form.phoneMid}
                  placeholder="0000"
                  maxLength="4"
                  inputMode="numeric"
                  error={error.phoneMid}
                  onChange={handleInput}
                />
                <PhoneFixed>-</PhoneFixed>
                {/* 끝에 4자리 */}
                <PhonePartInput
                  name="phoneEnd"
                  type="text"
                  value={form.phoneEnd}
                  placeholder="0000"
                  maxLength="4"
                  inputMode="numeric"
                  ref={phoneEndRef}
                  error={error.phoneEnd}
                  onChange={handleInput}
                />
              </PhoneInputWrap>
            ) : (
              <PhoneInputWrap>
                <PhoneFixed>010</PhoneFixed>
                <PhoneFixed>-</PhoneFixed>
                <PhonePartInput
                  name="phoneMid"
                  type="text"
                  value={userInfo?.phoneMid || ""}
                  placeholder="0000"
                  maxLength="4"
                  inputMode="numeric"
                  readOnly
                />
                <PhoneFixed>-</PhoneFixed>
                <PhonePartInput
                  name="phoneEnd"
                  type="text"
                  value={userInfo?.phoneEnd || ""}
                  placeholder="0000"
                  maxLength="4"
                  inputMode="numeric"
                  readOnly
                />
              </PhoneInputWrap>
            )}
          </Ordermobile>
          {msg.phoneMid && <ErrorMsg>{msg.phoneMid}</ErrorMsg>}

          {/* 이메일 */}
          <OrderEmail>
            <p>Email</p>
            {isEdit ? (
              <InputEmailEdit
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleInput}
              />
            ) : (
              <InputEmail
                name="email"
                placeholder="Email"
                type="email"
                value={userInfo?.email || ""}
                readOnly
              />
            )}
          </OrderEmail>
          {msg.email && <ErrorMsg>{msg.email}</ErrorMsg>}

          {/* 주소 */}
          <OrderAddress>
            <p>Address</p>
            {isEdit ? (
              <InputAddressEdit
                name="address"
                placeholder="Address"
                type="text"
                value={form.address}
                onChange={handleInput}
              />
            ) : (
              <InputAddress
                name="address"
                placeholder="Address"
                type="text"
                value={userInfo?.address || ""}
                readOnly
              />
            )}
          </OrderAddress>

          {/* 수정완료/정보수정 버튼 */}
          <EditInfo>
            <EditInfoBtn onClick={isEdit ? handleSave : handleEditToggle}>
              {isEdit && (
                <EditCancel
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(false);
                  }}
                >
                  수정취소
                </EditCancel>
              )}
              {isEdit ? "수정완료" : "정보수정"}
            </EditInfoBtn>
          </EditInfo>
          {msg.address && <ErrorMsg>{msg.address}</ErrorMsg>}
        </OrderInfoForm>
        <ThanksMsg>Thanks</ThanksMsg>

        <ProductPriceWrap>
          <ProductPriceList>
            {cartItems
              .filter((item) => item.checked)
              .map((item) => (
                <ProductPrice key={item.id}>
                  <ProductNameQuantity>
                    <p>{item.name}</p>
                    <TotalQuantity>X {item.quantity}</TotalQuantity>
                  </ProductNameQuantity>
                  <ProductPriceQuantity>
                    <p>{(item.price * item.quantity).toLocaleString()} ₩</p>
                  </ProductPriceQuantity>
                </ProductPrice>
              ))}
          </ProductPriceList>
        </ProductPriceWrap>

        <TotalPrice>
          <p>Total Price :</p>
          <p>{totalPrice.toLocaleString()} ₩</p>
        </TotalPrice>

        <ButtonWrap>
          <DeleteButton onClick={handleDeleteAll}>Clear Cart</DeleteButton>
          <OrderButton type="button" onClick={handleCheckedOrder}>
            Buy Selected
          </OrderButton>
          <OrderButton type="button" onClick={handleOrder}>
            Checkout All
          </OrderButton>
        </ButtonWrap>
      </OrderInfoWrap>

      <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <OrderModal OrderIsOpen={OrderIsOpen} OrderOnClose={() => setOrderIsOpen(false)} />
    </CartContainer>
  );
}
