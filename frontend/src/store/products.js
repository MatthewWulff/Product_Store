import { create } from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" }
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
    let data
    try {
      data = await res.json()
    } catch {
      return {
        success: false,
        message: "Invalid or empty response from server",
      }
    }
    
    set((state) => ({ products: [...state.products, data.data] }))
    return { success: true, message: "Product created successfully" }
  },
}))
