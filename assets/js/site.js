/* themaxterone — site behaviour (plain JS) */
(function () {
  "use strict";

  // ----- mobile nav -----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ----- typing terminal (home) -----
  var typed = document.getElementById("typed");
  if (typed) {
    var lines = JSON.parse(typed.getAttribute("data-lines") || "[]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    typed.textContent = "";
    var cursor = document.createElement("span");
    cursor.className = "cursor";
    var i = 0;
    var run = function () {
      if (i >= lines.length) { return; }
      var text = lines[i++];
      var p = document.createElement("p");
      var isCmd = text.charAt(0) === "$";
      p.className = isCmd ? "cmd" : "out";
      typed.appendChild(p);
      if (!isCmd || reduce) {
        p.textContent = text;
        p.appendChild(cursor);
        setTimeout(run, reduce ? 0 : 140);
        return;
      }
      var n = 0;
      var tick = function () {
        p.textContent = text.slice(0, ++n);
        p.appendChild(cursor);
        if (n < text.length) { setTimeout(tick, 32); } else { setTimeout(run, 280); }
      };
      tick();
    };
    run();
  }

  // ----- filtering (writeups page) -----
  var grid = document.getElementById("grid");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var q = document.getElementById("q");
    var filters = document.getElementById("filters");
    var empty = document.getElementById("empty");
    var active = "all";
    var apply = function () {
      var term = (q.value || "").toLowerCase().trim();
      var shown = 0;
      cards.forEach(function (c) {
        var ok = true;
        if (active.indexOf("cat:") === 0) { ok = c.dataset.cat === active.slice(4); }
        if (active.indexOf("tag:") === 0) { ok = c.dataset.tags.split(",").indexOf(active.slice(4)) !== -1; }
        if (ok && term) { ok = c.dataset.text.indexOf(term) !== -1; }
        c.hidden = !ok;
        if (ok) { shown++; }
      });
      empty.hidden = shown !== 0;
    };
    var setActive = function (value) {
      active = value;
      Array.prototype.forEach.call(filters.querySelectorAll(".chip-btn"), function (b) {
        b.classList.toggle("active", b.dataset.filter === value);
      });
      apply();
    };
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".chip-btn");
      if (b) { setActive(b.dataset.filter); }
    });
    q.addEventListener("input", apply);
    var params = new URLSearchParams(location.search);
    if (params.get("cat")) { setActive("cat:" + params.get("cat")); }
    else if (params.get("tag")) { setActive("tag:" + params.get("tag")); }
  }

  // ----- post page: progress, toc spy, copy, lightbox -----
  var bar = document.getElementById("progress-bar");
  if (bar) {
    var article = document.querySelector(".prose");
    var onScroll = function () {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = Math.min(1, Math.max(0, (-r.top + 80) / Math.max(total, 1)));
      bar.style.width = (done * 100).toFixed(1) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    Array.prototype.forEach.call(tocLinks, function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Array.prototype.forEach.call(tocLinks, function (a) { a.classList.remove("on"); });
          var a = map[en.target.id];
          if (a) { a.classList.add("on"); }
        }
      });
    }, { rootMargin: "-90px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { io.observe(el); }
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-btn");
    if (btn) {
      var code = btn.closest(".code-block").querySelector("code").innerText;
      var done = function () { btn.textContent = "copied"; setTimeout(function () { btn.textContent = "copy"; }, 1400); };
      if (navigator.clipboard) { navigator.clipboard.writeText(code).then(done); } else { done(); }
      return;
    }
    var img = e.target.closest(".prose img");
    if (img) {
      var box = document.createElement("div");
      box.className = "lightbox";
      var big = document.createElement("img");
      big.src = img.src;
      big.alt = img.alt;
      box.appendChild(big);
      box.addEventListener("click", function () { box.remove(); });
      document.body.appendChild(box);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var lb = document.querySelector(".lightbox");
      if (lb) { lb.remove(); }
    }
  });
})();
