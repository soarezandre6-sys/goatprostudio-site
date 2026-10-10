const GA_MEASUREMENT_ID = 'G-T20WCMY2DG';

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};
window.gtag('js', new Date());
window.gtag('config', GA_MEASUREMENT_ID);

const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(gaScript);

document.getElementById('year').textContent = new Date().getFullYear();

const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
  checkoutButton.addEventListener('click', (event) => {
    if (checkoutButton.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      return;
    }

    window.gtag('event', 'click_comprar', {
      send_to: GA_MEASUREMENT_ID,
      link_url: checkoutButton.href,
      link_text: checkoutButton.textContent.trim(),
      checkout_provider: 'Kiwify'
    });
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
