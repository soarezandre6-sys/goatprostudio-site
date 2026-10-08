document.getElementById('year').textContent = new Date().getFullYear();

const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
  checkoutButton.addEventListener('click', (event) => {
    if (checkoutButton.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'click_comprar', {
        send_to: 'G-T20WCMY2DG',
        link_url: checkoutButton.href,
        link_text: checkoutButton.textContent.trim(),
        checkout_provider: 'Kiwify'
      });
    }
  });
}

const heroImage = document.querySelector('.hero .media-frame img[src="assets/goatpro-hero-live-v3.webp"]');
if (heroImage) {
  const heroVideo = document.createElement('video');
  heroVideo.className = 'hero-presentation-video';
  heroVideo.controls = true;
  heroVideo.preload = 'metadata';
  heroVideo.playsInline = true;
  heroVideo.src = 'assets/GOAT_PRO_Studio_Apresentacao_FullHD_WEB.mp4';
  heroVideo.setAttribute('aria-label', 'Vídeo de apresentação do GOAT PRO Studio');
  heroVideo.style.display = 'block';
  heroVideo.style.width = '100%';
  heroVideo.style.aspectRatio = '16 / 9';
  heroVideo.style.borderRadius = '15px';
  heroVideo.style.background = '#05070b';
  heroImage.replaceWith(heroVideo);
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