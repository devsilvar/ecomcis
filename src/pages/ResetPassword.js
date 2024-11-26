import { useState } from "react"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

import ClipLoader from "react-spinners/ClipLoader"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../store/features/auth/resetPassword"

import { useLocation } from "react-router-dom"
import PwdInput from "../components/passwordInput"


const ResetPassword = () => {
    const [newPassword, setNewPassword]  = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {data, error, loading} = useSelector((state) => state.resetPassword)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const ref = queryParams.get('ref');
    const [disabled, setDisabled] = useState(true)


    const dispatch = useDispatch()
    const handleChangePassword = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmPassword = (e) => {
        let confirmPassword = e.target.value;
        if (confirmPassword !== newPassword) {
            setDisabled(true)
        }else{
            setDisabled(false)
        }
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        const data = {
            new_password: newPassword,
            confirm_password: confirmPassword
        }
        dispatch(resetPassword({ data, token, userId: ref }));
    };
    
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen p-5">
            <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[90%]">
            <h1 className="text-[#4E0240] text-[24px] font-semibold">Reset Password</h1>
            <PwdInput
                value={newPassword} 
                topText="New Password" 
                type="password" 
                onChange={handleChangePassword}
                placeholder="********" />
            <PwdInput
                value={confirmPassword} 
                onChange={handleConfirmPassword}
                topText="Confirm Password" 
                type="text" 
                placeholder="**********" />
            <button disabled={disabled} onClick={handleResetPassword} className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">

                {loading ? <ClipLoader size={10} color="#fff"/>: "Submit"}
            </button>
            </form>
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword