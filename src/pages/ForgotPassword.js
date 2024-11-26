import { useState } from "react"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Input from "../components/admin/form/Input"
import ClipLoader from "react-spinners/ClipLoader"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../store/features/auth/forgotPassword"



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const {data, loading, error} = useSelector((state) => state.forgotPassword)
    const dispatch = useDispatch()

    const handleForgotPassword = (e) => {
        e.preventDefault()
        dispatch(forgotPassword({ email }))
    };
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen p-5">
            <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[90%]">
            <Input
                value={email} 
                onChange={handleEmailChange}
                topText="Email address" type="text" placeholder="Enter your email" />
            <button onClick={handleForgotPassword} className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">

                {loading ? <ClipLoader size={10} color="#fff"/>: "Submit"}
            </button>
            </form>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword