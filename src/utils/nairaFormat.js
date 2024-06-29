

let NairaFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
});


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