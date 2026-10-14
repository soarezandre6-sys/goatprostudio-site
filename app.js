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

// Imagem principal aprovada do GOAT PRO Studio.
// Os fragmentos binários ficam em /assets para o GitHub Pages publicá-los normalmente.
const heroImage = document.querySelector('.hero .media-frame img');
if (heroImage) {
  const heroParts = [
    'assets/hero-final-0.part?v=20261010-3',
    'assets/hero-final-1.part?v=20261010-3',
    'assets/hero-final-2.part?v=20261010-3',
    'assets/hero-final-3.part?v=20261010-3',
    'assets/hero-final-4.part?v=20261010-3'
  ];

  // Evita mostrar ícone de imagem quebrada/alt enquanto os fragmentos são carregados.
  heroImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  heroImage.alt = 'GOAT PRO Studio com câmeras USB, IP, smartphone e câmera de astronomia';

  Promise.all(heroParts.map(async (url) => {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${url}: ${response.status}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  }))
    .then((parts) => {
      const totalLength = parts.reduce((total, part) => total + part.length, 0);
      const bytes = new Uint8Array(totalLength);
      let offset = 0;
      for (const part of parts) {
        bytes.set(part, offset);
        offset += part.length;
      }

      const objectUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));
      heroImage.onload = () => URL.revokeObjectURL(objectUrl);
      heroImage.src = objectUrl;
    })
    .catch((error) => {
      console.error('Erro ao carregar a imagem principal aprovada:', error);
    });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
