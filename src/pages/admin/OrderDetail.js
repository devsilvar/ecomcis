import React, {useEffect, useState} from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import { getDashboardData } from "../../store/features/admin/dashboardFeature";
import {formatMoney} from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";
import { getAdminOrders } from "../../store/features/admin/orders";
import { getOrderDetail } from "../../store/features/admin/orderDetails";
import { trendingProduct } from "../../store/features/product/trendingProduct";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";
import { useGetAllProductsQuery , useGetAllproductsImagesQuery } from "../../services/api";
import ClipLoader from "react-spinners/ClipLoader";
import { addSingleVariation } from "../../store/features/product/addSingleVariation";
import { deleteVariation } from "../../store/features/product/deleteVariation";
import { updateOrder } from "../../store/features/admin/updateOrder";


// function to generate payload 
function transformProductVariation(variation, productImages) {
	// Step 1: Find image ID by matching image_url
	const matchingImage = productImages.find(img => img.image_url === variation.image)

	if (!matchingImage) {
		throw new Error('Image URL not found in productImages array')
	}

	// Step 2: Clean up the colors and sizes
	const cleanedColors = variation.colors.map(color => ({
		name: color.name,
		sizes: color.sizes.map(size => ({
			name: size.name,
			quantity: size.quantity
		}))
	}))

	// Step 3: Return the transformed object
	return {
		product_variant: parseInt(variation.product_variant),
		image: matchingImage.id,
		colors: cleanedColors,
		price: parseFloat(variation.price) // optional: convert price to number
	}
}



