const init = async () => {
  // 1. Llamada a la API
  const url = "https://buty619.github.io/pricing.json";
  let apiData;
  try {
    const response = await fetch(url);
    apiData = await response.json();
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return;
  }

  // 2. Inyección de datos en las cards
  // 2.1 Plan Basic
  const basicCard = document.querySelector('.pricing-card.basic');
  
  // 2.1.1 Título
  const basicCardTitle = basicCard.querySelector('.plan-title');
  basicCardTitle.textContent = apiData.basic.name;

  // 2.1.2 Precio
  const basicCardPrice = basicCard.querySelector('.price-title');
  const basicCardPriceSpan = basicCardPrice.querySelector('span');
  basicCardPriceSpan.textContent = apiData.basic.price;

  // 2.1.3 Descuento
  const basicCardDiscount = basicCard.querySelector('.badge-box');
  const basicCardDiscountSpan = basicCardDiscount.querySelector('span');
  basicCardDiscountSpan.textContent = `Save ${apiData.basic.discount}`;

  // 2.1.4 Características
  const basicCardList = basicCard.querySelector('ul');
  const basicCardElementList = basicCardList.children;
  [...basicCardElementList].map(
    (element, i) => {
      element.textContent = apiData.basic.characteristics[i] || '';
    }
  );

  // 2.2 Iteración para los demás planes
  Object.entries(apiData).map(([section, data]) => {
    if (section === 'basic') return; // Ya lo hicimos arriba

    const card = document.querySelector(`.pricing-card.${section}`);
    if (!card) return;

    card.querySelector('.plan-title').textContent = data.name;
    card.querySelector('.price-title span').textContent = data.price;
    card.querySelector('.badge-box span').textContent = `Save ${data.discount}`;

    const listItems = card.querySelectorAll('ul li');
    listItems.forEach((item, index) => {
      item.textContent = data.characteristics[index] || '';
    });
  });

  // 3. Agregar acción a los botones
  Object.entries(apiData).map(([section, data]) => {
    const card = document.querySelector(`.pricing-card.${section}`);
    if (!card) return;

    const buyButton = card.querySelector('.buy-now');
    buyButton.href = `/payment.html?name=${encodeURIComponent(data.name)}&price=$${encodeURIComponent(data.price)}`;
  });
};

// Inicialización del script
init();