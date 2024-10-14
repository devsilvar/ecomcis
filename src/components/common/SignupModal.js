import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Modal from "./Modal";
import Input from "../admin/form/Input";
import ClipLoader from "react-spinners/ClipLoader";
import { logIn } from "../../store/features/auth/loginInFeature";
import { signUp } from "../../store/features/auth/signUpFeature";
import PwdInput from "../passwordInput";



const SignUpModal = ({handleCloseModal, openLoginModal}) => {

    // login form input
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setsetSignUpPassword] = useState("");
    const [signUpFullName, setsetSignUpFullName] = useState("");
    const [signUpPhoneNumber, setsetSignUpPhoneNumber] = useState("");
    
    const sigUpState = useSelector((state) => state.signUp);
    const logInState = useSelector((state) => state.logIn);
    const dispatch = useDispatch();

    const handleLogin = (e) =>{
        e.preventDefault();
        const payload = {
            username: loginEmail,
            password: loginPassword,
        };
        dispatch(logIn(payload))
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const payload = {
        email: signUpEmail,
        password: signUpPassword,
        full_name: signUpFullName,
        mobile: signUpPhoneNumber,
        is_active: true,
        };
        dispatch(signUp(payload))
    }

    const handleLoginEmailChange = (e) => {
        setLoginEmail(e.target.value);
    };

    const handleLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value);
    };

    const handleShowLogin = () => {
        setShowLogin(true);
        setShowSignUp(false);
    };

    const handleShowSignUp = () => {
        setShowSignUp(true);
        setShowLogin(false);
    };

    
    return (

    <Modal 
        isOpen={openLoginModal} 
        handleClose={handleCloseModal} 
        title={showLogin ? "Login" : "Sign up"}>
        <div className="flex p-3 justify-center gap-[10px]">
            <button onClick={handleShowLogin} className={`${showLogin ? 'bg-[#4E0240] text-[#fff]' : 'bg-[#fff] text-[#4E0240]'} px-2 py-1 rounded`}>Login</button>
            <button onClick={handleShowSignUp} className={`${showSignUp ? 'bg-[#4E0240] text-[#fff]' : 'bg-[#fff] text-[#4E0240]'} px-2 py-1 rounded`}>Sign Up</button>
        </div>
        <div className={`${showLogin ? 'block' : 'hidden'}`}>
            <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[100%]">
            <Input
                value={loginEmail} 
                onChange={handleLoginEmailChange}
                topText="Email address" type="text" placeholder="Enter your email" />
            <PwdInput 
                value={loginPassword}
                onChange={handleLoginPasswordChange}
                placeholder="Enter your password" />
            <button onClick={handleLogin} className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">
                {logInState.loading ? <ClipLoader size={10} />: "Login"}
            </button>
            </form>
        </div>

        <div className={`${showSignUp ? 'block' : 'hidden'}`}>
        <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[100%]">
            <Input 
                value={signUpFullName}
                onChange={(e) => setsetSignUpFullName(e.target.value)}
                topText="Full Name" 
                type="text" 
                placeholder="Enter your full name" />
            <Input 
                topText="Phone Number" 
                type="tel" 
                onChange={(e) => setsetSignUpPhoneNumber(e.target.value)}
                value={signUpPhoneNumber}
                placeholder="080122233345" />
            <Input 
                topText="Email" 
                type="email" 
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="example@gmail.com" />
            <PwdInput 
                type="password" 
                value={signUpPassword}
                onChange={(e) => setsetSignUpPassword(e.target.value)}
                placeholder="**********" />
            <button 
                onClick={handleSignUp} 
                className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">
                        {sigUpState.loading ? <ClipLoader size={10} />: "Sign Up"}
            </button>
        </form>
        </div>
    </Modal>
    )
}

export default SignUpModal;