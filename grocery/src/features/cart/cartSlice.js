import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'items';

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function toQuantity(value) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity) || quantity < 1) {
    return 1;
  }
  return Math.min(100, Math.floor(quantity));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: loadCart(),
  },
  reducers: {
    itemAddToCart: (state, action) => {
      const incoming = {
        ...action.payload,
        item_quantity: toQuantity(action.payload.item_quantity),
      };
      const existing = state.cart.find((item) => String(item.id) === String(incoming.id));

      if (existing) {
        existing.item_quantity = toQuantity(existing.item_quantity + incoming.item_quantity);
      } else {
        state.cart.push(incoming);
      }

      persistCart(state.cart);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => String(item.id) !== String(action.payload));
      persistCart(state.cart);
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find((entry) => String(entry.id) === String(action.payload.id));
      if (!item) {
        return;
      }

      item.item_quantity = toQuantity(action.payload.value);
      persistCart(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem(CART_STORAGE_KEY);
    },
  },
});

export const { itemAddToCart, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
