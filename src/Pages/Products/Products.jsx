import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Products = () => {
  const attributes = [
   
    { id: "title", label: "Products Title" },
    { id: "published", label: "Visibility" },
    { id: "createdAt", label: "Created At" },
  ];

 

  const { tableUI } = useTable({  attributes, tableType: "Products" });

  return <>{tableUI}</>;
};

export default Products;
