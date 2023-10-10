import React from 'react';
import Header from '../Components/Header/Header';
import NavBar from '../Components/NavBar/NavBar';
import ProductList from '../Components/ProductList/ProductList';
import Footer from '../Components/Footer/Footer';
import { useState } from 'react';

function Products() {

  const [searchText,setSearchText]=useState("");

  function onSearchTextChange(text){
    setSearchText(text);
    console.log("products search text",text);
  }

  return (
    <div>
        <Header onSearch={onSearchTextChange}></Header>
        <NavBar></NavBar>
        <ProductList searchText={searchText}></ProductList>
        <Footer></Footer>
    </div>
  )
}

export default Products