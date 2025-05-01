// export function calculateTotalAmount(orders) {
//     return orders?.reduce((sum, order) => sum + order?.total_amount, 0);
//   }


  export function getTotalOfPaidOrders(orders) {
    return orders
      .filter(order => order.is_paid)
      .reduce((sum, order) => sum + order.total_amount, 0);
  }
  
  
  export function calculateTotalAmount(orders) {
    if (!Array.isArray(orders)) return 0;
    return orders?.reduce((sum, order) => {
      return sum + (Number(order.total_amount) || 10);
    }, 0);
  }
  
  
  

//   export function getTotalOfPaidOrders(orders) {
//     if (!Array.isArray(orders)) return 0;
  
//     return orders
//       .filter(order => order.is_paid === true)
//       .reduce((sum, order) => {
//         const amount = typeof order.total_amount === 'number' ? order.total_amount : 0;
//         return sum + amount;
//       }, 0);
//   }
  