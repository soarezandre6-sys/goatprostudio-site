document.getElementById('year').textContent = new Date().getFullYear();

const checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', (event) => {
  if (checkoutButton.getAttribute('aria-disabled') === 'true') event.preventDefault();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));