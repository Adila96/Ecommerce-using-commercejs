import React, { useContext, useState } from "react";
import Delete from "../../Assets/Delete";
import "./Cart.css";
import { useEffect } from "react";
import { CartContext } from "../../Store/CartContext";
import { baseUrl, API_KEY } from "../Constants/Constants";
import EmptyCart from "../EmptyCart/EmptyCart";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Cart() {
  const { cartId } = useContext(CartContext);
  const headers = { "X-Authorization": API_KEY };
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [updateCart, setupdateCart] = useState(false);
  const [cartDetails, setCartDetails] = useState({
    line_items: [],
    subtotal: { formatted_with_symbol: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("cartId from cart", cartId);
    if (cartId === "") {
      setIsCartEmpty(true);
    } else {
      fetch(baseUrl + "carts/" + cartId, { headers }).then(setIsLoading(true)).then((Response) => {
        Response.json().then((data) => {
          console.log("cartDetails", data);
          setTimeout(() => {
            setIsLoading(false);
            if(data.total_items===0){
            setIsCartEmpty(true);
          }
          setCartDetails(data)}, 3000);
          
        });
      });
    }
  }, [isCartEmpty,updateCart]);
  const renderCart = (
    <div className="parentCartContainer">
      <div className="cartDetails">
        <div className="cardsCart">
          {cartDetails.line_items.map((product) => {
            return (
              <div className="card">
                <img src={product.image.url} alt="" />
                <p className="productName">{product.name}</p>
                <button className="updateBtn"onClick={()=>{
                    fetch(baseUrl + "carts/" + cartId + "/items/"+product.id, {
                        method: "PUT",
                        body:JSON.stringify({
                            "quantity": (product.quantity - 1)
                        }),
                        headers: { "X-Authorization": API_KEY,"Content-Type": "application/json" },
                      }).then(setIsLoading(true)).then(setupdateCart(true)).then((Response) => {
                        Response.json().then((data) => {
                            setTimeout(() => {
                                setupdateCart(false);
                                setIsLoading(false);
                                console.log("update",data);
                            },3000);
                        });
                      });
                }}>-</button>
                <p>{product.quantity}</p>
                <button onClick={()=>{
                    fetch(baseUrl + "carts/" + cartId + "/items/"+product.id, {
                        method: "PUT",
                        body:JSON.stringify({
                            "quantity": (product.quantity + 1)
                        }),
                        headers: { "X-Authorization": API_KEY,"Content-Type": "application/json" },
                      }).then(setIsLoading(true)).then(setupdateCart(true)).then((Response) => {
                        Response.json().then((data) => {
                            setTimeout(() => {
                                setupdateCart(false);
                                setIsLoading(false);
                                console.log("update",data);
                            },3000);
                        });
                      });
                }}>+</button>
                <button onClick={()=>{
                    fetch(baseUrl + "carts/" + cartId + "/items/"+product.id, {
                        method: "PUT",
                        body:JSON.stringify({
                            "quantity": 0
                        }),
                        headers: { "X-Authorization": API_KEY,"Content-Type": "application/json" },
                      }).then(setIsLoading(true)).then(setupdateCart(true)).then((Response) => {
                        Response.json().then((data) => {
                            setTimeout(() => {
                                setupdateCart(false);
                                setIsLoading(false);
                                console.log("update",data);
                            },3000);
                        });
                      });
                }}>
                  <Delete></Delete>
                </button>
              </div>
            );
          })}
        </div>
        <div className="payment">
          <h3>PAYMENT DETAILS</h3>
          <p>{"Total items : " + cartDetails.total_items}</p>
          <p>{"Total : " + cartDetails.subtotal.formatted_with_symbol}</p>
          <p>Shipping Charges : Rs.0</p>
          <hr />
          <h3>
            {"Total amount to be paid : " +
              cartDetails.subtotal.formatted_with_symbol}
          </h3>
        </div>
      </div>
      <div className="cartBtns">
        <button
          onClick={() => {
            fetch(baseUrl + "carts/" + cartId + "/items", {
              method: "DELETE",
              headers: { "X-Authorization": API_KEY },
            }).then((Response) => {
              Response.json().then((data) => {
                console.log("EMPTYCART", data);
              });
            });
            setIsCartEmpty(true);
          }}
        >
          EMPTY CART
        </button>
        <button>LOGIN TO PROCEED</button>
      </div>
    </div>
  );
  return <div>{isLoading?<LoadingSpinner></LoadingSpinner>:(isCartEmpty ? <EmptyCart /> : renderCart)}</div>;
}

export default Cart;
