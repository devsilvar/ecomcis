import { twMerge } from "tailwind-merge";

const Button = ({ type, className, disable, children, ...props }) => {
  return (
    <button
      className={twMerge(
        "px-8 py-3.5 w-fit rounded hover:opacity-85 transition-all flex items-center justify-center gap-2 bg-rebel-ruby-100 disabled:cursor-not-allowed text-white font-bold disabled:bg-crystal-clear-300 disabled:text-midnight-noir-200",
        className
      )}
      disable={disable}
      type={type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
