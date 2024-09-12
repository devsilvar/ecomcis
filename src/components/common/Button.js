


const Button = ({onClick, type, children, disabled}) => {
    return (
        <button 
        className={`bg-[#4E0240] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000] ${disabled && 'cursor-not-allowed opacity-50'}`}
            onClick={onClick} 
            disabled={disabled}
            type={type}>
                {children}
        </button>)
}

export default Button