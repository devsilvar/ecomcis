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
import Input from "../../components/admin/form/Input";
import { getProductImage } from "../../store/features/product/productImages";

import ClipLoader from "react-spinners/ClipLoader";
import { updateProduct } from "../../store/features/product/updateProduct";
import { useCurrency } from "../../utils/CurrencyProvider";
import Loader from "../../components/common/Loader";


function AdminProductDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {currency} = useCurrency()
    const {data, loading} = useSelector((state) => state.getProduct)
    const [showModal, setShowModal] = useState(false)
    const [variationDrawer, setVariationDrawer] = useState(false)
    const [showUpdateProduct, setShowUpdateProduct] = useState(false)

    const deleteProductState = useSelector((state) => state.deleteProduct);
    const deleteVariationState = useSelector((state) => state.deleteVariation);
    const updateProductState = useSelector((state) => state.updateProduct);
    const categoryData = useSelector((state) => state.listCategory);
    const vairationImagesState = useSelector((store) => store.getProductImage)
    const fetchData = () => {
        dispatch(getProduct(id))
      }
    
      const handleGetProductImages = () =>{
        dispatch(getProductImage(id))
    }


    useEffect(() => {
        fetchData()
        handleGetProductImages()
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

    // UPDATE PRODUCT
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("")

    const handleFileChange = (event, setFileFunc, setImageUrlFunc) => {
        const uploadedFile = event.target.files[0];
        setFileFunc(uploadedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrlFunc(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
      };

      const handleSetCategory = (id) => {
        setCategory(id);
      };

    useEffect(() =>{
        if(data){
            setName(data.name)
            setDesc(data?.desc)
            setPrice(data?.price)
            setImageUrl(data?.image_url)
        }
    }, [data])

    const handleUpdateProduct = (e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("image", file)
        formData.append("desc", desc)
        formData.append("name", name)
        formData.append("price", price)

        dispatch(updateProduct(id, formData))
    }

    console.log("******", data?.variations)

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
                    <div className={`w-[400px] h-[100vh] overflow-scroll bg-[#fff]  fixed top-0 right-0 transition-transform transform ${variationDrawer ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                        <div className="flex justify-between items-center p-5 ">
                            <p>Add variations</p>
                            <button onClick={handleCloseVariationDrawer}>X</button>
                        </div>
                        <div>
                            {vairationImagesState.data ? <ProductVariationForm productImages={vairationImagesState?.data} product_id={id} show_skip={false}/> : ""}
                        </div>
                    </div>
                </div>
                {/* VARIATION DRAWER ENDS */}

                <div className={`w-[100vw] h-[100vh] fixed left-0 top-0 z-40 overflow-y-scroll transition-transform ${showUpdateProduct ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-[#000] shadow-xl`}>
                    <div className={`w-[400px] h-[100vh] bg-[#fff] fixed top-0 overflow-y-scroll right-0 transition-transform transform ${showUpdateProduct ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                        <div className="flex justify-between items-center p-5 ">
                            <p>Update product details</p>
                            <button onClick={handleCloseProductDetail}>X</button>
                        </div>
                        <div>
                            <form className="px-5">
                                <Input 
                                    topText="Product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Product name" />
                                
                                <div>
                                    <p className="text-[0.875rem] mb-[10px]">Description</p>
                                    <textarea
                                        className="w-full h-[150px] rounded-[10px] border-[1px] border-[#e5e5e5] px-[15px] py-[10px] mt-[15px] resize-none"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    ></textarea>
                                </div>

                                <Input 
                                    topText="Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                                <div className="mt-[23px]">
                                    <p className="text-[0.875rem]">Category</p>
                                    <div className="flex">
                                        <select
                                        required={true}
                                        onChange={(e) => handleSetCategory(e.target.value)}
                                        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-full rounded-[8px] px-[16px]">
                                        <option value=""> - Select Category - </option>
                                        {categoryData?.data ? categoryData?.data?.map((item) => (
                                            <option
                                            selected={item.id === data?.category?.id}
                                            key={item.id}
                                            name="category"
                                            value={item.id}>{item.name}</option>
                                        )) : ""}
                                        </select>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    multiple
                                    accept="jpeg,png,jpg"
                                    onChange={(e) => handleFileChange(e, setFile, setImageUrl)}
                                    className="block w-full text-sm my-4 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                <div>
                                    <img
                                        src={imageUrl}
                                        alt="Uploaded"
                                        className="w-[150px] rounded-[12px] shadow-lg shadow-neutral-300/50 "
                                    />
                                </div>
                                <button
                                    onClick={handleUpdateProduct}
                                    className="bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5">
                                    {updateProductState.loading ? <ClipLoader /> : "Update product"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {loading ? <div><MoonLoader size={60} /></div> : (

                    <div>
                        <div className="flex gap-[16px]">
                            <div className="w-[50%]">
                                <div className="w-[100%] h-[500px] overflow-hidden rounded">
                                    <img alt="product image" src={data?.images[0]} />
                                </div>
                                <div className="flex gap-[10px] mt-5 w-full justify-between">
                                    {data?.images?.map((image) => (
                                        <img src={image} className="w-[100px] rounded"/>
                                    ))}
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="bg-[#fff] rounded mb-[10px] p-5">
                                    <h2 className="text-[2em]">{data?.name}</h2>
                                    <p>{data?.desc}</p>
                                </div>
                                <div className="bg-[#fff] rounded mb-[10px] p-5">
                                    <p>No. in stock: {data?.quantity}</p>
                                    <hr/>
                                    <p>Date created: {formatDate(data?.created_at)}</p>
                                    <hr/>
                                    <p>Category: {data?.category?.name}</p>
                                    <p className="px-[15px] py-[10px] mt-[10px] bg-[#FAE3E3] rounded text-[1.5em]">{formatMoney(data?.price, currency)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            {data?.variations?.length < 1 ? (
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
                                            <th className="py-3 px-6 text-left">image</th>
                                            <th className="py-3 px-6 text-left">Color</th>
                                            <th className="py-3 px-6 text-left">Size & quantity</th>
                                            <th className="py-3 px-6 text-left">Price</th>
                                            <th className="py-3 px-6 text-left">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                        {data?.variations?.map((variation) => (
                                            
                                            variation.colors?.map((color) => (
                                                <tr key={color.id}>
                                                    <td className="py-3 px-6 text-left">
                                                        <div
                                                            className="w-[100px] rounded-[50%]"
                                                        >
                                                            <img src={variation.image} />
                                                        </div>
                                                    </td>

                                                    <td className="py-3 px-6 text-left">
                                                        <div
                                                            className="w-[50px] h-[50px] rounded-[50%]"
                                                            style={{ backgroundColor: color.name }}
                                                        ></div>
                                                    </td>

                                                    <td className="py-3 px-6 text-left">
                                                        <ul>
                                                            {color.sizes?.map((size) => (
                                                                <li key={size.id}>
                                                                    {size.name} - Quantity: {size.quantity}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>

                                                    <td className="py-3 px-6 text-left">
                                                        {formatMoney(variation.price, currency)}
                                                    </td>

                                                    <td className="py-3 px-6 text-left">
                                                        <button onClick={()=>handleDeleteVaration(variation.id)} className="border-2 border-gray-200 p-2">{deleteVariationState.loading ? <ClipLoader color="#fff" size={10} /> : "Delete"}</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ))}
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