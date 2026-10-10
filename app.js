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

// Carrega exatamente a imagem aprovada do GOAT PRO Studio.
// Ela já está armazenada no repositório em 4 partes base64.
const heroImage = document.querySelector('.hero .media-frame img');
if (heroImage) {
  const heroParts = [
    '.hero-upload/part-00.txt?v=20261009-final',
    '.hero-upload/part-01.txt?v=20261009-final',
    '.hero-upload/part-02.txt?v=20261009-final',
    '.hero-upload/part-03.txt?v=20261009-final'
  ];

  heroImage.removeAttribute('src');
  heroImage.alt = 'GOAT PRO Studio com câmeras USB, IP, smartphone e câmera de astronomia';

  Promise.all(heroParts.map(async (url) => {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${url}: ${response.status}`);
    }
    return response.text();
  }))
    .then((parts) => {
      const base64 = parts.join('').replace(/\s+/g, '');
      heroImage.src = `data:image/webp;base64,${base64}`;
    })
    .catch((error) => {
      console.error('Erro ao carregar a imagem principal aprovada:', error);
      heroImage.removeAttribute('src');
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
