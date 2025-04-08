import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { WebsiteFooter } from "./WebsiteFooter";
import { WebsiteHeader } from "./WebsiteHeader";

export const WebsiteLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <WebsiteHeader />
      <main>{children}</main>
      <WebsiteFooter />
    </>
  );
};
