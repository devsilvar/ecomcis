import { useNavigate } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import Button from "../common/Button";
import { Wrapper } from "../common/Wrapper";
import ImageJuniper from "../../assets/images/image-juniper.webp";
import ImageJuniper002 from "../../assets/images/image-juniper-002.webp";
import ImageBaobab from "../../assets/images/image-baobab.webp";
import ImageCoCoDerMer from "../../assets/images/image-coco-de-mer.webp";
import Image002 from "../../assets/images/image-002.webp";

export const EveryStich = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-[#FEF7F7] py-20">
        <Wrapper>
          <h2 className="text-4xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto">
            Every Stitch, Every Detail, Every Design for you
          </h2>

          <div className="grid items-center md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pt-10">
            <div className="rounded-lg overflow-hidden relative">
              <img
                alt="Juniper Set"
                className="w-full h-full object-cover object-top"
                src={ImageJuniper}
              />

              <div className="absolute bottom-4 left-0 bg-white/50 w-full flex items-center gap-4 justify-between p-4">
                <div>
                  <h3 className="text-sm font-abril font-semibold">
                    Juniper Set{" "}
                  </h3>
                  <p className="text-xs">Pink Jacquard Draped Mini Dress</p>
                  <p>$98</p>
                </div>

                <Button
                  onClick={() => navigate("/shop")}
                  className="text-sm py-3 px-4"
                >
                  <span>Shop Now</span>
                  <Cart />
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden relative">
              <img
                alt=""
                className="w-full  object-cover object-top"
                src={ImageBaobab}
              />

              <div className="absolute bottom-4 left-0 bg-white/50 w-full flex items-center gap-4 justify-between p-4">
                <div>
                  <h3 className="text-sm font-abril font-semibold">
                    Baobab Set{" "}
                  </h3>
                  <p className="text-xs">Pink Jacquard Draped Mini Dress</p>
                  <p>$98</p>
                </div>

                <Button
                  onClick={() => navigate("/shop")}
                  className="text-sm py-3 px-4"
                >
                  <span>Shop Now</span>
                  <Cart />
                </Button>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden relative">
              <img
                alt="Juniper Set"
                className="w-full h-full object-cover object-top"
                src={ImageJuniper002}
              />

              <div className="absolute bottom-4 left-0 bg-white/50 w-full flex items-center gap-4 justify-between p-4">
                <div>
                  <h3 className="text-sm font-abril font-semibold">
                    Juniper Set{" "}
                  </h3>
                  <p className="text-xs">Pink Jacquard Draped Mini Dress</p>
                  <p>$98</p>
                </div>

                <Button
                  onClick={() => navigate("/shop")}
                  className="text-sm py-3 px-4"
                >
                  <span>Shop Now</span>
                  <Cart />
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className="grid md:grid-cols-2">
        <img
          alt=""
          className="w-full object-cover object-top"
          src={ImageCoCoDerMer}
        />
        <img
          alt=""
          className="w-full object-cover row-start-3 md:row-start-auto object-top"
          src={ImageJuniper002}
        />
        <div className="bg-rebel-ruby-100 row-start-2 md:row-start-auto p-10 lg:px-24 flex items-center justify-center">
          <p className="lg:text-5xl text-3xl text-center lg:text-left leading-snug text-white font-voga">
            Discover Endless Ways To Remix, Restyle, and Reimagine Your Wardrobe
            Because Your Style is Ever-Evolving, Just Like You.
          </p>
        </div>
        <img alt="" className="w-full object-cover object-top" src={Image002} />
      </section>
    </>
  );
};
