import React, { useContext, useEffect, useState } from "react";
import "./ProductView.css";
import { ProductDetailContext } from "../../Store/ProductDetailsContext";
import { API_KEY, baseUrl } from "../Constants/Constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CartContext } from "../../Store/CartContext";

function ProductView() {
  const { productId } = useContext(ProductDetailContext);
  const [isLoading, setIsLoading] = useState(false);
  const {cartId}=useContext(CartContext);
  const {setCartId}=useContext(CartContext);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: { id: "", url: "" },
    price: { raw: "" },
    categories: [{ name: "" }],
    description: "",
  });
  const handleData = (data) => {
    setProductDetails(data);
    setIsLoading(false);
  };
  useEffect(() => {
    console.log("productId", productId);
    const headers = { "X-Authorization": API_KEY };
    fetch(baseUrl + "products/" + productId, { headers })
      .then(setIsLoading(true))
      .then((productResponse) => {
        productResponse.json().then((data) => {
          console.log("isLoading", isLoading);
          setTimeout(() => handleData(data), 3000);
          console.log("product-Detaials", data);
        });
      });
  }, []);

  console.log("productDetails", productDetails);

  return (
    <div>
      {console.log("product", productDetails)}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="viewParentDiv">
          <div className="imageShowDiv">
            <img src={productDetails.image.url} alt="product-image" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>{"Rs." + productDetails.price.raw}</p>
              <span>{productDetails.name}</span>
              <p className="categories">{productDetails.categories[0].name}</p>
              <div>{productDetails.description}</div>
            </div>
            <div
              className="contactDetails"
              onClick={() => {
                console.log("cartId", cartId);
                if (cartId === "") {
                  console.log("if cartId", cartId);
                  fetch(baseUrl + "carts", {
                    headers: { "X-Authorization": API_KEY },
                  }).then((cartResponse) => {
                    cartResponse.json().then((data) => {
                      setCartId(data.id);
                      console.log(data);
                    });
                  });
                  fetch(baseUrl + "carts/" + cartId, {
                    method: "POST",
                    body: JSON.stringify({
                      id: productDetails.id,
                      quantity: 1,
                    }),
                    headers: { "X-Authorization": API_KEY },
                  }).then((response) => {
                    response.json().then((data) => {
                      console.log(data);
                    });
                  });
                } else {
                  console.log(
                    "productId to cart",
                    productDetails.id,
                    typeof productDetails.id
                  );
                  fetch(baseUrl + "carts/" + cartId, {
                    method: "POST",
                    body: JSON.stringify({
                      id: productDetails.id,
                      quantity: "1",
                    }),
                    headers: {
                      "X-Authorization": API_KEY,
                      "Content-Type": "application/json",
                    },
                  }).then((response) => {
                    response.json().then((data) => {
                      console.log(data);
                    });
                  });
                }
              }}
            >
              <p>Add To Cart</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductView;
