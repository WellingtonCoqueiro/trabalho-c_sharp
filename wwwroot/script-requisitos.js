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

  // Adicionar animações suaves aos cards de requisitos
  const requirementCards = document.querySelectorAll(".requirement-card")
  const impedimentItems = document.querySelectorAll(".impediment-item")

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

  // Animar cards de requisitos
  requirementCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Animar itens de impedimentos
  impedimentItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-20px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(item)
  })

  // Animar alerts
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => {
    alert.style.opacity = "0"
    alert.style.transform = "scale(0.95)"
    alert.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(alert)
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
