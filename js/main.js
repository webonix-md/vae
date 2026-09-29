(function () {
  "use strict";
  var S = window.SITE;
  var LANG = document.documentElement.lang === "ro" ? "ro" : "ru";
  // поле на языке страницы: для RO берём x_ro, если оно заполнено
  var L = function (obj, key) { return (LANG === "ro" && obj[key + "_ro"] != null) ? obj[key + "_ro"] : obj[key]; };
  var TXT = {
    ru: { open: "Идёт набор", start: "Старт " },
    ro: { open: "Înscrierea e deschisă", start: "Start: " }
  }[LANG];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); };
  var num = function (n) { return String(n).replace(".", ","); };
  var total = function (c) { return Math.round(c.months * c.pricePerMonth); };

  /* ---------- телефоны и мессенджеры ---------- */
  $$("[data-phone]").forEach(function (a) {
    var p = S.phones[+a.getAttribute("data-phone")] || S.phones[0];
    a.href = "tel:" + p.tel;
    if (!a.textContent.trim()) a.textContent = p.label;
  });
  $$("[data-viber]").forEach(function (a) { a.href = S.viber; });
  $$("[data-whatsapp]").forEach(function (a) { a.href = S.whatsapp; a.target = "_blank"; a.rel = "noopener"; });

  var list = $("#phones");
  if (list) {
    S.phones.forEach(function (p) {
      var li = document.createElement("li");
      li.innerHTML = '<a href="tel:' + p.tel + '">' + p.label + "</a>" + (L(p, "note") ? "<small>" + L(p, "note") + "</small>" : "");
      list.appendChild(li);
    });
  }

  /* ---------- тексты из данных ---------- */
  var set = function (sel, text) { $$(sel).forEach(function (el) { el.textContent = text; }); };
  set("[data-address]", L(S, "address"));
  set("[data-address-note]", L(S, "addressNote"));
  set("[data-intake]", L(S, "intake"));
  set("[data-intake-short]", L(S, "intake").split(" — ")[0]);
  set("[data-brand-full]", L(S, "brandFull"));
  set("[data-since]", S.since);
  set("[data-years]", (new Date().getFullYear() - S.since) + "+");
  set("[data-start-short]", L(S, "nextStart") ? TXT.start + L(S, "nextStart") : TXT.open);

  Object.keys(S.courses).forEach(function (k) {
    var c = S.courses[k];
    set('[data-months="' + k + '"]', num(c.months));
    set('[data-ppm="' + k + '"]', fmt(c.pricePerMonth));
    set('[data-total="' + k + '"]', fmt(total(c)));
  });

  var map = $("#map");
  if (map) map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(S.mapQuery) + "&z=16&output=embed";

  /* ---------- калькулятор стоимости ---------- */
  var opts = $$(".calc__opt");
  function showCourse(key) {
    var c = S.courses[key];
    opts.forEach(function (b) {
      var on = b.getAttribute("data-course") === key;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-selected", on);
    });
    $("#calcPpm").textContent = fmt(c.pricePerMonth);
    $("#calcMonths").textContent = num(c.months);
    countTo($("#calcTotal"), total(c));
  }
  function countTo(el, target) {
    var from = parseInt((el.textContent || "0").replace(/\D/g, ""), 10) || 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || from === target) { el.textContent = fmt(target); return; }
    // setTimeout, а не rAF: rAF замирает в фоновой вкладке, и сумма застревала
    clearTimeout(el._timer);
    var t0 = Date.now(), dur = 500;
    (function step() {
      var k = Math.min(1, (Date.now() - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(from + (target - from) * e));
      if (k < 1) el._timer = setTimeout(step, 16);
    })();
  }
  opts.forEach(function (b) { b.addEventListener("click", function () { showCourse(b.getAttribute("data-course")); }); });
  if (opts.length) showCourse("radio");

  /* ---------- меню на телефоне ---------- */
  var burger = $("#burger"), nav = $("#nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open);
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", false); });
    });
  }
})();
