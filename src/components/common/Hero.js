import { ArrowRight } from "../../assets/icons/ArrowRight";
import Button from "./Button";
import { Wrapper } from "./Wrapper";
import { useNavigate } from "react-router-dom";
import HeroBg from "../../assets/images/hero-bg.jpg";
import { useState } from "react";
import { ReadyToPickupDialog } from "../modals/ReadyToPickupDialog";
import { ThankYouForShoppingDialog } from "../modals/ThankYouForShoppingDialog";

export const Hero = () => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);

  return (
    <section className="bg-neutral-200 overflow-hidden relative min-h-[calc(100dvh-130px)]">
      <img
        src={HeroBg}
        alt="Hero Background"
        className="absolute top-0 h-full object-cover object-top w-full left-0"
        style={{ transform: "rotateY(180deg)" }}
      />

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
