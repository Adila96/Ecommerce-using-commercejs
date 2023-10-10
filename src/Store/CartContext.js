import { createContext,useState,useEffect } from "react";

export const CartContext = createContext();

function AddCart({children}){
    const[cartId,setCartId]=useState(localStorage.getItem("cartId")
    ? JSON.parse(localStorage.getItem("cartId")):"");
    useEffect(() => {
        localStorage.setItem("cartId", JSON.stringify(cartId));
      }, [cartId]);
    
      useEffect(() => {
        const cartIds = localStorage.getItem("cartId");
        if (cartIds) {
            setCartId(JSON.parse(cartIds));
        }
      }, []);
    return(
        <CartContext.Provider value={{cartId,setCartId}}>
            {children}
        </CartContext.Provider>
    )
}
export default AddCart;