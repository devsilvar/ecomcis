

let NairaFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
});

export const formatMoney = (value, currency='₦') => {
  // Ensure the value is a number
  let number = Number(value);

  // Check if the conversion to number was successful
  if (isNaN(number)) {
      // Handle the case where the value is not a number
      console.error('The provided value is not a valid number:', value);
      return null; // or return a default string like "Invalid number"
  }

  // Convert the number to a string with two decimal places
  let formattedNumber = number.toFixed(2);

  // Add commas as thousand separators
  formattedNumber = formattedNumber.replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return currency + formattedNumber;
}


export default NairaFormat;



export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
  
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  export const formatDateOnly = (timestamp) => {
    const date = new Date(timestamp);
  
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };