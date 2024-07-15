import React, {useState} from "react";
import Container from "../../ui/Container";
import Heading from "../../ui/Footer/Heading";
import { Link } from "react-router-dom";

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <div className="border-t-[1px]">
      <Container className="mt-[32px] mb-[42px] flex flex-col lg:flex-row justify-between gap-[20px] text-[#4E0240]">
        <div>
          <div className="flex flex-col gap-[24px] justify-center items-start">
            {/* <img src="./images/logo.svg" alt="" /> */}
            <h1>Amarae</h1>
            <div className="flex gap-[20px]">
              <img src="./images/icons/facebook.svg" alt="" />
              <img src="./images/icons/Linkedin.svg" alt="" />
              <img src="./images/icons/Instagram.svg" alt="" />
              <img src="./images/icons/Twitter.svg" alt="" />
            </div>
            <p>
              <span>© {year} Amarae</span>
              <span> All rights reserved.</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[32px] justify-between lg:w-[797px]">
          <div className="flex flex-col gap-[8px] text-[#4E0240]">
            <Heading>COMPANY</Heading>
            <p>About US</p>
            <p>Legal & Privacy Policies</p>
            <p>Cookies Policies</p>
          </div>

          <div className="flex flex-col gap-[8px] text-[#4E0240]">
            <Heading>MY ACCOUNT</Heading>
            <p>Order History</p>
            <p>My Wishlist</p>
            <p>View Bag</p>

            <div className="mt-[16px] flex flex-col gap-[8px]">
              <p>Support</p>
              <p>Frequently Asked Questions</p>
              <p>Contact Us</p>
              <p>About Us</p>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Heading>LINKS</Heading>
            <Link to="/register">Log in</Link>
            <Link to="/create-account">Create an account</Link>
            <p>Forgot Password</p>
            <p>Refer a friend</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
