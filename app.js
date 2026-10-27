const GA_MEASUREMENT_ID = 'G-T20WCMY2DG';
// A tag do Google Ads e do GA4 é inicializada no head do index.html.

const mainNav = document.querySelector('.topbar nav');
if (mainNav && !mainNav.querySelector('[data-support-link]')) {
  const supportLink = document.createElement('a');
  supportLink.href = '/suporte/';
  supportLink.textContent = 'Suporte';
  supportLink.dataset.supportLink = 'true';

  const buyLink = mainNav.querySelector('.nav-cta');
  if (buyLink) {
    mainNav.insertBefore(supportLink, buyLink);
  } else {
    mainNav.appendChild(supportLink);
  }
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
  checkoutButton.addEventListener('click', (event) => {
    if (checkoutButton.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      return;
    }

    // Aguarda brevemente o envio do evento antes de sair para o checkout da Kiwify.
    event.preventDefault();
    const destination = checkoutButton.href;
    let navigated = false;
    const continueToCheckout = () => {
      if (navigated) return;
      navigated = true;
      window.location.href = destination;
    };

    window.gtag('event', 'click_comprar', {
      send_to: GA_MEASUREMENT_ID,
      link_url: destination,
      link_text: checkoutButton.textContent.trim(),
      checkout_provider: 'Kiwify',
      event_callback: continueToCheckout
    });

    // Fallback: nunca prende o cliente no site se a tag estiver bloqueada ou lenta.
    window.setTimeout(continueToCheckout, 900);
  });
}

// A imagem principal é definida apenas no HTML. Não substituir seu src via JavaScript.

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
