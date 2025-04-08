import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteHeader } from "./WebsiteHeader";
import * as React from "react";
import { ReadyToPickupDialog } from "../modals/ReadyToPickupDialog";
import { CookieBanner } from "../CookieBanner";

export const WebsiteLayout = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { cart } = useSelector((state) => state.cart);
  React.useEffect(() => {
    const inSession = sessionStorage.getItem("inSession") === "true";
    if (cart.length > 0 && !inSession) {
      setOpen(true);
      sessionStorage.setItem("inSession", "true");
    }
  }, []);

  return (
    <>
      <WebsiteHeader />
      <main>{children}</main>
      <WebsiteFooter />

      <ReadyToPickupDialog open={open} setOpen={setOpen} />

      {/* cookie setting */}
      <CookieBanner />
    </>
  );
};
