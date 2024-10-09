"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";
import { IoMdHeartEmpty } from "react-icons/io";
import Recommended from "../components/product/Recommended";
import { Link, useParams } from 'react-router-dom';
import { formatMoney } from "../utils/nairaFormat";
import { getProduct } from "../store/features/product/getProduct";
import { useDispatch, useSelector } from "react-redux";
import { useCurrency } from "../utils/CurrencyProvider";
import Loader from "../components/common/Loader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function Product() {
  const { currency, conversionRate } = useCurrency();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [imageModal, setImageModal] = useState(false)

  const { data, loading } = useSelector((state) => state.getProduct);
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [imageIndex, setImageIndex] = useState(0)

  const handleCloseModal = () =>{
    setImageModal(false)
  }

  const handleOpenModal = () =>{
    setImageModal(true)
  }

  const fetchData = () => {
    dispatch(getProduct(id));
  };

  const incrementImageIndex = () =>{
    if(imageIndex < productImages.length - 1){
      setImageIndex(imageIndex + 1)
    }
    setProductImage(productImages[imageIndex])
  }
  
  const decrementImageIndex = () => {
    if(imageIndex > 0){
      setImageIndex(imageIndex - 1)
    }
    setProductImage(productImages[imageIndex])
  }

  useEffect(() => {
    if (data) {
      setProduct(data);
      setProductImages(data?.images?.slice(0, 4) || []);
      setProductImage(data?.images?.[0] || "");
      if (data?.variations?.length > 0) {
        setSelectedColor(data.variations[0].colors[0]); // Default to the first color
      }
    }
  }, [data]);

  const handleSetProductImage = (image) => {
    setProductImage(image);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    let cart = localStorage.getItem('cart');
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    let cartProduct = {
      quantity: quantity,
      product: product,
      product_id: product.id,
      selectedColor: selectedColor?.name,
      selectedSize: selectedSize?.name,
      size_id:selectedSize?.id,
      color_id: selectedColor?.id
    };

    // check if size_id not in cartProduct
    if (!cartProduct.size_id) {
      toast.error("Please select a size");
      return;
    }

    cart.push(cartProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Added to cart");

    window.dispatchEvent(new Event("cartChange"));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [openDesc, setOpenDesc] = useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = useState(false);

  const toggleDesc = () => {
    setOpenDesc(!openDesc);
  };

  const toggleReturnPolicy = () => {
    setOpenReturnPolicy(!openReturnPolicy);
  };

  const handleSavedProduct = () =>{
    
    let savedItem = localStorage.getItem('savedItem');
    if (!savedItem) {
      savedItem = [];
    } else {
      savedItem = JSON.parse(savedItem);
    }
    
    savedItem.push(product);

    localStorage.setItem('savedItem', JSON.stringify(savedItem));
    toast.success("Product saved for later")

    window.dispatchEvent(new Event("storageChange"));
  }

  return (
    <div>
      <Header />
      <ToastContainer />

      {/* image modal */}

      <div class={`${imageModal ? 'flex' : 'hidden'} fixed top-0 left-0 bg-[#000000a9] z-50 justify-center items-center w-full h-[100vh]`}>
        <div class="relative p-4 w-full max-w-[650px] max-h-full mx-auto">
            <div class="relative bg-white rounded-lg shadow">
                <button onClick={handleCloseModal} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div className="flex justify-between w-[100%] absolute top-[50%]">
                <button onClick={decrementImageIndex} className="w-[25px] h-[25px] flex justify-center items-center rounded-[50%] bg-[#FFFFFF]"> 
                    <FaArrowLeft className="text-[#000]"/> 
                </button>
                <button onClick={incrementImageIndex} className="w-[25px] h-[25px] flex justify-center items-center rounded-[50%] bg-[#FFFFFF]"> <FaArrowRight className="text-[#000]"/> </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-y-auto p-7">
                <Zoom>
                  <img
                    src={productImage}
                    className="w-[100%] cursor-zoom object-contain rounded"
                  />
                </Zoom>
            </div>
        </div>
    </div>

      {/* image modal */}

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex lg:flex-row flex-col">
            <div className="lg:w-[50%] mt-[20px] lg:mt-0 flex p-5 ">
              <div className="flex flex-col w-[50px] mr-5 lg:w-[95px]">
                {productImages?.map((image, index) => (
                  <div
                    className="mb-3 cursor-pointer"
                    key={index}
                    onClick={() => handleSetProductImage(image)}
                  >
                    <img
                      src={image}
                      className="w-[100%] object-contain rounded"
                    />
                  </div>
                ))}
              </div>
              <div className="w-[calc(100%-100px)] relative">
                <div className="flex justify-between w-[100%] absolute top-[50%] px-5">
                    <button onClick={decrementImageIndex} className="w-[25px] h-[25px] flex justify-center items-center rounded-[50%] bg-[#ffffff66]"> 
                        <img className="w-[70%]" src="/images/arrow-left.svg" alt="" />
                    </button>
                    <button onClick={incrementImageIndex} className="w-[25px] h-[25px] flex justify-center items-center rounded-[50%] bg-[#ffffff66]"> 
                        <img className="w-[70%]" src="/images/arrow-right.svg" alt="" />
                    </button>
                </div>
                <img
                  src={productImage}
                  onClick={handleOpenModal}
                  className="w-[100%] cursor-pointer object-contain rounded"
                />
              </div>
            </div>

            <div className="lg:w-[50%] mt-[20px] lg:mt-0 text-[#4E0240] p-5">
              <div className="w-[100%] lg:pr-[150px]">
                <div className="px-[24px]">
                  <div>
                    <p className="text-[0.875rem] font-[700]">
                      home / {product.slug}
                    </p>
                    <p className="text-[1.5rem] py-[15px]">{product.name}</p>
                  </div>
                  <div className="border-y-[1px] flex flex-col px-[8px]">
                    <div
                      className="flex justify-between text-[1rem] leading-0 cursor-pointer"
                      onClick={toggleDesc}
                    >
                      <b>Description</b>
                      <p className="text-[1.5rem] leading-0">
                        {openDesc ? " - " : "+"}
                      </p>
                    </div>
                    <p
                      className={`w-[100%] ${
                        openDesc ? "h-auto" : "h-[30px]"
                      } transition-all duration-300 overflow-hidden`}
                    >
                      {product.desc}
                    </p>
                  </div>

                  <div className="border-y-[1px] flex flex-col px-[8px]">
                    <div
                      className="flex justify-between text-[1rem] leading-0 cursor-pointer"
                      onClick={toggleReturnPolicy}
                    >
                      <b>Delivery & Return</b>
                      <p className="text-[1.5rem] leading-0">
                        {openReturnPolicy ? " - " : "+"}
                      </p>
                    </div>
                    <div
                      className={`w-[100%] ${
                        openReturnPolicy ? "h-auto" : "h-[30px]"
                      } transition-all duration-300 overflow-hidden`}
                    >
                      <p>
                        We want you to love your purchase! If you are not
                        completely satisfied, you may return your items within{" "}
                        <strong>7 days</strong> of receiving your order for a
                        full refund.
                      </p>
                      <hr />
                      <br />
                      <strong>Return Conditions:</strong>
                      <br />
                      <ol>
                        <li>
                          - Items must be unworn, unwashed, and in their
                          original condition with tags attached.
                        </li>
                        <li>- Sale items are final sale and cannot be returned.</li>
                        <li>
                          - Items returned after 7 days will not be accepted,
                          and refunds may take up to 30 business days to
                          process.
                        </li>
                      </ol>
                      <br />
                      <strong>How to Return an Item:</strong>
                      <br />
                      <ul>
                        <li>
                          1. Contact our customer service team at
                          support@amarae.io to initiate the return process.
                        </li>
                        <li>
                          2. You will receive a return authorization number and
                          instructions on how to return your item(s).
                        </li>
                        <li>
                          3. Pack the item(s) securely in the original
                          packaging, if possible.
                        </li>
                        <li>
                          4. Ship the return package to the address provided by
                          our customer service team.
                        </li>
                      </ul>
                      <br />
                      <strong>Refunds:</strong>
                      <ul>
                        <li>
                          - Refunds will be processed within 30 business days
                          of receiving the returned item(s).
                        </li>
                        <li>- Refunds will be issued to the original form of payment.</li>
                        <li>- Original shipping charges are non-refundable.</li>
                      </ul>
                      <br />
                      <strong>Damaged or Defective Items:</strong>
                      <ul>
                        <li>
                          - If you receive a damaged or defective item, please
                          contact our customer service team within 7 days of
                          receipt.
                        </li>
                        <li>
                          - We will arrange for a replacement or refund.
                        </li>
                      </ul>
                      <br />
                      <strong>Contact Information:</strong>
                      <p>
                        For any questions or concerns regarding returns, please
                        contact us at{" "}
                        <Link to="mailto:support@amarae.io">
                          support@amarae.io
                        </Link>{" "}
                        or call{" "}
                        <Link to="tel:1-800-123-4567">1-800-123-4567</Link>.
                      </p>
                    </div>
                  </div>

                  {data?.variations.length > 0 && (
                    <>
                      <b>Variation</b>
                      <div className="mt-[32px] flex flex-wrap gap-[5px]">
                        {data?.variations[0].colors.map((color, index) => (
                          <button
                            key={index}
                            style={{
                              background:color.name
                            }}
                            className={` w-[40px] h-[40px] border-2 ${
                              selectedColor?.name === color.name
                                ? "border-black"
                                : "border-gray-300"
                            } rounded-md px-3 py-1 cursor-pointer`}
                            onClick={() => handleColorClick(color)}
                          >
                            
                          </button>
                        ))}
                      </div>

                      {selectedColor && selectedColor.sizes.length > 0 && (
                        <>
                          <b>Sizes</b>
                          <div className="mt-[10px] flex flex-wrap gap-[5px]">
                            {selectedColor.sizes.map((size, index) => (
                              <button
                                key={index}
                                className={`border-2 ${
                                  selectedSize?.name === size.name
                                    ? "border-black"
                                    : "border-gray-300"
                                } rounded-md px-3 py-1 cursor-pointer`}
                                onClick={() => handleSizeClick(size)}
                              >
                                {size.name}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="flex justify-between my-4">
                    <div className="flex items-center">
                      <button
                        className="text-[#4E0240] border border-[#4E0240] rounded-[5px] px-[8px] py-[6px] cursor-pointer text-[1rem]"
                        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                      >
                        -
                      </button>
                      <p className="text-[1.2rem] px-[20px]">{quantity}</p>
                      <button
                        className="text-[#4E0240] border border-[#4E0240] rounded-[5px] px-[8px] py-[6px] cursor-pointer text-[1rem]"
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-[1.5rem]">
                      {formatMoney(product.price * quantity, currency, conversionRate)}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="bg-[#4E0240] hover:bg-[#000] text-white text-[1rem] py-[10px] px-[40px] rounded-[5px] cursor-pointer"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <button onClick={handleSavedProduct} className="border-[#4E0240] hover:bg-[#ddd] border text-[#4E0240] text-[1rem] py-[10px] px-[40px] rounded-[5px] cursor-pointer">
                      <IoMdHeartEmpty />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Recommended productId={id} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Product;
