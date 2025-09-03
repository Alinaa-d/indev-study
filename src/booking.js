require('./booking.scss');

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('increment-booking')) {
      const input = e.target.previousElementSibling;
      if (input && input.type === 'number') {
        input.value = (parseInt(input.value) || 0) + 1;
      }
    }

    if (e.target.classList.contains('decrement-booking')) {
      const input = e.target.nextElementSibling;
      if (input && input.type === 'number') {
        const value = parseInt(input.value) || 0;
        const min = parseInt(input.getAttribute('min')) || 0;
        if (value > min) {
          input.value = value - 1;
        }
      }
    }
  });

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

    const decrementBtn = input.previousElementSibling;
    const incrementBtn = input.nextElementSibling;

    const handleButtonClick = () => {
      setTimeout(updateLabels, 0);
    };

    if (decrementBtn) decrementBtn.addEventListener('click', handleButtonClick);
    if (incrementBtn) incrementBtn.addEventListener('click', handleButtonClick);

    updateLabels();
  }

  setupCounterBinding('basic', 'count-basic', 'cost-basic', 20);
  setupCounterBinding('senior', 'count-senior', 'cost-senior', 10);

  setupElementLabelBinding('date-input', 'select-date');
  setupElementLabelBinding('time-input', 'select-time');
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
});
