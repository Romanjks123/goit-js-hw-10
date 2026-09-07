import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateInput = document.querySelector("#datetime-picker");
const daysM = document.querySelector("[data-days]");
const hoursM = document.querySelector("[data-hours]");
const minutesM = document.querySelector("[data-minutes]");
const secondsM = document.querySelector("[data-seconds]");
const btnStart = document.querySelector("[data-start]");

let userSelectedDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    btnDis(userSelectedDate);
  },
};

flatpickr(dateInput, options);

function btnDis(data){
  if (!data || data.getTime() < Date.now()) {
    // window.alert("wok")
    iziToast.show({
    animateInside: false,

      color: 'red',
      position: 'topRight',
    message: 'Please choose a date in the future'
});
    btnStart.disabled = true;
    
  } else {
    btnStart.disabled = false;
  }
}

btnStart.addEventListener("click", () => {
  if (!userSelectedDate) {
    return;
  }

  startTimer(userSelectedDate);
});

function startTimer(date) {
  btnStart.disabled = true;
  dateInput.disabled = true;

  if (timerId) {
    clearInterval(timerId);
  }

  updateTimer(date);

  timerId = setInterval(() => {
    updateTimer(date);
  }, 1000);
}

function updateTimer(date) {
  const currentTime = Date.now();
  const targetTime = date.getTime();

  if (targetTime > currentTime) {
    const time = targetTime - currentTime;

    const { days, hours, minutes, seconds } = convertMs(time);

    daysM.textContent = String(days).padStart(2, "0");
    hoursM.textContent = String(hours).padStart(2, "0");
    minutesM.textContent = String(minutes).padStart(2, "0");
    secondsM.textContent = String(seconds).padStart(2, "0");
  } else {
    clearInterval(timerId);
    timerId = null;

    daysM.textContent = "00";
    hoursM.textContent = "00";
    minutesM.textContent = "00";
    secondsM.textContent = "00";

    dateInput.disabled = false;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);

  // Remaining hours
  const hours = Math.floor((ms % day) / hour);

  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);

  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}