import { RiLoader4Line } from "react-icons/ri";
import usePageTitle from "../../hook/usePageTitle";
import { useGetProductsQuery } from "../../services/api";
import { Product } from "./Product";
import { WebsiteLayout } from "./WebsiteLayout";
import { Wrapper } from "./Wrapper";

export const Shop = () => {
  usePageTitle("Shop | Amaraé");
  const { data: products, isLoading, isError } = useGetProductsQuery();

  // const isInCart = (productId) => cart.some((item) => item.id === productId);

  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper className="flex flex-col gap-10">
          <header className="flex flex-col gap-1 text-center md:text-left w-72 md:w-full mx-auto md:mr-auto">
            <h1
              data-aos="fade-up"
              className="md:text-4xl text-3xl text-rebel-ruby-100"
            >
              Yves: Crafted for the Bold, Worn by the Fearless
            </h1>
            <p data-aos="fade-up" data-aos-delay="200">
              Shop now and wear your confidence like never before
            </p>
          </header>

          <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-12 lg:grid-cols-4">
            {isLoading ? (
              <div className="flex items-center col-span-full justify-center lg:justify-start gap-2">
                <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
                <span>Getting products...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col text-center items-center col-span-full justify-center lg:justify-start gap-2">
                <h2 className="text-xl font-abril">Error Getting products</h2>
                <p className="text-sm">
                  We are encountering an issue fetching products, Refresh this
                  page to try again.
                </p>
              </div>
            ) : products?.results.length ? (
              products.results.map((product, index) => (
                <Product key={product.id} product={product} index={index} />
              ))
            ) : null}
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
