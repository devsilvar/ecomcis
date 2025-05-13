
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../../store/features/product/listProduct";
import {formatDateOnly, formatMoney} from "../../../utils/nairaFormat";

import MoonLoader from "react-spinners/MoonLoader";
import { Link } from "react-router-dom";
import { useCurrency } from "../../../utils/CurrencyProvider";


function ProductsTables({ products , loading }) {

  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const { currency, conversionRate } = useCurrency();
  

  const handleGetProduct = () => {
    dispatch(listProduct({search}));
  };

  useEffect(() => {
    handleGetProduct();
  }, []);


  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">QTY.</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {loading ? <div className="w-full mx-auto flex justify-center items-center text-[#4E0240]"> <MoonLoader size="60"/> </div>: (
                products?.map(product => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product?.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p>{product.product_tag}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{formatMoney(product.price, currency, conversionRate)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{product.category.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{product.quantity}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <p>{formatDateOnly(product.created_at)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <Link className="p-3 bg-[#000] text-[#fff]" to={`/admin/products/${product.id}`}>Details</Link>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
    </div>
  );
}

export default ProductsTables;
