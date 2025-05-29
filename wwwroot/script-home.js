// Função para toggle do menu mobile
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  if (mobileNav) {
    mobileNav.classList.toggle("active")
  }
}

// Fechar menu mobile ao clicar em um link
document.addEventListener("DOMContentLoaded", () => {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const mobileNav = document.getElementById("mobileNav")
      if (mobileNav) {
        mobileNav.classList.remove("active")
      }
    })
  })

  // Adicionar animações suaves aos cards
  const cards = document.querySelectorAll(".card")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Smooth scroll para links internos
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
