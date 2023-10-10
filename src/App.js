import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import ViewProduct from "./Pages/ViewProduct";
import Category from "./Store/CategoriesContext";
import CategoryBasedProducts from "./Pages/CategoryBasedProducts";
import ProductDetails from "./Store/ProductDetailsContext";
import CartPage from "./Pages/CartPage";
import AddCart from "./Store/CartContext";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/SignUp";

function App() {
  return (
    <div className="App">
      <Category>
        <ProductDetails>
          <AddCart>
              <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/products" element={<Products />}></Route>
                <Route path="/view" element={<ViewProduct />}></Route>
                <Route
                  path="/:category"
                  element={<CategoryBasedProducts />}
                ></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
              </Routes>
          </AddCart>
        </ProductDetails>
      </Category>
    </div>
  );
}

export default App;
