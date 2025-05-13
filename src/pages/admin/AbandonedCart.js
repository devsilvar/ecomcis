import React from "react";
import ProductsFilter from "../../components/admin/ProductsFilter";
import ProductsTables from "../../components/admin/tables/ProductsTables";
import WelcomeTab from "../../components/admin/WelcomeTab";

function AbandonedCart() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Abandoned Cart" />
          <div className="flex justify-between  ">
            <div className="w-[100%]">
              {/* <ProductsFilter  /> */}
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                {/* <ProductsTables /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbandonedCart;
