(function () {
  var EN = {
    nav_about: "About", nav_features: "Features", nav_family: "Family", nav_why: "Difference", nav_founder: "Founder", nav_amb: "Ambitions",
    hero_tag: "In development · launching in Russia first",
    hero_sub: "One calm app for your home, tasks, sport and health. For you and your whole family.",
    ph_today: "Today", ph_family: "Family · 2 shared events", ph_home: "Smart home", ph_scene: "Living room · Evening scene",
    ph_note: "Note", ph_note_t: "Buy groceries for the week", ph_cal: "18:30", ph_cal_t: "Workout", ph_steps: "Steps",
    ph_ai: "Assistant: start Evening at 7 pm?", ph_cap: "Interface concept",
    about_eb: "About", about_h: "What Comfortable life is",
    about_p1: "Comfortable life is an app that brings together what is scattered across different apps on your phone today: smart home, notes, schedule, sport and health.",
    about_p2: "We build it for anyone. It should feel simple on day one and be needed every day.",
    goal_l: "Our goal", goal_t: "To make life easier for people, right in their phone.",
    feat_eb: "Features", feat_h: "Five parts of life in one app",
    f1_h: "Smart home", f1_p: "Control devices from different ecosystems in one place. Scenes are run by a built-in AI assistant.",
    f2_h: "Notes", f2_p: "Quick notes, personal and shared. Everything is there when you need it.",
    f3_h: "Calendar", f3_p: "Your day and week at a glance. Family events next to yours.",
    f4_h: "Sport", f4_p: "Workouts, activity and progress without extra apps.",
    f5_h: "Health", f5_p: "Well-being and habits at hand, so caring for yourself becomes regular.",
    fam_eb: "Family mode", fam_h: "One home, many people, a space for each",
    fam_p: "A family keeps shared notes, a shared calendar and a shared smart home. Everyone still has a personal space that stays separate from the shared one.",
    v_you: "You", v_partner: "Partner", v_kin: "Family", v_pers: "personal", v_shared: "Shared", v_s1: "notes", v_s2: "calendar", v_s3: "home",
    why_eb: "Difference", why_h: "How we differ from what exists",
    old_h: "How it usually is",
    o1: "Your home is controlled in one app", o2: "Notes live in another", o3: "The calendar lives in a third",
    o4: "Sport and health are spread across separate services", o5: "A family has to share everything by hand",
    new_h: "In Comfortable life",
    n1: "Home, notes, calendar, sport and health in one app", n2: "Shared and personal spaces kept apart inside a family",
    n3: "Devices from different ecosystems and scenes with an AI assistant", n4: "Data protection as the main development principle",
    n5: "The interface language follows the device language",
    amb_eb: "Ambitions", amb_h: "To become part of every day",
    a1: "To become an essential part of a person's life.",
    a2: "To start in Russia, then reach the USA and other countries.",
    a3: "To speak everyone's language: the interface follows the device language.",
    a4: "To make data protection the foundation of the product.",
    fo_role: "Founder", fo_p: "Author of the idea and creator of Comfortable life.",
    foot: "In development"
  };
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-i]"));
  els.forEach(function (e) { e.setAttribute("data-ru", e.textContent); });
  var bRu = document.getElementById("l-ru"), bEn = document.getElementById("l-en");
  function setLang(l) {
    els.forEach(function (e) {
      e.textContent = l === "en" && EN[e.getAttribute("data-i")] ? EN[e.getAttribute("data-i")] : e.getAttribute("data-ru");
    });
    document.documentElement.lang = l;
    var mb = document.getElementById("menu-btn");
    if (mb) mb.setAttribute("aria-label", l === "en" ? "Menu" : "Меню");
    bRu.setAttribute("aria-pressed", l === "ru");
    bEn.setAttribute("aria-pressed", l === "en");
    try { localStorage.setItem("cl-lang", l); } catch (_) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("cl-lang"); } catch (_) {}
  var dev = String((navigator.languages && navigator.languages[0]) || navigator.language || "ru").toLowerCase();
  setLang(saved || (dev.indexOf("ru") === 0 ? "ru" : "en"));
  bRu.addEventListener("click", function () { setLang("ru"); });
  bEn.addEventListener("click", function () { setLang("en"); });

  /* fern: stem is a quadratic curve, leaflets are ellipses placed along it */
  function fern(id, bend, tipx, n) {
    var svg = document.getElementById(id), ns = "http://www.w3.org/2000/svg";
    var P0 = [150, 515], P1 = [bend, 270], P2 = [tipx, 28];
    var stem = document.createElementNS(ns, "path");
    stem.setAttribute("d", "M" + P0 + " Q" + P1 + " " + P2);
    stem.setAttribute("fill", "none"); stem.setAttribute("stroke", "currentColor");
    stem.setAttribute("stroke-width", "3"); stem.setAttribute("stroke-linecap", "round");
    svg.appendChild(stem);
    for (var i = 1; i <= n; i++) {
      var t = 0.1 + 0.88 * i / n, u = 1 - t;
      var x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
      var y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
      var tx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
      var ty = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
      var a = Math.atan2(ty, tx);
      var len = (78 * Math.pow(u, 0.75) + 9) * Math.min(1, t * 5 + 0.45);
      [-1, 1].forEach(function (s) {
        var d = a + s * 1.05;
        var cx = x + Math.cos(d) * len / 2, cy = y + Math.sin(d) * len / 2;
        var el = document.createElementNS(ns, "ellipse");
        el.setAttribute("cx", cx.toFixed(1)); el.setAttribute("cy", cy.toFixed(1));
        el.setAttribute("rx", (len / 2).toFixed(1)); el.setAttribute("ry", (len * 0.13).toFixed(1));
        el.setAttribute("transform", "rotate(" + (d * 180 / Math.PI).toFixed(1) + " " + cx.toFixed(1) + " " + cy.toFixed(1) + ")");
        el.setAttribute("fill", "currentColor"); el.setAttribute("opacity", "0.9");
        svg.appendChild(el);
      });
    }
  }
  /* mobile menu */
  var menuBtn = document.getElementById("menu-btn"), mnav = document.getElementById("mobile-nav");
  function setMenu(open) {
    mnav.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  menuBtn.addEventListener("click", function (e) { e.stopPropagation(); setMenu(mnav.hidden); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mnav.hidden) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!mnav.hidden && !mnav.contains(e.target)) setMenu(false);
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 980) setMenu(false); });

  /* anchor links: smooth scroll that works the same inside and outside a frame */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1), target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      try { history.replaceState(null, "", "#" + id); } catch (_) {}
    });
  });

  /* highlight the section being read */
  var links = Array.prototype.slice.call(document.querySelectorAll("nav a[href^='#']"));
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(function (s, i, arr) { return s && arr.indexOf(s) === i; });
  function markActive() {
    var y = window.scrollY + 120, current = null;
    secs.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = secs[secs.length - 1].id;
    links.forEach(function (a) {
      if (a.getAttribute("href").slice(1) === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", markActive, { passive: true });
  window.addEventListener("resize", markActive);
  markActive();

  fern("fern-h1", 70, 205, 24);
  fern("fern-h2", 230, 90, 18);
  fern("fern-w1", 60, 215, 26);
  fern("fern-w2", 235, 80, 20);
})();
