// efeito de digitação no subtítulo
const frases = [
  "Desenvolvedor de Software",
  "Fundador da AuthBrasil",
  "Construo com agentes de IA",
  "Automação · APIs · n8n"
];
const subEl = document.getElementById("typed");
let fi = 0, ci = 0, apagando = false;

function tick() {
  const atual = frases[fi];
  if (!apagando) {
    ci++;
    subEl.textContent = atual.slice(0, ci);
    if (ci === atual.length) { apagando = true; setTimeout(tick, 1400); return; }
  } else {
    ci--;
    subEl.textContent = atual.slice(0, ci);
    if (ci === 0) { apagando = false; fi = (fi + 1) % frases.length; }
  }
  setTimeout(tick, apagando ? 35 : 65);
}
tick();

// nav: mostra ao rolar, scroll-spy
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("nav a[data-link]");
const sections = document.querySelectorAll("section[id]");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  nav.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
  backTop.classList.toggle("show", window.scrollY > 600);

  let atual = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) atual = s.id;
  });
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + atual));
});

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// efeito parallax leve no grid de fundo
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  document.querySelector(".grid-overlay").style.transform = `translate(${x}px, ${y}px)`;
});
