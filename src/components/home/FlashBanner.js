import { PiInstagramLogoFill, PiTiktokLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useGetNewsFlashQuery } from "../../services/api";
import { Wrapper } from "../common/Wrapper";
import { useState, useEffect } from "react";

export const FlashBanner = () => {
  const { data } = useGetNewsFlashQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, 20000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [data]);

  const currentNews = data?.[currentIndex]?.news;

  return (
    <div className="bg-rebel-ruby-100 text-white">
      <Wrapper className="flex items-center gap-6 overflow-hidden">
        {/* Social icons */}
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
            href="https://www.instagram.com/amaraebrand?igsh=YmxhdGZkNTJ3MXZ5&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:scale-110"
          >
            <PiInstagramLogoFill />
          </a>
        </div>

        {/* News ticker */}
        <div className="flex-1 overflow-hidden relative h-6">
          <div
            key={currentIndex}
            className="absolute w-full animate-slide-left text-center font-semibold whitespace-nowrap"
          >
            {currentNews || (
              <>
                Welcome to AMARAÉ. Sustainable trends you'll love forever.{" "}
                <Link to="/shop" className="underline">
                  Shop now
                </Link>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
