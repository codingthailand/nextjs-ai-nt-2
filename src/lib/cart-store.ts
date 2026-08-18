import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  productId: string
  name: string
  price: number
  qty: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, qty: i.qty + item.qty }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.productId !== productId),
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.qty * item.price, 0),
    }),
    {
      name: 'skill-cart', // key ที่ใช้ใน localStorage
    }
  )
)