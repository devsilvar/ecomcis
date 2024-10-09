import React from 'react';


const Modal = ({title, children, handleClose, isOpen}) => {
    return (
        <div className={`w-[100vw] h-[100vh] bg-[#00000080] fixed top-0 left-0 z-[1000] ${isOpen ? "flex" : "hidden"} justify-center items-center`}>
            <div className='w-[50%] mx-auto my-[50px] bg-[#fff] rounded-[10px] flex flex-col justify-center items-center'>
                <div className='flex border rounded justify-between w-[100%] px-[20px] py-[10px]'>
                    <p>{title}</p>
                    <button onClick={handleClose}>
                        <img src="/images/x.png" alt="" />
                    </button>
                </div>
                <div className='px-[20px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal