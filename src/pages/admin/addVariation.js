import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import ProductVariationForm from "../../components/admin/form/AddVariationForm";
import { useLocation, useParams } from "react-router-dom";
import { getProductImage } from "../../store/features/product/productImages";

import Loader from "../../components/common/Loader";
import { useEffect } from "react";


const AddVariation = () =>{
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const {data, loading} = useSelector((store) => store.getProductImage)
    
    const dispatch = useDispatch()

    const handleGetProductImages = () =>{
        dispatch(getProductImage(id))
    }

    useEffect(() =>{
        handleGetProductImages()
    }, [])

    console.log('PRODUCT IMAGES', data)


    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="w-2/3 bg-[#fff] rounded-[10px] p-5">
                    <ProductVariationForm productImages={data} show_skip={true} product_id={id} />
                </div>
            )}
        </>
    )
}

export default AddVariation