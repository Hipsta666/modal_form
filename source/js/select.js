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
