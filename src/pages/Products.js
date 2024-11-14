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
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [orderBy, setOrderBy] = useState("");

  console.log("========")
  console.log(orderBy);

  const toggleSortOptions = () => {
    setShowSortOptions(prev => !prev);
  };

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

  const handleOrderBy = () => {
    // const orderBy = e.target.value;
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

  useEffect(() => {
    handleOrderBy();
  }, [orderBy]);

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

      <div className="flex justify-center gap-[24px] relative justify-between items-center flex-col lg:flex-row p-[50px]">
        <div>
          <Link to="/all-products">All Products</Link> {category && `/ ${category}`} 
        </div>

        <div className="relative">
          <div className="flex cursor-pointer" onClick={toggleSortOptions} >
            <small>Sort by </small>
            &nbsp; <img className="w-[10px] text-[#000]" src="/images/arrow-down.svg" alt="" /> 
          </div>
          <br />
          <div onClick={toggleSortOptions} className="cursor-pointer w-[150px]">
            {showSortOptions && (
              <ul className="absolute top-5 right-0 z-200 flex flex-col gap-[10px] bg-[#fff] p-3 shadow-md border rounded-md">
                <li className=" px-3 py-2" onClick={(e) => setOrderBy("lowest_price")}>Low price to high</li>
                <li className=" px-3 py-2" onClick={(e) => setOrderBy("highest_price")}>High Price To Low</li>
                <li className=" px-3 py-2" onClick={(e) => setOrderBy("newest")}>New Arrivals</li>
              </ul>
            )}
          </div>
        </div>
      </div>

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