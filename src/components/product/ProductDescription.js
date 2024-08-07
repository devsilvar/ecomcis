import React from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { formatMoney } from "../../utils/nairaFormat";


function ProductDescription({name, description, slug, price, variations, sizes, colors}) {
  const [openDesc, setOpenDesc] = React.useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = React.useState(false);

  const toggleDesc = () =>{
    setOpenDesc(!openDesc)
  }

  const toggleReturnPolicy = () =>{
    setOpenReturnPolicy(!openReturnPolicy)
  }
 
  return (
    <div className="w-[100%] lg:pr-[150px]">
      <div className="px-[24px]">
        <div>
          <p className="text-[0.875rem] font-[700]">home / {slug}</p>
          <p className="text-[1.5rem] py-[15px]">
            {name}
          </p>
        </div>
        <div className="border-y-[1px] flex flex-col  px-[8px]">
          <div className="flex justify-between text-[1rem] leading-0 cursor-pointer" onClick={toggleDesc}> 
              <b>Description</b>
              <p className="text-[2rem] leading-0">{openDesc ? ' - ' : '+'}</p>
          </div>
          <p className={`w-[100%] ${openDesc ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
            {description}</p>
        </div>
        
        <div className="border-y-[1px] flex flex-col  px-[8px]">
          <div className="flex justify-between text-[1rem] leading-0 cursor-pointer" onClick={toggleReturnPolicy}> 
              <b>Delivery & Return</b>
              <p className="text-[2rem] leading-0">{openReturnPolicy ? ' - ' : '+'}</p>
          </div>
          <p className={`w-[100%] ${openReturnPolicy ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
          Curabitur euismod commodo metus, non faucibus lacus cursus at. Maecenas at dui mi. Mauris tempor massa turpis, sed vestibulum mi convallis in. Donec tincidunt orci vestibulum accumsan maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed interdum eros. Ut congue, libero non accumsan imperdiet, dolor ex consectetur nunc, nec accumsan tortor dolor eget odio. Mauris non mauris et nunc dignissim efficitur et id enim. In ut rhoncus massa.</p>
        </div>

        <p className="text-[0.75rem] leading-0 mt-[19px]">Variation</p>
        <div className="mt-[32px] flex gap-[5px]">
          {variations ? (
            variations.map(variation => (
              <div className="flex gap-[5px] bg-[#E0E0E0] p-2 rounded-[10px]">
                <div className={`w-[40px] h-[40px] rounded-[10px]`} style={{ backgroundColor: variation.color }}></div>
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[10px] bg-[#fff]">
                  <p className="text-[20px]">{variation.size}</p>
                </div>
                <div className="h-[40px] text-[1.5m] px-2 flex items-center justify-center rounded-[10px] bg-[#fff]">
                  {formatMoney(variation.price)}
                </div>
              </div>
            ))
          ) : ''}

        </div>
      </div>

      <div className="border-t-[1px] mt-[40px] px-[24px]">
        <p className="text-[0.75rem] leading-0 mt-[19px]">Price</p>
        <p className="text-[2rem] leading-0 font-[700]">{price}</p>
      </div>
    </div>
  );
}

export default ProductDescription;
