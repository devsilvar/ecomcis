import React from'react';

const OrderTable = ({ orders }) => {
    return (
      <div className="container mx-auto py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">{order.product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <img
                      src={order.product.image?.substring(13)}
                      alt={order.product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>Category: {order.product.category}, Tag: {order.product.product_tag}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>{order.quantity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span>${order.total_price}</span>
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