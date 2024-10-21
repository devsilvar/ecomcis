import React, { useState, useEffect } from "react";
import Container from "../ui/Container";
import Header from "../components/common/Header";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/common/Footer";
import { formatMoney } from "../utils/nairaFormat";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../store/features/product/listProduct";
import { useCurrency } from "../utils/CurrencyProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AllProducts() {
  const { currency, conversionRate } = useCurrency();
  const [products, setProducts] = useState([]);
  const [hoveredImages, setHoveredImages] = useState({});
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);
  const { data, loading } = productState;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryState = useSelector((state) => state.listCategory);
  const category = queryParams.get('category');
  const [search, setSearch] = useState("");

  const fetchData = () => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);

    navigate({ search: queryParams.toString() });

    dispatch(listProduct({ search }));
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    const filteredProducts = selectedCategory
      ? data?.filter((product) => product.category.name === selectedCategory)
      : data;
    setProducts(filteredProducts);
  };

  useEffect(() => {
    if (data) {
      const filteredProducts = category
        ? data.filter((product) => product.category.name === category)
        : data;
      setProducts(filteredProducts);
    }
  }, [data, category]);

  const handleOrderBy = (e) => {
    const orderBy = e.target.value;
    let orderedProducts = data ? [...data] : [];

    switch (orderBy) {
      case "lowest_price":
        orderedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highest_price":
        orderedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        orderedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    setProducts(orderedProducts);
  };

  const handleMouseEnter = (productId, productImages) => {
    // Select a random image index other than 0
    const randomIndex = Math.floor(Math.random() * (productImages.length - 1)) + 1;
    const newHoveredImages = { ...hoveredImages, [productId]: productImages[randomIndex] };
    setHoveredImages(newHoveredImages);
  };

  const getImageForProduct = (product) => {
    // Use the hovered image if available, otherwise default to the first image
    return hoveredImages[product.id] || product?.images[0];
  };

  return (
    <div>
      <Header />

      <Container className="flex justify-center overflow-scroll gap-[24px]">
        <div className="flex justify-between items-center w-[80%]">
          <div><Link to="/all-products">All Products</Link> {category && `/ ${category}`} </div>
          <div className="flex flex-wrap gap-[24px] p-[50px]">
            <div className="flex gap-[10px]">
              <div>
                <small>Filter By Categories</small> <br />
                <select onChange={handleCategoryFilter} className="border-r-[1px] pr-[16px] block w-full bg-white border border-gray-300 text-black py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option className="bg-[#fff]" value="">ALL</option>
                  {categoryState.data?.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <small>Sort by</small>
                <br />
                <select onChange={handleOrderBy} className="block w-full bg-white border border-gray-300 text-black py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">----</option>
                  <option value="lowest_price">Low price to high</option>
                  <option value="highest_price">High Price To Low</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>

            <div>
              <small>Search</small>
              <br />
              <input
                className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] rounded-[8px] border-gray-300 text-black py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Container>

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Container className="flex ">
          <div className="flex gap-[10px] mx-auto w-[80%] flex-wrap">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                onMouseEnter={() => handleMouseEnter(product.id, product.images)}
                id={product.id}
                image={getImageForProduct(product)}
                title={product.name}
                brand={product.desc?.substring(0, 30) + " ..."}
                price={formatMoney(product.price, currency, conversionRate)}
              />
            ))}
          </div>
        </Container>
      )}
      <Footer />
    </div>
  );
}

export default AllProducts;