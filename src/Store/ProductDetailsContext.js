import { createContext, useState, useEffect } from "react";

export const ProductDetailContext = createContext();

function ProductDetails({ children }) {
  const [productId, setProductId] = useState(
    localStorage.getItem("productId")
      ? JSON.parse(localStorage.getItem("productId"))
      : ""
  );

  useEffect(() => {
    localStorage.setItem("productId", JSON.stringify(productId));
  }, [productId]);

  useEffect(() => {
    const details = localStorage.getItem("productId");
    if (details) {
      setProductId(JSON.parse(details));
    }
  }, []);

  return (
    <ProductDetailContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductDetailContext.Provider>
  );
}
export default ProductDetails;
