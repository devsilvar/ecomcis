import Button from "./common/Button";
import * as React from "react";
import CookieImg from "../assets/images/cookie.png";

export const CookieBanner = () => {
  const [openCookieBanner, setOpenCookieBanner] = React.useState(() => {
    const consent = localStorage.getItem("cookieConsent");
    return consent !== "accepted";
  });

  const acceptCookies = () => {
    setOpenCookieBanner(false);
    localStorage.setItem("cookieConsent", "accepted");
  };

  if (!openCookieBanner) return null;

  return (
    <div className="flex flex-col text-sm lg:text-base md:flex-row text-center md:text-left items-center gap-6 bg-rebel-ruby-100 text-white lg:px-6 px-2 md:px-4 py-4 fixed z-50 w-[98%] lg:w-5/6 left-1/2 -translate-x-1/2 bottom-2">
      <img src={CookieImg} alt="Cookie" className="size-10" />

      <p className="w-[90%]">
        <strong>We use cookies in the delivery of our services.</strong> To
        learn about the cookies we use and information about your preferences
        and opt-out choices, please click here. By using our platform you agree
        to our use of cookies.
      </p>

      <div className="flex items-center gap-4">
        <Button
          onClick={acceptCookies}
          className="py-2 text-white hover:underline"
        >
          Decline
        </Button>
        <Button onClick={acceptCookies} className="bg-white py-2 text-black">
          Accept
        </Button>
      </div>
    </div>
  );
};
