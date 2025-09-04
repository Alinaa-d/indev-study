require('./booking.scss');

document.addEventListener('DOMContentLoaded', function () {
  function setupElementLabelBinding(elementId, labelId) {
    const element = document.getElementById(elementId);
    const label = document.getElementById(labelId);

    if (element.tagName === 'SELECT') {
      element.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        label.textContent = selectedOption.textContent;
      });
    } else {
      element.addEventListener('input', function () {
        label.textContent = this.value;
      });
    }
  }

  function setupCounterBinding(inputId, countLabelId, costLabelClass, price) {
    const input = document.getElementById(inputId);
    const countLabel = document.getElementById(countLabelId);
    const costLabel = document.querySelector('.' + costLabelClass);

    const updateLabels = () => {
      const count = parseInt(input.value) || 0;
      const cost = count * price;

      countLabel.textContent = count;
      costLabel.textContent = `${cost} €`;

      updateTotalCost();
    };

    const updateTotalCost = () => {
      const basicInput = document.getElementById('basic');
      const seniorInput = document.getElementById('senior');
      const totalCostLabel = document.querySelector('.total-cost');

      if (basicInput && seniorInput && totalCostLabel) {
        const basicCount = parseInt(basicInput.value) || 0;
        const seniorCount = parseInt(seniorInput.value) || 0;
        const totalCost = basicCount * 20 + seniorCount * 10;

        totalCostLabel.textContent = `${totalCost} €`;
      }
    };

    const observer = new MutationObserver(updateLabels);
    observer.observe(input, {
      attributes: true,
      attributeFilter: ['value'],
    });

    input.addEventListener('change', updateLabels);
    input.addEventListener('input', updateLabels);

    const decrementBtn = input.previousElementSibling;
    const incrementBtn = input.nextElementSibling;

    if (decrementBtn) {
      decrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 0;
        const min = parseInt(input.getAttribute('min')) || 0;
        if (currentValue > min) {
          input.value = currentValue - 1;
          updateLabels();
        }
      });
    }

    if (incrementBtn) {
      incrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 0;
        input.value = currentValue + 1;
        updateLabels();
      });
    }

    updateLabels();
  }

  setupCounterBinding('basic', 'count-basic', 'cost-basic', 20);
  setupCounterBinding('senior', 'count-senior', 'cost-senior', 10);

  setupElementLabelBinding('date', 'select-date');
  setupElementLabelBinding('time', 'select-time');
  setupElementLabelBinding('ticket-type', 'select-ticket-type');

  const basicTickets = localStorage.getItem('basicTickets') || '1';
  const seniorTickets = localStorage.getItem('seniorTickets') || '1';
  const basicTotal = localStorage.getItem('basicTotal') || '20';
  const seniorTotal = localStorage.getItem('seniorTotal') || '10';
  const overallTotal = localStorage.getItem('overallTotal') || '30';

  document.getElementById('basic').value = basicTickets;
  document.getElementById('senior').value = seniorTickets;
  document.getElementById('count-basic').textContent = basicTickets;
  document.getElementById('count-senior').textContent = seniorTickets;
  document.querySelector('.cost-basic').textContent = `${basicTotal} €`;
  document.querySelector('.cost-senior').textContent = `${seniorTotal} €`;
  document.querySelector('.total-cost').textContent = `${overallTotal} €`;

  localStorage.removeItem('basicTickets');
  localStorage.removeItem('seniorTickets');
  localStorage.removeItem('basicTotal');
  localStorage.removeItem('seniorTotal');
  localStorage.removeItem('overallTotal');
  localStorage.removeItem('bookingData');

  function setupInputValidation(inputId, maxLength, regexPattern = /[^0-9]/g) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.maxLength = maxLength;
    input.addEventListener('input', function () {
      this.value = this.value.replace(regexPattern, '');
    });
  }

  setupInputValidation('cvc', 4);
  setupInputValidation('card-number', 19);
});
