import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ArrowRight } from "../assets/icons/ArrowRight";
import Button from "../components/common/Button";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const ProductDetails = () => {
  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper className="flex flex-col gap-10">
          <p className="text-xs text-[#515655]">
            Home / Shop /{" "}
            <span className="text-rebel-ruby-100">Chiffon Slip Date Set</span>
          </p>

          <div className="grid lg:grid-cols-7">
            <div className="col-span-4 flex flex-col gap-4">
              <img
                alt=""
                className="w-full max-h-[800px] rounded-md object-cover object-top"
                src={url}
              />

              <div className="grid grid-cols-4 gap-2.5">
                <button
                  type="button"
                  className="hover:opacity-70 transition-opacity"
                >
                  <img
                    alt=""
                    className="w-full h-52 rounded-md object-cover object-top"
                    src={url}
                  />
                </button>
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-6 px-10 py-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-abril font-normal">Yew Set</h2>
                <p>Pink Jacquard Draped Mini Dress</p>
              </div>

              <div className="py-3 border-b border-b-neutral-300 pt-10">
                <p className="font-bold text-2xl">$455.00</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#515655]">Colors</p>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="size-6 rounded-full bg-red-600"
                    // active-class: outline-offset-2 outline-rebel-ruby-100
                  ></button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p>Sizing</p>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="py-3 px-6 border border-[#C2C1BE] rounded-md hover:bg-neutral-100 transition-all"
                  >
                    P
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p>Quantity</p>

                <div className="flex items-center gap-1">
                  <button
                    className="h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                    type="button"
                  >
                    <PiMinus />
                  </button>
                  <div className="h-12 w-14 border border-crystal-clear-300 rounded grid place-items-center">
                    <p>11</p>
                  </div>
                  <button
                    type="button"
                    className="h-12 w-14 text-sm hover:bg-neutral-100 transition-colors border border-crystal-clear-300 rounded grid place-items-center"
                  >
                    <PiPlus />
                  </button>
                </div>
              </div>

              <div className="mx-auto flex flex-col items-center pt-10 gap-4">
                <Button>
                  <span>Add to Cart</span>
                  <ArrowRight className="text-xl" />
                </Button>

                <Link to="/cart" className="underline text-sm">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
