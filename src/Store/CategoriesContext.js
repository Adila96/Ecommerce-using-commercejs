import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

function Category({ children }) {
  const [category, setCategory] = useState(
    localStorage.getItem("category")
      ? JSON.parse(localStorage.getItem("category"))
      : ""
  );

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  useEffect(() => {
    const categories = localStorage.getItem("category");
    if (categories) {
      setCategory(JSON.parse(categories));
    }
  }, []);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
export default Category;
