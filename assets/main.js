// ZeCa-Alu — geteiltes Script für alle Seiten. Kein Framework, keine Abhängigkeiten.
(function(){
  "use strict";

  // Mobile-Navigation
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function(){
      var open = burger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
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
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var success = document.querySelector('.form-success');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet…'; }

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function(res){
        if (!res.ok) throw new Error('Senden fehlgeschlagen');
        form.reset();
        if (success) success.classList.add('show');
        if (btn) { btn.textContent = 'Gesendet ✓'; }
      }).catch(function(){
        if (btn) { btn.textContent = 'Fehler – bitte anrufen'; }
      }).finally(function(){
        setTimeout(function(){
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        }, 4000);
      });
    });
  }
})();
