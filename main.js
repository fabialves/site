/* ============================================================
   LIBERATO ADVOCACIA — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Navegação: compactar ao rolar ─────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('compacto', window.scrollY > 70);
  }, { passive: true });

  /* ── Menu mobile (hamburger) ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');

  hamburger.addEventListener('click', function () {
    const aberto = drawer.classList.toggle('aberto');
    hamburger.classList.toggle('ativo', aberto);
    hamburger.setAttribute('aria-expanded', String(aberto));
  });

  // Fechar ao clicar em link do drawer
  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      drawer.classList.remove('aberto');
      hamburger.classList.remove('ativo');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Reveal ao rolar (IntersectionObserver) ─────────────── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  /* ── Formulário de contato ──────────────────────────────── */
  const form   = document.getElementById('form-contato');
  const btnEnv = document.getElementById('btn-enviar');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome  = document.getElementById('f-nome').value.trim();
      const tel   = document.getElementById('f-tel').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const area  = document.getElementById('f-area').value;
      const msg   = document.getElementById('f-mensagem').value.trim();

      if (!nome || !email) return;

      btnEnv.disabled    = true;
      btnEnv.textContent = 'Enviando…';

      const texto = [
        'Olá, vim pelo site da Liberato Advocacia.',
        '',
        'Nome: ' + nome,
        email  ? 'E-mail: ' + email : '',
        tel    ? 'Telefone: ' + tel  : '',
        area   ? 'Área: ' + area     : '',
        msg    ? '\n' + msg           : '',
      ].filter(Boolean).join('\n');

      setTimeout(function () {
        window.open(
          'https://wa.me/5511912316644?text=' + encodeURIComponent(texto),
          '_blank'
        );
        btnEnv.textContent = 'Mensagem enviada ✓';
        btnEnv.style.background = '#6b5a24';
        form.reset();
      }, 500);
    });
  }

})();
