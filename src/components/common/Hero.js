import { ArrowRight } from "../../assets/icons/ArrowRight";
import Button from "./Button";
import { Wrapper } from "./Wrapper";

export const Hero = () => {
  return (
    <section className="bg-neutral-200 min-h-[calc(100dvh-120px)]">
      <Wrapper className="h-full flex flex-col">
        <div className="flex flex-col gap-6 max-w-[450px] mt-32">
          <p>Lima Collection</p>

          <h1 className="font-voga text-5xl">Timeless Fashion</h1>

          <p className="text-xl leading-relaxed">
            We design for the dreamers, the rebels, and the unapologetic. Where
            strength and softness meet.
          </p>

          <Button className="bg-black">
            <span>Shop Now</span>
            <ArrowRight className="text-xl" />
          </Button>
        </div>
      </Wrapper>
    </section>
  );
};
