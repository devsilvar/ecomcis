import React, {useEffect} from "react";
import Container from "../../ui/Container";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../store/features/product/listCategory";


function Filter() {
  const dispatch = useDispatch()
  const categoryState = useSelector((store)=> store.listCategory)

  const handleListCategory = ()=>{
    dispatch(listCategory())
  }

  useEffect(()=>{
    handleListCategory()
  }, [])


  return (
    <Container className="flex justify-between  overflow-scroll gap-[24px]">
      <div className="flex gap-[24px]">
      
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
          <option>NGN 0 - NGN 10,000 </option>
          <option>NGN 10,001 - NGN 50,000 </option>
          <option>NGN 50,0001 - NGN 100,000 </option>
          <option>above NGN 100,000 </option>
        </select>

        <select className="border-r-[1px] pr-[16px]">
          <option>SIZE</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

      </div>
      <div>
        <select>
          <option value="">SORT BY</option>
        </select>
      </div>
    </Container>
  );
}

export default Filter;
