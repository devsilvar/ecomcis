import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { getProduct } from "../../store/features/product/getProduct";
import MoonLoader from "react-spinners/MoonLoader";
import { Link } from "react-router-dom";
import { formatMoney, formatDate } from "../../utils/nairaFormat";
import ProductVariationForm from "../../components/admin/form/AddVariationForm";
import { deleteProduct } from "../../store/features/product/deleteProduct";
import { deleteVariation } from "../../store/features/product/deleteVariation";

import ClipLoader from "react-spinners/ClipLoader";

function AdminProductDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {data, loading} = useSelector((state) => state.getProduct)
    const [showModal, setShowModal] = useState(false)
    const [variationDrawer, setVariationDrawer] = useState(false)
    const [showUpdateProduct, setShowUpdateProduct] = useState(false)

    const deleteProductState = useSelector((state) => state.deleteProduct);
    const deleteVariationState = useSelector((state) => state.deleteVariation);
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

    const handleOpenProductDetail = () =>{
        setShowUpdateProduct(true)
    }
    
    const handleCloseProductDetail = () =>{
        setShowUpdateProduct(false)
    }

    const handleDeleteProduct = ()=>{
        dispatch(deleteProduct(id))
    }

    const handleDeleteVaration = (variation_id) =>{
        dispatch(deleteVariation(variation_id))
    }

    const handleShowModal = () =>{
        setShowModal(true)
    }
    const handleCloseModal = () =>{
        setShowModal(false)
    }

    console.log("ID: ", id)
    return (
        <div>
            <ToastContainer />

            <div class={`${showModal ? 'flex' : 'hidden'} fixed top-0 left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}>
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow">
                        <button onClick={handleCloseModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-y-auto p-7">
                        <p>Are you sure you want to delete this product?</p>    
                        <div className="my-5 flex justify-between">
                            <button onClick={handleDeleteProduct} className="bg-[#f00] px-3 py-2 mx-2 text-[#fff] rounded-[10px]"> {deleteProductState.loading ? <ClipLoader /> : "Delete"} </button>
                            <button onClick={handleCloseModal} className="rounded-[10px] border-2 border-grey px-3 py-2">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-[1090px] mx-auto">
                <div className="mx-[24px] xl:mx-0">
                <div className="my-[15px] text-[#828282] flex justify-between items-center">
                    <Link to="/admin/dashboard">&#8592;</Link>
                    <div className="flex justify-between items-center gap-[10px]">
                        <button className="text-[#fff] bg-[#6B9383] py-3 px-5 rounded-[8px] px-2 py-2" onClick={handleOpenVariationDrawer}>+ Add Variation</button>
                        <button onClick={handleOpenProductDetail} className="text-[#fff] bg-[#2264a8] py-3 px-5 rounded-[8px] px-2 py-2">Edit</button>
                        <button onClick={handleShowModal} className="text-[#fff] bg-[#4E0240] py-3 px-5 rounded-[8px] px-2 py-2 mx-2">Delete</button>
                    </div>
                </div>

                {/* VARIATION DRAWER */}
                <div className={`w-[100vw] h-full fixed left-0 top-0 z-40 overflow-y-auto transition-transform ${variationDrawer ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-[#000] shadow-xl`}>
                    <div className={`w-[400px] h-full bg-[#fff] fixed top-0 right-0 transition-transform transform ${variationDrawer ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                        <div className="flex justify-between items-center p-5 ">
                            <p>Add variations</p>
                            <button onClick={handleCloseVariationDrawer}>X</button>
                        </div>
                        <div>
                            <ProductVariationForm product_id={id} show_skip={false}/>
                        </div>
                    </div>
                </div>
                {/* VARIATION DRAWER ENDS */}

                <div className={`w-[100vw] h-full fixed left-0 top-0 z-40 overflow-y-auto transition-transform ${showUpdateProduct ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-[#000] shadow-xl`}>
                    <div className={`w-[400px] h-full bg-[#fff] fixed top-0 right-0 transition-transform transform ${showUpdateProduct ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                        <div className="flex justify-between items-center p-5 ">
                            <p>Update product details</p>
                            <button onClick={handleCloseProductDetail}>X</button>
                        </div>
                        <div>
                            <form>
                                <input placeholder="Product name" />
                            </form>
                        </div>
                    </div>
                </div>

                {loading ? <div><MoonLoader size={60} /></div> : (

                    <div>
                        <div className="flex gap-[16px]">
                            <div className="w-[50%]">
                                <div className="w-[100%] h-[500px] overflow-hidden rounded">
                                    <img alt="product image" src={data?.image_url} />
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
                                                <div className={`w-[50px] h-[50px] rounded-[50%]`} style={{ backgroundColor: variation.color }}></div>
                                                </td>

                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <img
                                                        src={variation?.image_url}
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
                                                        <button className="px-4 py-3 bg-[#f00] rounded text-[#fff]" onClick={()=>handleDeleteVaration(variation.id)}>{deleteVariationState.loading ? <ClipLoader size={10} color="#fff" /> : "Delete"}</button>
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