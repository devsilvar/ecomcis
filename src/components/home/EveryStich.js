import { Link, useNavigate } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import Button from "../common/Button";
import { Wrapper } from "../common/Wrapper";
import Image003 from "../../assets/images/image-003.webp";
import Image005 from "../../assets/images/image-005.webp";
import Image002 from "../../assets/images/image-002.webp";
import { useGetProductsQuery } from "../../services/api";
import { RiLoader4Line } from "react-icons/ri";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { capitalize } from "../../libs/utils";

export const EveryStich = () => {
  const { currency, conversionRate } = useCurrency();
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <>
      <section className="bg-[#FEF7F7] py-10">
        <Wrapper>
          <h2 className="text-4xl md:text-5xl text-rebel-ruby-100 font-voga max-w-[450px] text-center mx-auto">
            Every Stitch, Every Detail, Every Design for you
          </h2>

          <ul className="grid items-center md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pt-10">
            {isLoading ? (
              <div className="flex items-center col-span-full justify-center lg:justify-start gap-2">
                <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
                <span>Getting products...</span>
              </div>
            ) : products?.results.length ? (
              products.results.slice(0, 3).map((product) => (
                <li className="rounded-lg overflow-hidden relative">
                  <img
                    alt="Juniper Set"
                    className="w-full h-[400px] md:h-[550px] object-cover object-top"
                    src={product.images[0]}
                  />

                  <Link
                    to={`/shop/product/${product.id}`}
                    className="absolute bottom-8 left-0 bg-white/50 w-full flex items-center gap-4 justify-between p-4"
                  >
                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="text-sm font-abril font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-xs">
                        {capitalize(product.desc).slice(0, 80)}...
                      </p>
                      <p>
                        {formatMoney(product.price, currency, conversionRate)}
                      </p>
                    </div>

                    <Button
                      // onClick={() => navigate(`/shop/product/${product.id}`)}
                      className="text-sm py-3 px-4"
                    >
                      <span>Shop Now</span>
                      <Cart />
                    </Button>
                  </Link>
                </li>
              ))
            ) : null}
          </ul>
        </Wrapper>
      </section>

      <section className="grid md:grid-cols-2">
        <img
          alt=""
          className="w-full h-full object-cover object-top"
          src={Image003}
        />
        <img
          alt=""
          className="w-full h-full object-cover row-start-3 md:row-start-auto object-top"
          src={Image005}
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
