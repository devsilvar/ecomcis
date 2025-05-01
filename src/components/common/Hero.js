import { ArrowRight } from "../../assets/icons/ArrowRight";
import Button from "./Button";
import { Wrapper } from "./Wrapper";
import { useNavigate } from "react-router-dom";
import HeroBg from "../../assets/images/hero-bg-2.jpg";
import HeroVideoMP4 from "../../assets/videos/hero-video.mp4";
import React from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const [canPlay, setCanPlay] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("loadeddata", () => setCanPlay(true));
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", () => setCanPlay(false));
      }
    };
  }, []);

  return (
    <section className="bg-neutral-200 overflow-hidden relative min-h-[calc(100dvh-115px)]">
      {!canPlay ? (
        <img
          src={HeroBg}
          alt="Hero Background"
          className="absolute top-0 h-full object-cover object-top w-full left-0"
          // style={{ transform: "rotateY(180deg)" }}
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

      <Wrapper className="min-h-[calc(100dvh-115px)] flex z-40 relative justify-center flex-col">
        <div className="flex flex-col gap-3 md:gap-6 lg:gap-8 md:w-[450px]  lg:mt-0 text-center lg:text-left self-center lg:self-start w-full">
          {/* <p>Yves Collection</p> */}

          <h1 data-aos="zoom-out-up" className="font-voga text-4xl md:text-6xl">
            Yves Collection
          </h1>
          {/*
          <p className="md:text-xl leading-relaxed">
            We design for the dreamers, the rebels, and the unapologetic. Where
            strength and softness meet.
          </p> */}

          <Button
            data-aos="fade-up"
            data-aos-delay="500"
            onClick={() => navigate("/shop")}
            className="bg-black mx-auto lg:mx-0"
          >
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
