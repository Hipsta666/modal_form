// Price calculation

const checkboxes = document.getElementsByClassName('checkboxPrice');
const selectedProduct = document.querySelector('.custom-select__selected');
const price = document.getElementById('price');
let sum = 0;

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', function () {
    if (checkboxes[i].checked) {
      sum += +checkboxes[i].value;
    } else {
      sum -= +checkboxes[i].value;
    }

    price.innerHTML = `$${sum}`;
  });
}

let productPrice = 0;
let oldPrice = 0;
const observer = new MutationObserver(() => {
  productPrice = selectedProduct.dataset.price;
  if (productPrice != oldPrice) {
    sum += +productPrice;
    sum -= oldPrice;
    oldPrice = +productPrice;
  }

  price.innerHTML = `$${sum}`;
});

observer.observe(selectedProduct, {
  characterData: true,
  attributeFilter: ['data-price'],
});
