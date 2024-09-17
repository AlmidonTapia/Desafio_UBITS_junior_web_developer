// 1. primero se debe obtener los valores del nombre y precio del plan comprado de las query params
// e inyectarlos en el HTML

// 1.1 obtener de los query params los valores del nombre y precio del plan comprado para esto
// se puede utilizar el metodo URLSearchParams y el window.location.search
const urlParams = new URLSearchParams(window.location.search);
const planName = urlParams.get('name');
const planPrice = urlParams.get('price');

const init = async () => {
  // 1.2 inyecta los valores obtenidos en los `billing_details`.
  const billingDetails = document.querySelector('.billing_details');
  const billingDetailsSpan = billingDetails.querySelectorAll('span');
  billingDetailsSpan[0].textContent = planName;
  billingDetailsSpan[1].textContent = planPrice;
};

init();

// 2. obtener todos los inputs (nombre, numero de tarjeta, fecha de vencimiento, codigo cvv)
// y del formulario para realizar la manipulación de la información dada por el usuario
// asi como la card en la cual se inyectaran los valores del formulario para generar un efecto
// de interactividad.

const form = document.querySelector('.form');
const name = document.getElementById('name');
const number = document.getElementById('number');
const date = document.getElementById('date');
const cvv = document.getElementById('cvv');
const visa = document.querySelector('.card__visa');

// 3. crea una funcion showError que acepte 2 parametros, el primero el elemento HTML que tiene
// un error en su valor (ejemplo: una tarjeta de credito de menos de 19 caracteres) y el segundo
// parametro sera un booleano que cambia el estilo del elemento donde si hay error debemos
// cambiar el opacity a uno del elemento inyectado a la función `showError`, de lo contrario cambiar
// el calor del opacity a cero.

/*  SHOW ERROR  */
function showError(element, error) {
  if (error === true) {
    element.style.opacity = "1";
  } else {
    element.style.opacity = "0";
  }
}

// 4. agrega en event listener al input name (nombre) donde se ejecute en la acción 'input'
// dentro de esta función debes capturar el elemento `alert-1` y si el valor del input esta vacio (value === "")
// se use el metodo showError para mostrar el error, ademas de esto inyecta el valor de este input en el
// elemento `card-name`

/*  CHANGE THE FORMAT NAME  */
name.addEventListener("input", function (e) {
  let alert1 = document.getElementById('alert-1');
  let error = e.target.value === "";
  showError(alert1, error);
  document.getElementById("card-name").textContent = e.target.value || 'FULL NAME';
});

// 5. agrega en event listener al input numbre (numero de la credit card) donde se ejecute en la acción 'input'
// dentro de esta función debes capturar el elemento `alert-2` y si el valor del input es diferente a 19 (value.length !== 19)
// se use el metodo showError para mostrar el error, ademas de esto utiliza la función `numberAutoFormat`
// para poner el valor de number input en el formato esperado de la credit card y luego inyecta este valor en el
// elemento `card__number`

function numberAutoFormat(value) {
  // Elimina todo lo que no sea un dígito
  let v = value.replace(/\D/g, '');
  
  // Limita el valor a 16 dígitos
  v = v.slice(0, 16);
  
  // Divide en bloques de 4 dígitos
  let parts = [];
  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.slice(i, i + 4));
  }
  
  return parts.join(' '); // Devuelve el valor formateado con espacios
}

number.addEventListener("input", function (e) {
  // Asegúrate de que no haya espacios adicionales
  let formattedValue = numberAutoFormat(e.target.value.trim());
  e.target.value = formattedValue;

  // Verifica si hay 16 dígitos (sin espacios)
  let error = formattedValue.replace(/\s/g, '').length !== 16;
  let alert2 = document.getElementById('alert-2');
  showError(alert2, error);
  
  // Actualiza el número de la tarjeta en pantalla (usando querySelector por la clase)
  document.querySelector(".card__number").textContent = formattedValue || '#### #### #### ####';
});

