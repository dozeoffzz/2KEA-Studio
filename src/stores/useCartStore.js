import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      setCart: (items) => set({ cartItems: items }),

      // 카트 상품 수량 증가 감소
      // 상품 ID를 받아서 증가(inc) 감소(dec)
      handleQuantity: (id, type) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            // 아이디가 같다면
            if (item.id === id) {
              // 수량 증가
              if (type === "inc") return { ...item, quantity: item.quantity + 1 };
              // 수량 감소(1개 이하로 가지 않게)
              if (type === "dec")
                return {
                  ...item,
                  quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                };
            }
            return item;
          }),
        })),
      // 체크 되어 있는 상품
      // 아이디값을 비교해서 현재 상품인지 확인하고 체크 토글
      handleCheck: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
        })),
      // 상품 삭제
      // 상품 아이디 받아오고 필터로 삭제후 재렌더링
      handleDelete: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      // 상품 추가
      addItem: (newItem) =>
        set((state) => {
          const exist = state.cartItems.find((item) => item.id === newItem.id);

          // 이미 해당 상품이 이미 있으면 수량 증가
          if (exist) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
              ),
            };
          }
          // 새로운 상품이면 추가 (체크 기본값 true)
          return {
            cartItems: [...state.cartItems, { ...newItem, checked: true }],
          };
        }),
      clearCart: () => set({ cartItems: [] }),
    }),
    // 스토리지 이름(새로고침 해도 삭제되지 않음)
    { name: "cart-storage" },
  ),
);
