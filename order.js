// مدت زمان اولیه (90 دقیقه)
const ORDER_TIME = 90 * 60;

// کلید ذخیره در مرورگر
const STORAGE_KEY = "mr_cigaro_order_start";

let startTime = localStorage.getItem(STORAGE_KEY);

if (!startTime) {

    startTime = Date.now();

    localStorage.setItem(STORAGE_KEY, startTime);

}

startTime = Number(startTime);

function updateTimer() {

    const now = Date.now();

    const elapsed = Math.floor((now - startTime) / 1000);

    let remaining = ORDER_TIME - elapsed;

    if (remaining < 0) {

        remaining = 0;

    }

    const hours = Math.floor(remaining / 3600);

    const minutes = Math.floor((remaining % 3600) / 60);

    const seconds = remaining % 60;

    document.getElementById("countdown").textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

}

updateTimer();

setInterval(updateTimer, 1000);
