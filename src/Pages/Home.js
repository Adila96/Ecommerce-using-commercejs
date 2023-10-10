import React from 'react'
import Header from '../Components/Header/Header'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import ProductList from '../Components/ProductList/ProductList'
import NavBar from '../Components/NavBar/NavBar'

function Home() {
  return (
    <div>
        <Header></Header>
        <NavBar></NavBar>
        <Banner></Banner>
        <ProductList></ProductList>
        <Footer></Footer>
    </div>
  )
}

export default Home