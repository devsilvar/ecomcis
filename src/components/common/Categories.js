import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Categories({ categories }) {
  const {data, loading} = useSelector((state) => state.listProduct);
  const [productImage, setProductImage] = useState("/images/product/img1.png")

  console.log(data)
  const handleMouseEnter = (categoryId) => {
    const product = data?.filter(product => product.category.id === categoryId)[0]
    setProductImage(product?.images[0])
  };

  const handleMouseLeave = () =>{
    setProductImage("/images/product/img1.png")
  }
  return (
    <div className="absolute top-[100px] w-[100%] h-[300px] z-[10] border-[1px] bg-[#ffffff] px-[52px] py-[12px] flex justify-between items-center">
      
      <div className="ml-[20px] h-[100%] w-[800px] flex flex-col flex-wrap gap-[24px]">
        {categories &&
          categories.map((category) => (
              // <Link to={'/all-products?category='+category.name} onMouseEnter={() => handleMouseEnter(category.id)} onMouseLeave={handleMouseLeave}>{category.name}</Link>
            <p key={category.id} value={category.id} 
              className="text-[#000000] text-[16px] hover:text-[#8C033E]">
              <Link to={'/all-products?category='+category.name} onMouseEnter={() => handleMouseEnter(category.id)} onMouseLeave={handleMouseLeave}>{category.name}</Link>
            </p>
          ))}
      </div>
      <div>
        <img className="w-[200px]" src={productImage || "/images/product/img1.png"} alt="product_image" />
      </div>
    </div>
  );
}

export default Categories;