function OrderDetail() {
const vairationImagesState = useSelector((store) => store.getProductImage)
  const dispatch = useDispatch()
  const {currency, conversionRate} = useCurrency()
  const { data:productList, error, isLoading } = useGetAllProductsQuery()
  const {data:allproductImages } = useGetAllproductsImagesQuery()

  const { id } = useParams()
  const [orderStatus, setOrderStatus] = useState('')
 // const {data:productList , loading:productLoading}  = useSelector((state) => state.listProduct);
  const {data , loading} = useSelector((store) => store.getOrderDetail)

  const statusState = useSelector((store) => store.updateOrderStatus)

  const handleGetOrder = ()=>{
    dispatch(getOrderDetail(id))
  }
  
  useEffect(()=>{
    handleGetOrder()
    dispatch(getDashboardData())
    dispatch(trendingProduct())
  }, [dispatch , id, statusState ])

//   const updateOrderStatus = (id) => {    
//     //get the variation objects of the order items
    
// // Get all teh products List
// const products = productList; // your full products data


// //match the varation object coming from the order with th einitial orduct list
// const matchedVariations = data?.orderitems.map(cartItem => {
//     const product = products.find(p => p.id === cartItem.product);

//     //if no product return null
//     if (!product) return null;


//     const Variation = product.variations.find(variation => {
//    ///minus the quntity of the varition coeing from the order from the quntity in the varition in the main product
//         variation.colors.forEach(color => {
//             color.sizes.forEach(size => {
//                 if (size.name === cartItem.size) {
//                     size.quantity = size.quantity - cartItem.quantity;
//                 }
//             });
//         });

//         return variation.image === cartItem.image;
//     });
//     console.log(Variation , "variation from")

//     //return a well formatted object
//  let payloads =  transformProductVariation(Variation, allproductImages)
//     return {payloads , Variation, product};
// });

// console.log(matchedVariations)
// // console.log(item.Variation.id , item.payloads)
// return;
// //update the variation sicne the order is completed
// if(orderStatus == "C"){
//   matchedVariations.map(item => {
//     dispatch(deleteVariation(item.Variation.id));
//     dispatch(addSingleVariation(item.payloads));
// })
// }

// // update the product variation after every completed Order of allproducts in teh order
// // if(orderStatus === 'C'){
// // matchedVariations.map(item => {
// //     if (item) {
// //       dispatch(deleteVariation(item.Variation.id));
// //         dispatch(addSingleVariation(item.payloads));
// //     }
// // })}
//     dispatch(updateOrder({ id, data: { status: orderStatus } }));
//   }


  // console.log(productList , "list of products")
  // console.log(allproductImages, "product images")



  const updateOrderStatus = (id) => {
    const products = productList; // your full product list
  
    const matchedVariations = data?.orderitems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.product);
      if (!product) return null;

      console.log(product)
  
      // Find the original variation
      const originalVariation = product.variations.find(v => v.colors[0].name === cartItem.color);
      if (!originalVariation) return null;
      console.log(originalVariation)
  
      // Deep clone the variation so we don't mutate the original
      const clonedVariation = JSON.parse(JSON.stringify(originalVariation));


      // Reduce the quantity in the cloned object
      clonedVariation.colors.forEach(color => {
          color.sizes.forEach(size => {
            if (size.name.trim().toLowerCase() === cartItem.size.trim().toLowerCase()) {
              size.quantity = size.quantity - cartItem.quantity;
              console.log("✅ Quantity updated to:", size.quantity);
            } else {
              console.log("❌ Size mismatch:", size.name, "vs", cartItem.size);
            }
          });
      });
      
      
   

      // Now pass the updated (but cloned) variation
      const payloads = transformProductVariation(clonedVariation, allproductImages);
      
      
      return { payloads, Variation: clonedVariation, product };
    });
  console.log(matchedVariations)
    
  
  if(orderStatus == "C"){
  matchedVariations.map(item => {
    dispatch(addSingleVariation(item.payloads));
    dispatch(deleteVariation(item.Variation.id));
})}
    dispatch(updateOrder({ id, data: { status: orderStatus } }));
  };
  
  const handleStatusChange = (e) =>{
    setOrderStatus(e.target.value)
  }

  const getStatusValue = [
    {
      value: 'P',
      label: 'Pending',
    },
    {
      value: 'C',
      label: 'Completed',
    },
    {
      value: 'S',
      label: 'Shipped',
    },
    {
      value: 'X',
      label: 'Cancelled',
    },
  ]


  const getStatus = (status)=>{
    switch(status) {
      case 'P':
        return 'Pending'
      case 'S':
        return 'Shipped'
      case 'C':
        return 'Completed'
      case 'X':
        return 'Cancelled'
      default:
        return 'Pending'
    }
  }

  console.log(data?.orderitems, "data")

  useEffect(()=>{
    if(data){
      setOrderStatus(data.status)
    }
  }, [data])

  if(loading){
    return (
    <div className="w-full flex justify-center my-[20px] items-center h-auto"><MoonLoader /></div>)
  }

  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Order Detail" />
        </div>
        <div className="flex p-5 gap-2">
          <div className="flex-auto w-64">
            <div className="bg-[#fff] p-3 mb-5 flex justify-between items-center">
              <small>{data?.order_number}</small>

              <small className={classNames('py-2 px-3', {
                  'bg-[#FEFADD] text-[#E19F38]': orderStatus === 'P',
                  'bg-[#69F0AE] text-[#004322]': orderStatus === 'C',
                  'bg-[#AACCFF] text-[#001B43]': orderStatus === 'S',
                  'bg-[#FFB9B9] text-[#922222]': orderStatus === 'X',
                })}>{getStatus(data?.status)}</small>
              </div>
            <div className="bg-[#fff] p-3 mb-5"> 
              <small>Order Items</small>

              <div className="overflow-x-scroll">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4 text-left">Qty.</th>
                        <th className="py-3 px-4 text-left">Variation</th>
                        <th className="py-3 px-4 text-left">Price</th>
                        <th className="py-3 px-4 text-left">Total Price</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {data?.orderitems?.map(order => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-wrap">
                            {order.name}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={order?.image}
                                alt={order?.name}
                                className="w-16 h-16 object-cover mr-4"
                              />
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {order.quantity}
                          </td>
                          <td className="py-3 px-3 text-left whitespace-nowrap">
                            <div className="flex justify-between"> Color: <span className="w-[30px] h-[10px] px-3 py-2 rounded" style={{ background: order?.color ? order.color : 'transparent' }}></span></div>
                            <div className="flex justify-between"> Size: {order?.size || 'N/A'}</div>
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {formatMoney(order.price, currency, conversionRate)}
                          </td>

                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{formatMoney(order.total, currency, conversionRate)}</p>
                            </div>
                          </td>

                        </tr>
                      ))}
                      {/* <tr>
                        <td className="py-3 px-6 text-left whitespace-nowrap">Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{formatMoney(data?.total_amount, currency)}</td>
                      </tr> */}
                    </tbody>

                  </table>
                </div>
            </div>
          </div>

          <div className="flex-auto w-14 flex-col">
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Update Order Status</h2>
              <div className="flex justify-between items-center">
                <select className="bg-[#EDEDED] p-3 mb-5" onChange={handleStatusChange}>
                  {getStatusValue.map(status => (
                    <option 
                        selected={status.value === orderStatus}
                        key={status.value}  
                        value={status.value}>{status.label}</option>
                  ))}
                </select>
                <button 
                  onClick={() => updateOrderStatus(id)}
                  className="bg-[#125491] text-[#fff] p-3 mb-5">
                    {
                      statusState.loading ? <ClipLoader size={10} color="#fff" /> : <span>Update Status</span>

                    }
                    </button>
              </div>
            </div>
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Customer Details</h2>
              <p>{data?.buyer?.name}</p>
              <Link to={'mailto:'+data?.buyer?.email}>{data?.buyer?.email}</Link>
              <p>{data?.buyer?.mobile}</p>
            </div>
            
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Order Address</h2>
              <p>{data?.shipping_address?.apartment_address}</p>
              <p>{data?.shipping_address?.street}</p>
              <p>{data?.shipping_address?.city}</p>
              <p>{data?.shipping_address?.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
