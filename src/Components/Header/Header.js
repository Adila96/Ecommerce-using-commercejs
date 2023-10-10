import React, { useContext, useState } from "react";
import "./Header.css";
import OlxLogo from "../../Assets/OlxLogo";
import Search from "../../Assets/Search";
import AddToCartButton from "../../Assets/AddToCartButton";
import AddToCartIcon from "../../Assets/AddToCartIcon";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const navigate = useNavigate();
  const handleSearch=($e)=>{
    props.onSearch($e.target.value);
    console.log("search text",$e.target.value);
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          onClick={() => {
            navigate("/");
          }}
        >
          <OlxLogo></OlxLogo>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={handleSearch}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div
          className="home"
          onClick={() => {
            navigate("/");
          }}
        >
          <span> Home </span>
        </div>
        <div
          className="products"
          onClick={() => {
            navigate("/products");
          }}
        >
          <span> Products </span>
        </div>
        <div className="signup"
        onClick={() => {
          navigate("/signup");
        }}>
          <span> Sign Up </span>
        </div>
        <div className="loginPage"
        onClick={() => {
            navigate("/login");
          }}>
          <span>Login</span>
        </div>

        <div
          className="cartMenu"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <AddToCartButton />
          <div className="cartMenuContent">
            <AddToCartIcon></AddToCartIcon>
            <span>CART</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
