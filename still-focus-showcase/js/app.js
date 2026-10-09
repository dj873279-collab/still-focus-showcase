const themeButtons = document.querySelectorAll("[data-theme-choice]");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeChoice;
    document.body.dataset.theme = theme;
    themeButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
  });
});

const display = document.querySelector("#timer-display");
const status = document.querySelector("#timer-status");
const toggleButton = document.querySelector("#timer-toggle");
const resetButton = document.querySelector("#timer-reset");
const ring = document.querySelector(".timer-ring");
const initialSeconds = 25 * 60;
let remaining = initialSeconds;
let intervalId = null;

function renderTimer() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  display.textContent = `${minutes}:${seconds}`;
  const progress = ((initialSeconds - remaining) / initialSeconds) * 100;
  ring.style.background = `conic-gradient(var(--accent) 0 ${progress}%, var(--ring) ${progress}% 100%)`;
}

function stopTimer() {
  if (intervalId !== null) window.clearInterval(intervalId);
  intervalId = null;
  toggleButton.innerHTML = 'Resume session <span aria-hidden="true">→</span>';
}

toggleButton.addEventListener("click", () => {
  if (intervalId !== null) {
    stopTimer();
    status.textContent = "Paused — take your time";
    return;
  }
  if (remaining <= 0) remaining = initialSeconds;
  status.textContent = "One thing at a time";
  toggleButton.innerHTML = 'Pause session <span aria-hidden="true">Ⅱ</span>';
  intervalId = window.setInterval(() => {
    remaining -= 1;
    renderTimer();
    if (remaining <= 0) {
      stopTimer();
      status.textContent = "Session complete — well done";
      toggleButton.textContent = "Start another session";
    }
  }, 1000);
});

resetButton.addEventListener("click", () => {
  stopTimer();
  remaining = initialSeconds;
  status.textContent = "A fresh start";
  toggleButton.innerHTML = 'Begin session <span aria-hidden="true">→</span>';
  renderTimer();
});

const dialog = document.querySelector("#info-dialog");
document.querySelector("#info-open").addEventListener("click", () => dialog.showModal());
document.querySelector("#info-close").addEventListener("click", () => dialog.close());
document.querySelector("#info-done").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
renderTimer();
