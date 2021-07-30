// navigation:
// track which month to display
let nav = 0;

// clicked:
// track which day was chosen
let clicked = null;

// events:
// the store for all created events
let events = localStorage.getItem('events') ?
  localStorage.getItem('events') : [];

// weekdays:
// all possible weekdays
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// calendar:
// pre-created div that represents the calendar
const calendar = document.getElementById('calendar');


// -------------------------------------------------


const load = () => {
  const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  };

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  
  document.getElementById('monthDisplay').innerText =
  `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.addEventListener('click', () => {
        console.log('clicked');
      });
    } else {
      daySquare.classList.add('padding');
    };

    calendar.appendChild(daySquare);
  };
};

const initButtons = () => {
  document.getElementById('nextButton')
    .addEventListener('click', () => {
      nav++;
      load();
    });

  document.getElementById('backButton')
    .addEventListener('click', () => {
      nav--;
      load();
    });
};


// -------------------------------------------------


load();
initButtons();
