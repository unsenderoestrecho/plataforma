/* ============================================================
   UN SENDERO ESTRECHO — main.js
   ============================================================ */

// --- Nav scroll effect ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// --- Validación de código de acceso (via Netlify Function) ---
async function validarCodigo() {
  const input = document.getElementById('codigoInput');
  const errorEl = document.getElementById('errorAcceso');
  const codigo = (input?.value || '').trim().toUpperCase();

  if (!codigo) {
    mostrarError('Ingresá tu código de acceso.');
    return;
  }

  const btn = document.querySelector('.acceso-form .btn--primario');
  if (btn) {
    btn.textContent = '...';
    btn.disabled = true;
  }

  try {
    const res = await fetch('/.netlify/functions/validar-acceso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo }),
    });

    const data = await res.json();

    if (data.valido && data.redireccion) {
      errorEl.textContent = '';
      errorEl.style.color = '#6DBF8A';
      errorEl.textContent = '✦ Acceso concedido. Redirigiendo...';
      setTimeout(() => { window.location.href = data.redireccion; }, 800);
    } else {
      mostrarError('Código incorrecto. Verificá tu compra o escribinos.');
      if (btn) { btn.textContent = 'ENTRAR'; btn.disabled = false; }
    }
  } catch (err) {
    mostrarError('Error de conexión. Intentá de nuevo.');
    if (btn) { btn.textContent = 'ENTRAR'; btn.disabled = false; }
  }
}

function mostrarError(msg) {
  const errorEl = document.getElementById('errorAcceso');
  if (errorEl) {
    errorEl.style.color = '#E05050';
    errorEl.textContent = msg;
  }
}

// Enter key en el input de código
document.getElementById('codigoInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') validarCodigo();
});

// --- Scroll reveal suave para cards ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.curso-card, .pilar').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
