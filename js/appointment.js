// Günlere göre muayene slotları.
// 0=Pazar, 1=Pazartesi ... 6=Cumartesi (Date.getDay() ile aynı)
const morningLate = ["11:00", "11:30"]; // sabah + geç sabah dilimi
const morningEnd = ["12:00", "12:30"]; // çarşamba-cuma öğle sonu
const afternoon = [
  ["15:00", "16:00"],
  ["16:00", "17:00"],
  ["17:00", "17:30"]
];

const weekdaySlots = [
  ["08:00", "09:00"],
  ["09:00", "10:00"],
  ["10:00", "11:00"],
  [morningLate[0], morningLate[1]]
];

const shortDaySlots = [
  ["08:00", "09:00"],
  ["09:00", "10:00"],
  ["10:00", "11:00"],
  [morningEnd[0], morningEnd[1]]
];

const schedules = {
  1: [...weekdaySlots, ...afternoon], // Pazartesi
  2: [...weekdaySlots, ...afternoon], // Salı
  3: shortDaySlots,                  // Çarşamba
  4: [...weekdaySlots, ...afternoon], // Perşembe
  5: shortDaySlots                   // Cuma
};

const appointmentDate = document.getElementById("appointmentDate");
const appointmentTime = document.getElementById("appointmentTime");

function getLocalDateValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function setTimePlaceholder(message) {
  appointmentTime.innerHTML = `<option value="">${message}</option>`;
}

function renderSlots(slots) {
  appointmentTime.innerHTML = slots
    .map(([start, end]) => `<option value="${start}-${end}">${start} - ${end}</option>`)
    .join("");
}

function updateAppointmentTimes() {
  if (!appointmentDate.value) {
    setTimePlaceholder("Önce tarih seçiniz");
    return;
  }

  // Öğle vakti saatini seçiyoruz ki TZ kayması gün değişimini engellesin
  const day = new Date(`${appointmentDate.value}T12:00:00`).getDay();
  const slots = schedules[day];

  if (!slots) {
    setTimePlaceholder("Bu gün için randevu alınamıyor");
    return;
  }

  renderSlots(slots);
}

if (appointmentDate && appointmentTime) {
  appointmentDate.min = getLocalDateValue(new Date());
  appointmentDate.addEventListener("change", updateAppointmentTimes);
  setTimePlaceholder("Önce tarih seçiniz");
}
