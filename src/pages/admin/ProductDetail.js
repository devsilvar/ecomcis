import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { getProduct } from "../../store/features/product/getProduct";
import MoonLoader from "react-spinners/MoonLoader";
import { Link } from "react-router-dom";
import { formatMoney, formatDate } from "../../utils/nairaFormat";
import ProductVariationForm from "../../components/admin/form/AddVariationForm";



function AdminProductDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {data, loading} = useSelector((state) => state.getProduct)
    const [variationDrawer, setVariationDrawer] = useState(false)

    const fetchData = () => {
        dispatch(getProduct(id))
      }

    useEffect(() => {
    fetchData()
    }, [])

    const handleOpenVariationDrawer = ()=>{
        setVariationDrawer(true)
    }
    const handleCloseVariationDrawer = ()=>{
        setVariationDrawer(false)
    }

    return (
        <div>
            <ToastContainer />
            <div className="max-w-[1090px] mx-auto">
                <div className="mx-[24px] xl:mx-0">
                <div className="my-[15px] text-[#828282] flex justify-between items-center">
                    <Link to="/admin/dashboard">&#8592;</Link>
                    <div className="flex justify-between gap-[10px]">
                        <div>Edit</div>
                        <div>Delete</div>
                    </div>
                </div>

                {/* VARIATION DRAWER */}
                <div className={`w-[400px] h-full bg-[#fdfdfd] fixed right-0 top-0 z-40 overflow-y-auto transition-transform ${variationDrawer ? 'translate-x-0' : 'translate-x-full'} bg-white w-80 shadow-xl`}>
                    <div className="flex justify-between items-center p-5 ">
                        <p>Add variations</p>
                        <button onClick={handleCloseVariationDrawer}>X</button>
                    </div>
                    <div>
                        <ProductVariationForm product_id={id}/>
                    </div>
                </div>
                {/* VARIATION DRAWER ENDS */}

                {loading ? <div><MoonLoader size={60} /></div> : (

                    <div>
                        <div className="flex gap-[16px]">
                            <div className="w-[50%]">
                                <div className="w-[100%] h-[500px] overflow-hidden rounded">
                                    <img alt="product image" src={data?.image.substring(13)} />
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="bg-[#fff] rounded mb-[10px] p-5">
                                    <h2 className="text-[2em]">{data?.name}</h2>
                                    <p>{data?.desc}</p>
                                </div>
                                <div className="bg-[#fff] rounded mb-[10px] p-5">
                                    <p>{data?.quantity} in stock</p>
                                    <p>{formatDate(data?.created_at)}</p>
                                    <p className="px-[15px] py-[10px] mt-[10px] bg-[#FAE3E3] rounded text-[1.5em]">{formatMoney(data?.price)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            {data?.variations.length < 1 ? (
                                <div className="flex justify-between items-center bg-[#fff] rounded p-3 mx-[10px]">
                                    <div>
                                        <p>No variations for this product yet</p>
                                    </div>
                                    <button 
                                        onClick={handleOpenVariationDrawer}
                                        className="outline-0 border-[1px] bg-[#242424] text-[#fff] rounded-[8px] px-[16px] py-[16px] mt-[16px]">
                                        Add Variation
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p>Product Variation</p>
                                    <div>
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Color</th>
                                            <th className="py-3 px-6 text-left">Image</th>
                                            <th className="py-3 px-6 text-left">Price</th>
                                            <th className="py-3 px-6 text-left">Size</th>
                                            <th className="py-3 px-6 text-left">Quantity</th>
                                            <th className="py-3 px-6 text-left">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                        {
                                            data?.variations?.map(variation => (
                                            <tr key={variation.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                
                                                <td className="py-3 px-6 text-left">
                                                    {variation.color}
                                                </td>

                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <img
                                                        src={variation?.image.substring(13)}
                                                        alt={variation.name}
                                                        className="w-16 h-16 object-cover mr-4"
                                                        />
                                                </td>

                                                <td className="py-3 px-6 text-left">
                                                    {formatMoney(variation.price)}
                                                </td>

                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center">
                                                        <p>{variation.size}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center">
                                                        <p>{variation.stock_quantity}</p>
                                                    </div>
                                                </td>
                                                
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center">
                                                        <Link to={`/admin/products/${variation.id}`}>Details</Link>
                                                    </div>
                                                </td>

                                            </tr>
                                            )
                                        )}
                                        </tbody>
                                    </table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                </div>
            </div>
        </div>
    )
}

export default AdminProductDetail