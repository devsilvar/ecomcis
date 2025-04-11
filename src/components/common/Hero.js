import { ArrowRight } from "../../assets/icons/ArrowRight";
import Button from "./Button";
import { Wrapper } from "./Wrapper";
import { useNavigate } from "react-router-dom";
import HeroBg from "../../assets/images/hero-bg.jpg";
import HeroVideoMP4 from "../../assets/videos/hero-video.mp4";
import React from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const [canPlay, setCanPlay] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("l", () => setCanPlay(true));
    }
  }, []);

  return (
    <section className="bg-neutral-200 overflow-hidden relative min-h-[calc(100dvh-115px)]">
      {!canPlay ? (
        <img
          src={HeroBg}
          alt="Hero Background"
          className="absolute top-0 h-full object-cover object-top w-full left-0"
          style={{ transform: "rotateY(180deg)" }}
        />
      ) : null}

      <video
        ref={videoRef}
        className={`absolute top-0 h-full object-cover object-top w-full left-0 ${
          canPlay ? "block" : "hidden"
        }`}
        autoPlay
        muted
        aria-label="background-video"
        aria-hidden="true"
        role="presentation"
        preload="auto"
        controls={false}
        loop
        playsInline
        onLoadedData={() => setCanPlay(!canPlay)}
        controlslist="nodownload,nofullscreen,noremoteplayback"
        disablepictureinpicture
        disableRemotePlayback
      >
        <source src={HeroVideoMP4} type="video/mp4" />
      </video>

      <Wrapper className="h-full flex z-50 relative flex-col">
        <div className="flex flex-col gap-3 md:gap-6 lg:gap-8 w-72 md:w-[450px] mt-32">
          <p>Lima Collection</p>

          <h1 className="font-voga text-4xl md:text-6xl">Timeless Fashion</h1>

          <p className="md:text-xl leading-relaxed">
            We design for the dreamers, the rebels, and the unapologetic. Where
            strength and softness meet.
          </p>

          <Button onClick={() => navigate("/shop")} className="bg-black">
            <span>Shop Now</span>
            <ArrowRight className="text-xl" />
          </Button>
          {/* <Button onClick={() => setOpen(true)} className="bg-black">
            <span>Open modal</span>
            <ArrowRight className="text-xl" />
          </Button> */}
        </div>
      </Wrapper>

      {/* <ThankYouForShoppingDialog open={open} setOpen={setOpen} /> */}
    </section>
  );
};
