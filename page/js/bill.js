const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('buyerName'); 
const planName = urlParams.get('planName');
const planPrice = urlParams.get('planPrice');

const init = async () => {
  // 1.2 Inyecta los valores obtenidos en los `container_bill`.
  const userNameElement = document.querySelector('.username');
  const planNameElement = document.querySelector('.name');
  const priceElement = document.querySelector('.price'); 
  const priceTotalElement = document.querySelector('.total_price');

  userNameElement.textContent = userName || 'Usuario Anónimo';
  planNameElement.textContent = planName || 'Nombre del Plan';
  priceElement.textContent = planPrice ? `$${planPrice}` : '$0.00';
  priceTotalElement.textContent = planPrice ? `$${planPrice}` : '$0.00';

  // 1.3 Inyecta la fecha actual en la fecha de la factura
  const actualDate = new Date();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();
  const day = actualDate.getDate();

  const dateElement = document.querySelector('.date'); 
  dateElement.textContent = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`; // Formato YYYY/MM/DD
};

init();