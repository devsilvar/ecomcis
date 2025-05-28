import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CookieBanner } from "../CookieBanner";
import { ReadyToPickupDialog } from "../modals/ReadyToPickupDialog";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteHeader } from "./WebsiteHeader";
import ScrollToTop from "../ScrollToTop";

export const WebsiteLayout = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { cart } = useSelector((state) => state.cart);
  React.useEffect(() => {
    const inSession = sessionStorage.getItem("inSession") === "true";
    if (cart && cart.length && !inSession) {
      setOpen(true);
      sessionStorage.setItem("inSession", "true");
    }
  }, [cart.length]);

  return (
    <>
    <ScrollToTop/>
      <WebsiteHeader />
      <main className="flex-1">{children}</main>
      <WebsiteFooter />

      <ReadyToPickupDialog open={open} setOpen={setOpen} />

      {/* cookie setting */}
      <CookieBanner />
    </>
  );
};
