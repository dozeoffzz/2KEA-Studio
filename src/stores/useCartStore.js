import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      setCart: (items) => set({ cartItems: items }),

      // 카트 상품 수량 증가 감소
      handleQuantity: (id, type) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.id === id) {
              if (type === "inc") return { ...item, quantity: item.quantity + 1 };
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
      handleCheck: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
        })),
      // 상품 삭제
      handleDelete: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      // 상품 추가
      addItem: (newItem) =>
        set((state) => {
          const exist = state.cartItems.find((item) => item.id === newItem.id);

          // 이미 해당 상품이 있으면 수량 증가
          if (exist) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
              ),
            };
          }

          return {
            cartItems: [...state.cartItems, { ...newItem, checked: true }],
          };
        }),
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" },
  ),
);
