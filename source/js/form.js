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
