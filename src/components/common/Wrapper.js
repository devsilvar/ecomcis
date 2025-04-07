import { twMerge } from "tailwind-merge";

export const Wrapper = ({ children, className }) => {
  return (
    <div className={twMerge("container p-4 mx-auto", className)}>
      {children}
    </div>
  );
};
