import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useGetNewsFlashQuery } from "../../services/api";
import { Wrapper } from "../common/Wrapper";

export const FlashBanner = () => {
  const { data } = useGetNewsFlashQuery();

  return (
    <div className="bg-rebel-ruby-100 text-white">
      <Wrapper className="flex items-center gap-6">
        <div className="hidden md:flex md:items-center md:gap-2">
          <a
            href="https://www.tiktok.com/@amarae.io?_t=ZN-8v0LgegdrK2&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:scale-110"
          >
            <PiTiktokLogoFill />
          </a>
          <a
            href="https://www.instagram.com/amarae_io?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:scale-110"
          >
            <PiInstagramLogoFill />
          </a>
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 relative w-full">
          {data && data.length ? (
            <p className="text-center inline-block font-semibold animate-marquee">
              {data[0].news}
            </p>
          ) : (
            <p className="text-center inline-block font-semibold animate-marquee">
              Welcome to AMARAÉ. Sustainable trends you'll love forever.{" "}
              <Link to="/shop" className="underline">
                Shop now
              </Link>
            </p>
          )}
        </div>
      </Wrapper>
    </div>
  );
};
