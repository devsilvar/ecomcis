import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import ProductVariationForm from "../../components/admin/form/AddVariationForm";
import { useLocation, useParams } from "react-router-dom";


const AddVariation = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    return <div className="w-2/3 bg-[#fff] rounded-[10px] p-5">
        <ProductVariationForm show_skip={true} product_id={id} />
    </div>
}

export default AddVariation