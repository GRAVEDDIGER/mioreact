import React,{ createContext,useState } from "react";

export const CartContext  =createContext();


function CartProvider({children}) {
  const [cartData, cartSetter] = useState([])
    return (
        <CartContext.Provider value={[cartData,cartSetter]}>
            {children}
        </CartContext.Provider>
  )
}

export default CartProvider