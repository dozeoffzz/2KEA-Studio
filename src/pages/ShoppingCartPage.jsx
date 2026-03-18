import React, { useState } from "react";
import DeleteModal from "../components/modals/DeleteModal";
import DeleteProductBtn from "../assets/icons/deleteProductButton.svg";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import OrderModal from "../components/modals/OrderModal";
import { useCartStore } from "../stores/useCartStore";

const CartContainer = styled.div`
  padding: 40px 80px 40px 80px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
  gap: 120px;
`;

const CartList = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    padding: 2px;
    width: 10px;
    border: 1px solid ${Theme.colors.black};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.black};
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 40px 150px 1fr 200px 60px;
  gap: 40px;
  align-items: center;
  min-height: 231px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const ItemImg = styled.div`
  width: 198px;
  height: 231px;
  background-color: ${Theme.colors.overlay};
`;

const ItemInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 80px;
  font-size: ${Theme.fontsize.desktop.content};
`;

const ItemName = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
`;

const QuantityWrap = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: ${Theme.fontsize.desktop.content};
  gap: 20px;
`;

const DeleteProduct = styled.button`
  margin-right: 20px;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Quantity = styled.div`
  display: flex;
  gap: 80px;
`;

const QuantityUpDown = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UpButton = styled.button`
  font-size: ${Theme.fontsize.desktop.section};
`;

const OrderInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  height: 100%;
`;

const OrderInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderName = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${Theme.fontsize.desktop.content};
  border-bottom: 1px solid ${Theme.colors.black};
`;
const OrderPhone = styled(OrderName)``;
const OrderEmail = styled(OrderName)``;
const OrderAddress = styled(OrderName)``;

const InputName = styled.input`
  text-align: right;
  outline: transparent;
  width: 100%;
`;
const InputPhone = styled(InputName)``;
const InputEmail = styled(InputName)``;
const InputAddress = styled(InputName)``;

const ThanksMsg = styled.p`
  padding: 50px;
  display: flex;
  align-self: center;
  font-size: ${Theme.fontsize.desktop.section};
`;

const ProductPriceWrap = styled.div`
  padding: 20px 0 20px 0;
  border-top: 1px solid ${Theme.colors.black};
  border-bottom: 1px solid ${Theme.colors.black};
  font-size: ${Theme.fontsize.desktop.content};
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

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${Theme.fontsize.desktop.content};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const DeleteButton = styled.button`
  min-width: 180px;
  min-height: 50px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.black};
`;

const OrderButton = styled(DeleteButton)``;

export default function ShoppingCartPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [OrderIsOpen, setOrderIsOpen] = useState(false);
  // useCaretStore에서 정의한 함수 구조분해로 가져오기
  const { cartItems, handleQuantity, handleCheck, handleDelete } = useCartStore();

  // 체크된 상품의 총 가격
  const totalPrice = cartItems.filter((item) => item.checked).reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  // 폼 새로고침 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // 상품이 없으면 버튼이 안눌리게 하기
  const HaveItems = cartItems.length > 0;
  const HaveCheckedItems = cartItems.some((item) => item.checked);

  const handleOrder = () => {
    // 상품이 없다면 되돌아 가라!
    if (!HaveItems) return;
    // 있으면 모달
    setOrderIsOpen(true);
  };

  const handleCheckedOrder = () => {
    if (!HaveCheckedItems) return;
    setOrderIsOpen(true);
  };

  const handleDeleteAll = () => {
    if (!HaveItems) return;
    setIsOpen(true);
  };
  return (
    <CartContainer>
      <CartList>
        {/* 디테일 페이지에서 상품 추가 리스트 배열 받아오기 예시 */}
        {cartItems.map((item) => (
          <Item key={item.id}>
            <CheckBox type="checkbox" onChange={() => handleCheck(item.id)} checked={item.checked} />
            <ItemImg></ItemImg>
            <ItemInfoWrap>
              <ItemName>{item.name}</ItemName>
              <p>{item.price.toLocaleString()} ₩</p>
              <p>적립금: -</p>
              <p>배송비: 무료</p>
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
      <OrderInfoWrap>
        {/* 주문 폼 */}
        <OrderInfoForm onSubmit={handleSubmit}>
          <OrderName>
            <p>Name</p>
            <InputName placeholder="Name" type="text" />
          </OrderName>
          <OrderPhone>
            <p>Phone</p>
            <InputPhone placeholder="Phone" type="text" />
          </OrderPhone>
          <OrderEmail>
            <p>Email</p>
            <InputEmail placeholder="Email" type="email" />
          </OrderEmail>
          <OrderAddress>
            <p>Address</p>
            <InputAddress placeholder="Address" type="address" />
          </OrderAddress>
        </OrderInfoForm>
        <ThanksMsg>Thanks</ThanksMsg>
        <ProductPriceWrap>
          <ProductPriceList>
            {cartItems.map((item) => (
              <ProductPrice key={item.id}>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()} ₩</p>
              </ProductPrice>
            ))}
          </ProductPriceList>
        </ProductPriceWrap>
        <TotalPrice>
          <p>Total Price :</p>
          <p>{totalPrice.toLocaleString()} ₩</p>
        </TotalPrice>
        <ButtonWrap>
          <DeleteButton onClick={handleDeleteAll}>Delete All</DeleteButton>
          <OrderButton type="submit" onClick={handleCheckedOrder}>
            Cheked Buy
          </OrderButton>
          <OrderButton type="submit" onClick={handleOrder}>
            Buy All
          </OrderButton>
        </ButtonWrap>
      </OrderInfoWrap>
      <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <OrderModal OrderIsOpen={OrderIsOpen} OrderOnClose={() => setOrderIsOpen(false)} />
    </CartContainer>
  );
}
