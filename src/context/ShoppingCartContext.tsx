import { createContext, useContext, ReactNode, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type cartItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContextProps = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity -1 };
          } else {
            return item
          }
        });
      }
    });
  };
  const removeFromCart =(id:number)=>{
    setCartItems(currentItems =>{
  return currentItems.filter((item) => item.id !== id);
 })
  }

  return (
    <ShoppingCartContext.Provider value={{ getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
