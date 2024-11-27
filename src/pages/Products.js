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
import ProductsFilter from "../components/admin/ProductsFilter";

import { listProductSize } from "../store/features/product/listSizes";
import { listProductColor } from "../store/features/product/listColors";
import ClipLoader from "react-spinners/ClipLoader";

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

  // filter values
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productRange, setProductRange] = useState("");

  const [filterSlider, setFilterSlider] = useState(false);
  const productSizeState = useSelector((state) => state.listProductSize);
  const productColorState = useSelector((state) => state.listProductColor);

  const handleCloseFilterSlider = () =>{
    setFilterSlider(false)
  }

  const handleShowFilterSlider = () =>{
    setFilterSlider(true)
  }

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

  useEffect(() => {
    dispatch(listProductSize());
    dispatch(listProductColor());
  }, []);

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams();
    if (productSize) queryParams.append("size", productSize);
    if (productColor) queryParams.append("color", productColor);

      const call = dispatch(listProduct({ 
      search: "", 
      category: "", 
      size: productSize,
      color: productColor,
    }));
        
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
    return hoveredImages[product.id] || product?.images[0];
  };

  return (
    <div>
      {/*  FILTER SLIDER */}
      <div className={`w-[100vw] h-[100vh] fixed left-0 top-0 overflow-y-scroll transition-transform ${filterSlider ? 'translate-x-0' : 'translate-x-full'} bg-opacity-50 bg-[#000] shadow-xl"`} style={{ zIndex: 1000 }}>
          <div className="w-[calc(100vh - 400px)] cursor-pointer h-[100vh]" onClick={handleCloseFilterSlider}></div>
          <div className={`p-3 w-[400px] h-[100vh] bg-[#fff] fixed top-0 overflow-y-scroll right-0 transition-transform transform ${filterSlider ? 'translate-x-0' : 'translate-x-[100%]'}`}>
              <div className="flex justify-between items-center p-5 ">
                  <p>Filter products</p>
                  <button onClick={handleCloseFilterSlider}>X</button>
              </div>
              <div>
                <div className="mb-[15px]">
                  <p>Filter by colors</p>
                  <div className="flex gap-[10px] wrap">
                    {productColorState?.data?.map((color) => (
                      <button 
                          key={color.id} 
                          onClick={() => setProductColor(color.id)}
                          className={`w-[50px] h-[50px] rounded-md cursor-pointer ${
                            productColor === color.id ? "border-2 border-[#000]" : ""
                          }`}
                          style={{
                              background:color.name}}> </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p>Filter by size</p>
                  <div className="flex gap-[10px] wrap">
                    {productSizeState?.data?.map((size) => (
                      <button 
                          key={size.id} 
                          onClick={() => setProductSize(size.name)}
                          className={`p-3 rounded-md cursor-pointer border-[1px] flex items-center justify-center ${
                            productSize === size.name ? "border-2 border-[#000]" : "border-[#ddd]"
                      }`}>
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="my-[15px]">
                  <p>Filter by price range</p>
                  <div className="flex gap-[10px] wrap">
                    {productRange && (
                      <div>
                        <p>{productRange}</p>
                      </div>
                    )}
                    <input 
                        type="range" 
                        onChange={(e) => setProductRange(e.target.value)}
                        value={productRange}
                        min={0} max={1000} step={10} />
                  </div>
                </div>
                <button 
                    onClick={handleApplyFilters}
                    className="mt-[15px] bg-[#000] text-[#fff] p-[10px] rounded-[4px]">
                      {loading ? <ClipLoader color="#fff" size={10}/> : "Apply filters"}
                </button>
              </div>
          </div>
      </div>

        {/* FILTER SLIDER ENDS */}
      <Header />

      <div className="flex justify-center gap-[24px] relative justify-between items-center flex-col lg:flex-row p-[50px]">
        <div>
          <Link to="/all-products">All Products</Link> {category && `/ ${category}`} 
        </div>


        <div className="relative flex items-center gap-[10px]">
          <div className="flex cursor-pointer" onClick={handleShowFilterSlider}>
            <small>Filter by </small>
            &nbsp; <img className="w-[10px] text-[#000]" src="/images/arrow-down.svg" alt="" /> 
          </div>
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