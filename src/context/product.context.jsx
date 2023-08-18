import { createContext, useState, useEffect } from "react";

import {
  addcollectionAndDoc,
  getCategoriesAndDocs,
} from "../utils/firebase/firebase.util.js";

export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocs();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);
  //* the useeffect that was used to add data to firestore
  // useEffect(() => {
  //   addcollectionAndDoc("categories", SHOP_DATA);
  // }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
