import { Search } from "../../assets/icons/Search";
import { Sheet, SheetContent, SheetTrigger } from "../common/Sheet";
import * as React from "react";
import { useDispatch } from "react-redux";
import { RiLoader4Line } from "react-icons/ri";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import { Cart } from "../../assets/icons/Cart";
import { removeFromWishlist } from "../../store/features/cart/saveToWishlist";
import { saveToCart } from "../../store/features/cart/saveToCart";
import { useGetProductsQuery } from "../../services/api";
import { useDebounce } from "../../hook/useDebounce";
import { Link } from "react-router-dom";

export const SearchDialog = () => {
  const [search, setSearch] = React.useState("");
  const { currency, conversionRate } = useCurrency();

  const debouncedSearch = useDebounce(search, 500);
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    name: debouncedSearch,
  });

  const dispatch = useDispatch();
  const onSearch = (e) => {
    e.preventDefault();
    refetch({
      name: search,
    });
    // Perform search logic here
  };

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2">
        <Search className="text-xl lg:text-lg" />
        <p className="hidden md:block">Search</p>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col gap-6 md:!px-10">
        <p className="text-sm text-[#515655]">What are you looking for?</p>

        <form onSubmit={onSearch}>
          <label className="relative">
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="border-b-[1.5px] pr-8 border-b-[#515655] w-full py-2 focus:outline-none focus:border-b-rebel-ruby-100"
            />

            <Search className="text-lg absolute top-1/2 -translate-y-1/2 right-2" />
          </label>
        </form>

        {isLoading ? (
          <div className="flex col-span-2 items-center gap-2">
            <RiLoader4Line className="animate-spin text-lg text-rebel-ruby-100" />
            <p className="font-medium">Loading...</p>
          </div>
        ) : debouncedSearch && products?.results?.length ? (
          <div>
            <p>Products</p>

            <div className="flex flex-col gap-5 pt-2">
              {products.results.map((item) => (
                <Link
                  to={`/shop/product/${item.id}`}
                  key={item.id}
                  className="flex items-center gap-2 md:gap-4"
                >
                  <img
                    alt=""
                    className="md:w-32 w-24 rounded-md max-h-20 object-cover object-top"
                    src={item.images[0]}
                  />

                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="font-semibold">
                      {formatMoney(item.price, currency, conversionRate)}
                    </p>
                    {item.variations && item.variations.length ? (
                      item.variations[0].colors.length ? (
                        <div className="flex items-center gap-2">
                          {item.variations[0].colors.map((color) => (
                            <button
                              key={color.id}
                              // onClick={() => setSelectedColor(color)}
                              type="button"
                              style={{ background: color.name }}
                              className={`size-4 rounded-full`}
                            />
                          ))}
                        </div>
                      ) : null
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-6 justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          saveToCart({
                            ...item,
                            quantity: 1,
                            color: item.variations[0].colors[0],
                            size: item.variations[0].colors[0].sizes[0],
                          })
                        );
                      }}
                      type="button"
                      className="flex items-center text-sm gap-2 md:p-3"
                    >
                      <Cart />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p>No products found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
