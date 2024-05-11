import React, { createContext, useState } from "react";

const AddProduct = createContext();

export const AddProductProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <AddProduct.Provider value={{ showCart, setShowCart }}>
      {children}
    </AddProduct.Provider>
  );
};

export default AddProduct;
