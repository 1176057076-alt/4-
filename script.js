window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealEls.forEach((el) => observer.observe(el));

// Smooth anchor transition with subtle fade feedback
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    document.querySelector('.page-fade').style.opacity = '0.14';
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      document.querySelector('.page-fade').style.opacity = '0';
    }, 420);
  });
});
