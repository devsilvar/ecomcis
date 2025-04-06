import { Link } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import { Heart } from "../../assets/icons/Heart";
import usePageTitle from "../../hook/usePageTitle";
import { WebsiteLayout } from "./WebsiteLayout";
import { Wrapper } from "./Wrapper";

const url =
  " https://s3-alpha-sig.figma.com/img/f108/85e6/e406ea1b8ea304ef56f3dee9c45ab539?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdHKp~RieZUcfrE5Q7ungUKD9~TUyhe1E3LWBjlnr6X21ljZ8lIesced6E--0uWj1dNCs66VUCSiCHUphkrxQHNU8mFi~JXLTgAn5rOYId7LW41vajHghPed~~5mAQGRX3vGpbGaU5f7EXtODptsAt3NdxMkREABoF3TqQp8nJ5gqBHtI7Nk6w50~bM2SEjAm0NC--PPcRQOFuCPNoGhG1Q5qGwF4J5ZXWmOWROQyh-t2dCy7OJDq1WpJ-E3v7BZfuUpaMCLhHODKUnmzJV8WaolejKDVeqBWr8jCPKswQ5yzLL-7vZuVvpoOHLJbP2jBcjtLiG3DtsKDClxWyRNwQ__";

export const Shop = () => {
  usePageTitle("Shop | Amaraé");
  return (
    <WebsiteLayout>
      <section className="py-20">
        <Wrapper className="flex flex-col gap-10">
          <header className="flex flex-col gap-1">
            <h1 className="text-4xl text-rebel-ruby-100">
              Yves: Crafted for the Bold, Worn by the Fearless
            </h1>
            <p>Shop now and wear your confidence like never before</p>
          </header>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <Link
              to="/shop/product/1"
              className="flex flex-col hover:opactiy-90 transition-opacity gap-3"
            >
              <div className="relative">
                <img
                  alt=""
                  className="w-full max-h-96 rounded-md object-cover object-top"
                  src={url}
                />

                <div className="absolute right-4 h-full top-0 py-4 flex flex-col justify-between">
                  <button
                    type="button"
                    className="size-7 bg-white grid place-items-center rounded-full"
                  >
                    <Heart />
                  </button>
                  <button
                    type="button"
                    className="size-7 bg-white grid place-items-center rounded-full"
                  >
                    <Cart />
                  </button>
                </div>
              </div>

              <div>
                <p className="font-bold">Coco de Mer Set</p>
                <p className="text-xs">Pink Jacquard Draped Mini Dress</p>
                <p className="pt-1">$248</p>
              </div>
            </Link>
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
