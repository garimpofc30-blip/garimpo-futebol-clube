// 1. MENU RESPONSIVO (MOBILE)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Fechar o menu mobile ao clicar em qualquer link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// 2. CONTAGEM REGRESSIVA DO PRÓXIMO JOGO
// Defina a data e hora do próximo jogo abaixo:
const dataJogo = new Date("Aug 15, 2026 15:30:00").getTime();

const timer = setInterval(() => {
  const agora = new Date().getTime();
  const distancia = dataJogo - agora;

  if (distancia < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerText = "JOGO EM ANDAMENTO OU FINALIZADO";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerText = 
    `Faltam: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);
