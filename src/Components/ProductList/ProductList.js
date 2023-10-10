import React, { useContext, useEffect, useState } from "react";
import Heart from "../../Assets/Heart";
import "./ProductList.css";
import { API_KEY, baseUrl } from "../Constants/Constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { ProductDetailContext } from "../../Store/ProductDetailsContext";
import { CartContext } from "../../Store/CartContext";

function ProductList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const { setProductId } = useContext(ProductDetailContext);
  const { cartId } = useContext(CartContext);
  const { setCartId } = useContext(CartContext);
  const [filteredProducts,setFilteredPrducts]=useState([]);
  const navigate = useNavigate();
  const handleData = (data) => {
    setProductList(data);
    setFilteredPrducts(data);
    setIsLoading(false);
    console.log("isLoading", isLoading);
  };
  const headers = { "X-Authorization": API_KEY };
  useEffect(() => {
    fetch(baseUrl + "products?limit=25", { headers })
      .then(setIsLoading(true))
      .then((productListResponse) => {
        productListResponse.json().then((data) => {
          setTimeout(() => handleData(data.data), 3000);
        });
      });  
  }, []);
  useEffect(()=>{
    console.log("filtered products")
    setFilteredPrducts(productList.filter((product)=>{
      return product.name.toLowerCase().includes(props.searchText);
    }))
  },[props.searchText]);
  console.log("search text from productlist",props.searchText);
  console.log("product list", productList);
  const renderProductList = (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Products</span>
        </div>
        <div className="cards">
          {filteredProducts.map((product) => {
            return (
              <div className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div
                  className="image"
                  onClick={() => {
                    navigate("/view");
                    setProductId(product.id);
                  }}
                >
                  <img src={product.image.url} alt="" />
                </div>
                <div
                  className="content"
                  onClick={() => {
                    navigate("/view");
                    setProductId(product.id);
                  }}
                >
                  <p className="rate">{"Rs." + product.price.raw}</p>
                  <span className="kilometer">{product.categories.name}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div
                  className="cart"
                  onClick={() => {
                    console.log("cartId",cartId);
                    if (cartId === "") {
                      console.log("if cartId",cartId);
                      fetch(baseUrl + "carts",{headers:{"X-Authorization": API_KEY}}).then(
                        (cartResponse) => {
                          cartResponse.json().then((data) => {
                            setCartId(data.id);
                            console.log(data);
                          });
                        }
                      );
                      fetch(baseUrl + "carts/" + cartId, {
                        method: "POST",
                        body: JSON.stringify({
                          "id": product.id,
                          "quantity": 1,
                        }),
                        headers: { "X-Authorization": API_KEY  },
                      }).then((response) => {
                        response.json().then((data) => {
                          console.log(data);
                        });
                      });
                    } else {
                      console.log("productId to cart",product.id,typeof(product.id))
                      fetch(baseUrl + "carts/" + cartId, {
                        method: "POST",
                        body: JSON.stringify({
                          "id": product.id,
                          "quantity": "1",
                        }),
                        headers: {"X-Authorization": API_KEY ,"Content-Type": "application/json"},
                      }).then((response) => {
                        response.json().then((data) => {
                          console.log(data);
                        });
                      });
                    }
                  }}
                >
                  Add to Cart
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  return <div>{isLoading ? <LoadingSpinner /> : renderProductList}</div>;
}

export default ProductList;
