// store/cartStore.js
import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item._id === product._id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));

