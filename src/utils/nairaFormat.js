

export const formatMoney = (value, currency) => {
  let number = Number(value);

  if (isNaN(number)) {
      console.error('The provided value is not a valid number:', value);
      return null;
  }

  let formattedNumber = number.toFixed(2);
  formattedNumber = formattedNumber.replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return currency + formattedNumber;
};

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