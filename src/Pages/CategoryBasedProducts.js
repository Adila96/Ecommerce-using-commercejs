import React from 'react';
import CategoryProductList from '../Components/CategoryProductList/CategoryProductList';
import Header from '../Components/Header/Header';
import NavBar from '../Components/NavBar/NavBar';
import Footer from '../Components/Footer/Footer';

function CategoryBasedProducts() {
  return (
    <div>
        <Header></Header>
        <NavBar></NavBar>
        <CategoryProductList></CategoryProductList>
        <Footer></Footer>
    </div>
  )
}

export default CategoryBasedProducts