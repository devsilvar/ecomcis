import React from'react';
import NairaFormat from '../../utils/nairaFormat';

const OrderTable = ({ orders, incrementQuantity, decrementQuantity }) => {
    return (
      <div className="container mx-auto py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={order.product?.image.substring(13)}
                        alt={order.product.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <p className="font-medium">{order.product.name}</p>
                        <div>Category: {order.product.category}</div>
                        <div>Tag: {order.product.product_tag}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <button
                        onClick={() => decrementQuantity(order.id)}
                        className="border-[#8A8A8A] bg-[#FFFFFF] text-black px-2 py-1"
                      >
                        -
                      </button>
                      <p className="mx-2">{order.quantity}</p>
                      <button
                        onClick={() => incrementQuantity(order.id)}
                        className="border-[#8A8A8A] bg-[#FFFFFF] text-black px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <p>{NairaFormat.format(order.total_price)}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  
  export default OrderTable;