// 6. agrega en event listener al input date (fecha de vencimiento de la creditcard) donde se ejecute en la acción 'input'
// dentro de esta función debes capturar el elemento `alert-3`, luego utiliza la función `isNotDate` para determinar si
// se dio una fecha correcta o no, luego use el metodo showError para mostrar el error, ademas de esto utiliza
// la función `dateAutoFormat` para poner el valor de la fecha en el formato esperado  y luego inyecta este valor en el
// elemento `month` y `year`

/*  CHANGE THE FORMAT DATE  */

date.addEventListener("input", function (e) {
  e.target.value = dateAutoFormat(e.target.value);
  // show error if is not a valid date
  let alert3 = document.getElementById('alert-3');
  showError(alert3, isNotDate(this));
  let dateNumber = date.value.match(/\d{2,4}/g);
  document.getElementById("month").textContent = dateNumber ? dateNumber[0] : 'MM';
  document.getElementById("year").textContent = dateNumber && dateNumber[1] ? dateNumber[1] : 'YY';
});

function dateAutoFormat(dateValue) {
  // 6.1 agrega la expresion regular o logica que elimine espacios en blanco y luego caracteres no numericos.
  let v = dateValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

  // min of 2 digits and max of 4
  let matches = v.match(/\d{2,4}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];

  for (let i = 0; i < match.length; i += 2) {
    parts.push(match.substring(i, i + 2));
  }

  if (parts.length) {
    return parts.join("/");
  } else {
    return dateValue;
  }
}

function isNotDate(element) {
  let actualDate = new Date();
  // 6.2 arregla esta expresion para obtener el numero del mes real
  let month = actualDate.getMonth() + 1;
  // 6.3 arregla esta expresion para obtener los ultimos dos digitos del año dado
  let year = actualDate.getFullYear() % 100; // 2022 -> 22
  let dateNumber = element.value.match(/\d{2,4}/g);
  let monthNumber = Number(dateNumber[0]);
  let yearNumber = Number(dateNumber[1]);

  if (
    element.value === "" ||
    monthNumber < 1 ||
    monthNumber > 12 ||
    yearNumber < year ||
    (monthNumber <= month && yearNumber === year)
  ) {
    return true;
  } else {
    return false;
  }
}

// 7. agrega en event listener al input cvv (codigo cvv) donde se ejecute en la acción 'input'
// dentro de esta función debes capturar el elemento `alert-4` y si el valor del input es menor a 3 (value.length < 3;)
// se use el metodo showError para mostrar el error.

/*  CHANGE THE FORMAT CVV  */
cvv.addEventListener("input", function (e) {
  let alert4 = document.getElementById('alert-4');
  showError(alert4, e.target.value.length < 3);
});

// 8. agrega el evento `submit` al form tag para completar la compra del paquete para esto
// valida nuevamente cada campo del formulario con las mismas reglas anteriormente mencionadas
// si se detecta error en algun campo se debe mostrar el campo que contenga errores
// agrega el preventDefault en el evento submit y de esta manera evitar la recarga de la pagina
// por ultimo realiza la re dirección a la pagina de facturacíon (`/bill.html`) donde ademas
// envies en lso query params el nombre del comprador, el nombre del plan comprado y
// el precio del plan comprado.

/*  VALIDATION FORM WHEN PRESS THE BUTTON   */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // 1. if any input is empty show the alert of that input
  let inputs = form.querySelectorAll('input');
  let hasError = false;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      inputs[i].nextElementSibling.style.opacity = "1";
      hasError = true;
    }
  }
  if (
      // 2. si no hay ningún nombre
      name.value === "" ||
      // 3. si la longitud de la tarjeta de número no es válida (16 números y 3 espacios en blanco)
      number.value.length !== 19 ||
      // 4. si no es una fecha valida (4 numero y "/" o no es una fecha valida)
      isNotDate(date) ||
      // 5. si no es un cvv valido
      cvv.value.length < 3
  ) {
    hasError = true;
  }
  
  if (hasError) {
    return;
  }
  
  window.location.href = `/bill.html?buyerName=${encodeURIComponent(name.value)}&planName=${encodeURIComponent(planName)}&planPrice=${encodeURIComponent(planPrice)}`;
});