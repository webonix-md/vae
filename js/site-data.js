/* ============================================================
   Все данные, которые может понадобиться поменять, — здесь.
   Что взято из объявления / сайта vae.md, а что выдумано для
   демо, — см. DEMO-CHECKLIST.md
   ============================================================ */
window.SITE = {
  brand: "VAE",
  brandFull: "Учебный центр SRL «VAE»",
  brandFull_ro: "Centrul de instruire SRL «VAE»",
  since: 1992, // объявление 999: «с 1992»; старый сайт: «с 1994» — уточнить

  // Ближайший старт. null → «идёт набор, дату уточняйте по телефону»
  nextStart: null, // например: "12 октября"
  nextStart_ro: null, // например: "12 octombrie"

  phones: [
    { tel: "+37379665783", label: "+373 79 665 783", note: "администратор", note_ro: "administrator" },
    { tel: "+37367314344", label: "+373 67 314 344", note: "", note_ro: "" },
    { tel: "+37322275888", label: "+373 22 275 888", note: "городской", note_ro: "fix" }
  ],
  // RO-версия (ro.html) берёт поля с суффиксом _ro, если они есть

  // Мессенджеры — ПРЕДПОЛОЖЕНИЕ, что они есть на основном номере
  viber: "viber://chat?number=%2B37379665783",
  whatsapp: "https://wa.me/37379665783",

  address: "ул. Милешть 34, сектор Чентру, Кишинёв",
  addressNote: "здание гимназии № 7 им. Адриана Пэунеску, цокольный этаж",
  address_ro: "str. Mileștii 34, sectorul Centru, Chișinău",
  addressNote_ro: "clădirea Gimnaziului nr. 7 „Adrian Păunescu”, demisol",
  mapQuery: "strada Mileștii 34, Chișinău",
  intake: "пн–чт, 18:00–19:00 — по предварительному звонку",
  intake_ro: "luni–joi, 18:00–19:00 — cu apel telefonic în prealabil",

  courses: {
    radio: { months: 8, pricePerMonth: 1600 },
    electro: { months: 5.5, pricePerMonth: 1100 }
  }
};
