// ZeCa-Alu — geteiltes Script für alle Seiten. Kein Framework, keine Abhängigkeiten.
(function(){
  "use strict";

  // Mobile-Navigation: öffnen/schließen, Label und aria-expanded stets synchron, Escape schließt
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    var setNav = function(open, returnFocus){
      burger.classList.toggle('open', open);
      mobileNav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      if (!open && returnFocus) burger.focus();
    };
    burger.addEventListener('click', function(){
      setNav(!burger.classList.contains('open'), false);
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setNav(false, false); });
    });
    document.addEventListener('keydown', function(ev){
      if (ev.key === 'Escape' && burger.classList.contains('open')) setNav(false, true);
    });
    // Beim Aufziehen des Fensters über den Umbruch hinaus: Menü zurücksetzen
    window.matchMedia('(min-width:1101px)').addEventListener('change', function(m){
      if (m.matches) setNav(false, false);
    });
  }

  // Karte erst auf Klick laden (keine Verbindung zu Google, bevor der Besucher zustimmt)
  document.querySelectorAll('.map-embed').forEach(function(box){
    var btn = box.querySelector('.map-load-btn');
    if (!btn) return;
    btn.addEventListener('click', function(){
      var iframe = document.createElement('iframe');
      iframe.src = box.getAttribute('data-map-src');
      iframe.title = 'ZeCa-Alu auf der Karte';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  });

  // Kontaktformular per FormSubmit (kein eigenes Backend nötig)
  var form = document.querySelector('#kontaktformular');
  if (form) {
    var status = form.querySelector('.form-status');
    var showStatus = function(kind, html){
      if (!status) return;
      status.className = 'form-status show ' + kind;
      status.innerHTML = html;
    };
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet…'; }
      if (status) { status.className = 'form-status'; status.textContent = ''; }

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function(res){
        if (!res.ok) throw new Error('Senden fehlgeschlagen');
        form.reset();
        showStatus('ok', 'Danke! Ihre Nachricht ist angekommen – wir melden uns zeitnah.');
        if (btn) { btn.textContent = 'Gesendet'; }
        setTimeout(function(){
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        }, 4000);
      }).catch(function(){
        showStatus('err', 'Das Senden hat leider nicht geklappt. Bitte rufen Sie uns direkt an: <a href="tel:+4917624860016">0176 24860016</a> – oder schreiben Sie an <a href="mailto:info@zeca-alu.de">info@zeca-alu.de</a>.');
        if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
      });
    });
  }
})();
