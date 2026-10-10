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

// Hero do site: imagem atual do GOAT PRO Studio.
// O vídeo antigo foi removido; a imagem é reconstruída a partir de quatro
// partes de texto para manter o arquivo binário fora do HTML principal.
const heroImage = document.querySelector('.hero .media-frame img');
if (heroImage) {
  const heroParts = [
    '.hero-upload/part-00.txt',
    '.hero-upload/part-01.txt',
    '.hero-upload/part-02.txt',
    '.hero-upload/part-03.txt'
  ];

  Promise.all(heroParts.map(async (path) => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
    return (await response.text()).trim();
  }))
    .then((parts) => {
      heroImage.src = `data:image/webp;base64,${parts.join('')}`;
      heroImage.alt = 'Interface do GOAT PRO Studio com câmeras USB, IP, smartphone e câmera de astronomia';
    })
    .catch((error) => {
      console.warn('Não foi possível carregar a nova imagem principal do site.', error);
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
