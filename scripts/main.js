'use strict';
// Modal
const CLASS_LIST = {
  MODAL: 'modal',
  MODAL_ACTIVE: 'modal--active',
  TRIGGER_OPEN: 'modal-open',
  TRIGGER_CLOSE: 'modal-close',
};

const form = document.getElementById('form');

document.addEventListener('click', (event) => {
  if (event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
    event.preventDefault();

    const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
    const modalId = target.getAttribute('href').replace('#', '');
    const modal = document.getElementById(modalId);

    modal.classList.add(CLASS_LIST.MODAL_ACTIVE);
  }

  if (event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`)) {
    const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);
    modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    resetForm(form);
  }
});

function resetForm(form) {
  const errorMessages = document.querySelectorAll('.active-message');
  const errors = document.querySelectorAll('._error');
  const customSelect = document.querySelector('.custom-select__selected');
  const totalPrice = document.getElementById('price');
  form.reset();

  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].classList.remove('active-message');
  }

  for (let i = 0; i < errors.length; i++) {
    errors[i].classList.remove('_error');
  }

  customSelect.innerHTML = document.querySelector(
    '.custom-select > select'
  ).options[0].innerHTML;

  totalPrice.innerHTML = '$0';
}

// Custom select
const selectDiv = document.getElementsByClassName('custom-select');

for (let i = 0; i < selectDiv.length; i++) {
  const select = selectDiv[i].getElementsByTagName('select')[0];
  const selected = document.createElement('DIV');

  selected.setAttribute('class', 'custom-select__selected');
  selected.innerHTML = select.options[select.selectedIndex].innerHTML;
  selectDiv[i].appendChild(selected);

  const hideSelect = document.createElement('DIV');
  hideSelect.setAttribute(
    'class',
    'custom-select__items custom-select__items--hide'
  );

  for (let j = 1; j < select.length; j++) {
    let selectItem = document.createElement('DIV');
    selectItem.innerHTML = select.options[j].innerHTML;
    selectItem.setAttribute('data-price', select.options[j].value);

    selectItem.addEventListener('click', function (e) {
      const selectHeader =
        this.parentNode.parentNode.getElementsByTagName('select')[0];
      const newSelectedItem = this.parentNode.previousSibling;

      for (let i = 0; i < selectHeader.length; i++) {
        if (selectHeader.options[i].innerHTML == this.innerHTML) {
          selectHeader.selectedIndex = i;
          newSelectedItem.innerHTML = this.innerHTML;
          selectItem =
            this.parentNode.getElementsByClassName('same-as-selected');
          selected.setAttribute('data-price', this.dataset.price);

          for (let k = 0; k < selectItem.length; k++) {
            selectItem[k].classList.remove('same-as-selected');
          }

          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      newSelectedItem.click();
    });
    hideSelect.appendChild(selectItem);
  }

  selectDiv[i].appendChild(hideSelect);
  selected.addEventListener('click', function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('custom-select__items--hide');
    this.classList.toggle('select-arrow-active');
  });
}

function closeAllSelect(elem) {
  const arrNo = [];
  const hideSelect = document.getElementsByClassName('custom-select__items');
  const selected = document.getElementsByClassName('custom-select__selected');

  for (let i = 0; i < selected.length; i++) {
    if (elem == selected[i]) {
      arrNo.push(i);
    } else {
      selected[i].classList.remove('select-arrow-active');
    }
  }

  for (let i = 0; i < hideSelect.length; i++) {
    if (arrNo.indexOf(i)) {
      hideSelect[i].classList.add('custom-select__items--hide');
    }
  }
}

document.addEventListener('click', closeAllSelect);

// Form

const select = document.getElementsByClassName('custom-select__selected')[0];
const selectError = document.createElement('span');
selectError.setAttribute(
  'class',
  'form__item__message form__item__message--select'
);
select.parentElement.parentElement.appendChild(selectError);
selectError.textContent = 'Please select product type';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const modal = document.getElementById('modal');
  const totalPrice = document.getElementById('price');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    formData.append('select', select.innerHTML);
    formData.append('price', totalPrice.innerHTML);

    if (error === 0) {
      modal.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        modal.classList.remove('_sending');
      } else {
        alert('Error');
        modal.classList.remove('_sending');
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let firstNameError = document.querySelector(
      '#formFName + span.form__item__message--firstName'
    );
    let lastNameError = document.querySelector(
      '#formLName + span.form__item__message--lastName'
    );
    let emailError = document.querySelector(
      '#formEmail + span.form__item__message--email'
    );

    let formReq = document.querySelectorAll('._req');
    for (let i = 0; i < formReq.length; i++) {
      const field = formReq[i];
      select.classList.remove('_error');
      field.classList.remove('_error');

      if (field.classList.contains('_email')) {
        if (field.value === '') {
          emailError.textContent = 'Please fill in email address';
          emailError.classList.add('active-message');
          field.classList.add('_error');
          error++;
        } else if (emailTest(field)) {
          emailError.textContent = 'Please enter a valid email address';
          emailError.classList.add('active-message');
          field.classList.add('_error');
          error++;
        } else {
          emailError.classList.remove('active-message');
        }
      } else if (field.classList.contains('custom-select')) {
        if (
          select.innerHTML ===
          document.querySelector('.custom-select > select').options[0].innerHTML
        ) {
          selectError.classList.add('active-message');
          select.classList.add('_error');
          error++;
        } else {
          selectError.classList.remove('active-message');
        }
      } else {
        if (field.value === '') {
          if (field.getAttribute('name') === 'firstName') {
            firstNameError.classList.add('active-message');
          } else if (field.getAttribute('name') === 'lastName') {
            lastNameError.classList.add('active-message');
          }
          field.classList.add('_error');
          error++;
        } else {
          if (field.getAttribute('name') === 'firstName') {
            firstNameError.classList.remove('active-message');
          } else if (field.getAttribute('name') === 'lastName') {
            lastNameError.classList.remove('active-message');
          }
        }
      }
    }
    return error;
  }

  function emailTest(field) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(field.value);
  }
});

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
