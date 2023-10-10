import React, { useContext, useEffect, useState } from "react";
import "./CategoryProductList.css";
import Heart from "../../Assets/Heart";
import { API_KEY, baseUrl } from "../Constants/Constants";
import { CategoryContext } from "../../Store/CategoriesContext";
import { useParams,useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { ProductDetailContext } from "../../Store/ProductDetailsContext";

function CategoryProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const { category } = useContext(CategoryContext);
  const {setProductId}=useContext(ProductDetailContext);
  const navigate = useNavigate();
  const params = useParams();
  const handleData = (data) => {
    setProductList(data);
    setIsLoading(false);
    console.log("isLoading", isLoading);
  };
  useEffect(() => {
    const headers = { "X-Authorization": API_KEY };
    fetch(baseUrl + "products?category_slug=" + category, { headers })
      .then(setIsLoading(true))
      .then((productListResponse) => {
        productListResponse.json().then((data) => {
            console.log(data);
          setTimeout(() => handleData(data.data), 3000);
        });
      });
  }, [category]);
  const renderProductList = (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>{params.category.substring(1, 25)}</span>
        </div>
        <div className="cards">
          {productList.map((product) => {
            return (
              <div className="card" onClick={()=>{
                    navigate('/view');
                    setProductId(product.id);
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">{"Rs." + product.price.raw}</p>
                  <span className="kilometer">{product.categories.name}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="cart">Add to Cart</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  return <div>{isLoading ? <LoadingSpinner /> : renderProductList}</div>;
}

export default CategoryProductList;
