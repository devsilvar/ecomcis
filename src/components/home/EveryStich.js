import { useNavigate } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import Button from "../common/Button";
import { Wrapper } from "../common/Wrapper";

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const EveryStich = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-blush-blossom-100">
        <Wrapper className="py-16">
          <h2 className="text-4xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto">
            Every Stitch, Every Detail, Every Design for you
          </h2>

          <div className="grid items-center lg:grid-cols-3 gap-4 lg:gap-8 pt-10">
            <div className="rounded-lg overflow-hidden relative">
              <img
                alt=""
                className="w-full max-h-[600px] object-cover object-top"
                src={url}
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
                className="w-full max-h-[600px] object-cover object-top"
                src={url}
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
                className="w-full max-h-[600px] object-cover object-top"
                src={url}
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

      <section className="grid lg:grid-cols-2">
        <img alt="" className="w-full object-cover object-top" src={url} />
        <img alt="" className="w-full object-cover object-top" src={url} />
        <div className="bg-rebel-ruby-100 p-10 lg:px-24 flex items-center justify-center">
          <p className="lg:text-5xl text-2xl text-center lg:text-left leading-snug text-white font-voga">
            Discover Endless Ways To Remix, Restyle, and Reimagine Your Wardrobe
            Because Your Style is Ever-Evolving, Just Like You.
          </p>
        </div>
        <img alt="" className="w-full object-cover object-top" src={url} />
      </section>
    </>
  );
};
