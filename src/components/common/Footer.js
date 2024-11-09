import React, {useState} from "react";
import Container from "../../ui/Container";
import Heading from "../../ui/Footer/Heading";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

function Footer() {
  const [showCart, setShowCart] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  return (
    <div className="border-t-[1px] p-5">
      <CartDrawer showCart={showCart} setShowCart={setShowCart} />
      <Container className="mt-[32px] mb-[42px] flex flex-col lg:flex-row justify-between gap-[20px] text-[#000]">
        <div>
          <div className="flex flex-col gap-[24px] justify-center items-start">
            <img src="./images/logo-name.svg" alt="" className="w-[75px]" />
            <div className="flex gap-[20px]">
              <Link to="#">
                <img className="w-[30px] hover:text-[blue]"  src="./images/instagram.svg" alt="" />
              </Link>
              <Link to="#">
                <img className="w-[30px]" src="./images/icons/tiktok.svg" alt="" />
              </Link>
              <Link to="#">
                <img className="w-[30px]" src="./images/icons/x.png" alt="" />
              </Link>
            </div>
            <p>
              <span>© {year} Amaraé</span>
              <span> All rights reserved.</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[32px] justify-between lg:w-[797px]">
          <div className="flex flex-col gap-[8px]">
            <Heading>COMPANY</Heading>
            <Link to="#" className="text-[#000] hover:text-[#4E0240]">Legal & Privacy Policies</Link>
            <Link to="#" className="text-[#000] hover:text-[#4E0240]">Cookies Policies</Link>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Heading>MY ACCOUNT</Heading>
            {sessionAuth ? 
            <>
              <Link to="/account/my-orders" className="text-[#000] hover:text-[#4E0240]">Order History</Link>
              <Link to="/account/saved" className="text-[#000] hover:text-[#4E0240]">My Wishlist</Link>
              <Link onClick={() => {setShowCart(true)}} className="text-[#000] hover:text-[#4E0240]">View Bag</Link>
            </> : 
            <>
              <Link to="/register" className="text-[#000] hover:text-[#4E0240]">Order History</Link>
              <Link to="/register" className="text-[#000] hover:text-[#4E0240]">My Wishlist</Link>
              <Link onClick={() => {setShowCart(true)}}  className="text-[#000] hover:text-[#4E0240]">View Bag</Link>
            </>}

          </div>
          <div className="flex flex-col gap-[8px]">
              <Heading>HELP</Heading>
              <Link className="text-[#000] hover:text-[#4E0240]" to="/support">Support</Link>
              <Link className="text-[#000] hover:text-[#4E0240]" to="/faqs">Frequently Asked Questions</Link>
              <Link to="#" className="text-[#000] hover:text-[#4E0240]">Contact Us</Link>
              <Link to="/about" className="text-[#000] hover:text-[#4E0240]">About Us</Link>
            </div>
          
          {!sessionAuth && 
            <div className="flex flex-col gap-[8px]">
              <Heading>LINKS</Heading>
              <Link className="text-[#000] hover:text-[#4E0240]" to="/register">Log in</Link>
              <Link className="text-[#000] hover:text-[#4E0240]" to="/create-account">Create an account</Link>
              <Link to="#" className="text-[#000] hover:text-[#4E0240]">Forgot Password</Link>
              <Link to="#" className="text-[#000] hover:text-[#4E0240]">Refer a friend</Link>
            </div>
          }
        </div>
      </Container>
    </div>
  );
}

export default Footer;
