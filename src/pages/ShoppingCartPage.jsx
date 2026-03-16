import React, { useState } from "react";
import DeleteModal from "../components/modals/DeleteModal";
import DeleteProductBtn from "../assets/icons/deleteProductButton.svg";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";

// 쇼핑카트 담기 장바구니 예시버전
const addProduct = [
  {
    id: 1,
    num: "001",
    name: "Seraph Curve",
    material: "Plastic",
    content: "선 하나로 완성된 디자인.",
    category: "seating",
    price: 138000,
    quantity: 2,
  },
  {
    id: 2,
    num: "002",
    name: "Ember Lounge",
    material: "Fabric",
    content: "차분한 균형 속에서 완성된 절제된 아름다움.",
    category: "seating",
    price: 114000,
    quantity: 1,
  },
  {
    id: 3,
    num: "003",
    name: "Coco Hanging",
    material: "Rattan",
    content: "자연의 여유를 닮은 실루엣.",
    category: "seating",
    price: 234000,
    quantity: 1,
  },
  {
    id: 4,
    num: "004",
    name: "Nero Chair",
    material: "Plastic",
    content: "단순한 형태 그러나 가장 강한 존재감.",
    category: "seating",
    price: 78000,
    quantity: 1,
  },
];

const CartContainer = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
  gap: 40px;
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
  grid-template-columns: 40px 198px 1fr 200px;
  gap: 40px;
  align-items: center;
  min-height: 231px;
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
  margin-left: 100px;
  font-size: ${Theme.fontsize.desktop.content};
`;

const ItemName = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
`;

const QuantityWrap = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: ${Theme.fontsize.desktop.content};
  gap: 20px;
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
  justify-content: center;
  gap: 40px;
`;

const DeleteButton = styled.button`
  min-width: 290px;
  min-height: 50px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.black};
`;

const OrderButton = styled(DeleteButton)``;

export default function ShoppingCartPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CartContainer>
      <CartList>
        {addProduct.map((item) => (
          <Item key={item.id}>
            <button>
              <img src={DeleteProductBtn} />
            </button>
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
                <UpButton>-</UpButton>
                <p>{item.quantity}</p>
                <UpButton>+</UpButton>
              </QuantityUpDown>
            </QuantityWrap>
          </Item>
        ))}
      </CartList>
      <OrderInfoWrap>
        {/* 주문 폼 */}
        <OrderInfoForm>
          <OrderName>
            <p>Name</p>
            <InputName placeholder="Name" />
          </OrderName>
          <OrderPhone>
            <p>Phone</p>
            <InputPhone placeholder="Phone" />
          </OrderPhone>
          <OrderEmail>
            <p>Email</p>
            <InputEmail placeholder="Email" />
          </OrderEmail>
          <OrderAddress>
            <p>Address</p>
            <InputAddress placeholder="Address" />
          </OrderAddress>
        </OrderInfoForm>
        <ThanksMsg>Thanks</ThanksMsg>
        <ProductPriceWrap>
          <ProductPriceList>
            {addProduct.map((item) => (
              <ProductPrice key={item.id}>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()} ₩</p>
              </ProductPrice>
            ))}
          </ProductPriceList>
        </ProductPriceWrap>
        <TotalPrice>
          <p>Total Price :</p>
          <p>총 가격 ₩</p>
        </TotalPrice>
        <ButtonWrap>
          <DeleteButton onClick={() => setIsOpen(true)}>Delete All</DeleteButton>
          <OrderButton onClick={() => setIsOpen(true)}>Buy</OrderButton>
        </ButtonWrap>
      </OrderInfoWrap>
      <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </CartContainer>
  );
}
