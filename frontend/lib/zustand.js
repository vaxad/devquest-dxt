import { create } from "zustand";

const store = create((set) => ({
  cart: [],
  add: (item) => set((state) => ({ cart: state.cart.concat([item]) })),
  sub: (item) => set((state) => ({ cart: remove(item, state.cart) })),
  arr: [],
  setArr: (item) => set((state) => ({ arr: item })),
  loading: false,
  setLoading: (item) => set((state) => ({ loading: item })),
}));

const remove = (item, arr) => {
  const i = arr.find((it) => it.id === item.id);
  const idx = arr.indexOf(i);
  arr.splice(idx, 1);
  return arr;
};
export default store;
