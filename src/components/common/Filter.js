import React, {useEffect} from "react";
import Container from "../../ui/Container";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../store/features/product/listCategory";


function Filter() {
  const dispatch = useDispatch()
  const categoryState = useSelector((store)=> store.listCategory)
  const {data} = useSelector((store) => store.listProduct);


  console.log("DATA DATA ", data)
  const handleListCategory = ()=>{
    dispatch(listCategory())
  }

  useEffect(()=>{
    handleListCategory()
  }, [])


  return (
    <Container className="flex justify-center overflow-scroll gap-[24px]">
      <div className="flex gap-[24px] p-[50px]">
        <select className="border-r-[1px] pr-[16px]">
          <option>CATEGORIES</option>
          {
            categoryState.data?.map((option) => (
              <option key={option.id}> {option.name} </option>
            ))
          }
        </select>
        
        <select className="border-r-[1px] pr-[16px]">
          <option>PRICE</option>
          <option>₦ 0 - ₦ 10,000 </option>
          <option>₦ 10,001 - ₦ 50,000 </option>
          <option>₦ 50,0001 - ₦ 100,000 </option>
          <option>above ₦ 100,000 </option>
        </select>

        <select className="border-r-[1px] pr-[16px]">
          <option>SIZE</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        
        <div>
          <select>
            <option value="">SORT BY</option>
          </select>
        </div>
      </div>

    </Container>
  );
}

export default Filter;
