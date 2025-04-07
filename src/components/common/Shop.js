import { RiLoader4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Cart } from "../../assets/icons/Cart";
import { Heart } from "../../assets/icons/Heart";
import usePageTitle from "../../hook/usePageTitle";
import { useGetProductsQuery } from "../../services/api";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { WebsiteLayout } from "./WebsiteLayout";
import { Wrapper } from "./Wrapper";

export const Shop = () => {
  usePageTitle("Shop | Amaraé");
  const { currency, conversionRate } = useCurrency();
  const { data: products, isLoading } = useGetProductsQuery();

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

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RiLoader4Line className="animate-spin text-3xl text-rebel-ruby-100" />
                <span>Getting products...</span>
              </div>
            ) : products.results.length ? (
              products.results.map((product) => (
                <Link
                  to={`/shop/product/${product.id}`}
                  className="flex flex-col hover:opactiy-90 transition-opacity gap-3"
                >
                  <div className="relative">
                    <img
                      alt={product.name}
                      className="w-full h-96 rounded-md object-cover object-top"
                      src={product.images[0]}
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
                    <p className="font-bold">{product.name}</p>
                    <p className="text-xs">{product.desc}</p>
                    <p className="pt-1">
                      {formatMoney(product.price, currency, conversionRate)}
                    </p>
                  </div>
                </Link>
              ))
            ) : null}
          </div>
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
