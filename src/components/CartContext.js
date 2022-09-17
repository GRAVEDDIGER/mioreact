import React,{ createContext,useState } from "react";

export const CartContext  =createContext();


function CartProvider({children}) {
  const [cartData, cartSetter] = useState([])
  const isOnArray =(id)=>{
    let condicion =false;
    console.log(id)
cartData.forEach(item=>{
    if (item.id === id) condicion= true
    
})
return condicion
  }
  const addItem =(id,price,title,quantity)=>{
if (!isOnArray(id)) cartSetter([...cartData,{id,price,title,quantity}]) 
else alert("El id ya existe")
  }
  const removeItem=(id)=>{
if (isOnArray(id)) {cartSetter(cartData.filter(item=>item.id !== id))
console.log("borrado")
}

  }
  const clearCart=()=>{
    cartSetter([])
  }
    return (
        <CartContext.Provider value={[cartData,addItem,removeItem,clearCart]}>
            {children}
        </CartContext.Provider>
  )
}

export default CartProvider