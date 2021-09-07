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
