import React from 'react';
import Header from '../Components/Header/Header';
import ProductView from '../Components/ProductView/ProductView';
import Footer from '../Components/Footer/Footer';
import NavBar from '../Components/NavBar/NavBar';

function ViewProduct() {
  return (
    <div>
        <Header></Header>
        <NavBar></NavBar>
        <ProductView></ProductView>
        <Footer></Footer>
    </div>
  )
}

export default ViewProduct