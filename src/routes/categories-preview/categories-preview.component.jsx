import { useContext } from "react";
// import SHOP_DATA from "../../shopdata.json";

import { CategoriesContext } from "../../context/categories.context";
import { Fragment } from "react/cjs/react.production.min";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  //   console.log(products);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
