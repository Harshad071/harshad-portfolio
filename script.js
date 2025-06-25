// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0, 0, 0, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(220, 38, 38, 0.2)"
    } else {
      navbar.style.background = "rgba(15, 15, 15, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }
})


// Fixed Typing Animation
const typingText = document.querySelector(".typing-text")
fullText = "Hi, I'm Harshad Jadhav"
let charIndex = 0
let isDeleting = false

function typeWriter() {
  if (!typingText) return

  if (isDeleting) {
    typingText.textContent = fullText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = fullText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 30 : 100

  if (!isDeleting && charIndex === fullText.length) {
    typeSpeed = 3000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    typeSpeed = 500
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000)
})

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseFloat(counter.getAttribute("data-target"))
    const increment = target / 10
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        if (target % 1 === 0) {
          counter.textContent = Math.ceil(current)
        } else {
          counter.textContent = current.toFixed(2)
        }
        setTimeout(updateCounter, 30)
      } else {
        if (target % 1 === 0) {
          counter.textContent = target
        } else {
          counter.textContent = target.toFixed(2)
        }
      }
    }

    updateCounter()
  })
}

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width
    }, index * 200)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Trigger specific animations
      if (entry.target.classList.contains("stats-grid")) {
        setTimeout(animateCounters, 300)
      }

      if (entry.target.classList.contains("skills-grid")) {
        setTimeout(animateSkillBars, 500)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(".stats-grid, .skills-grid")

  elementsToAnimate.forEach((el) => {
    observer.observe(el)
  })
})

// Active navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-12px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    if (hamburger && navMenu) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Page load optimizations
window.addEventListener("load", () => {
  // Remove loading states
  document.body.classList.remove("loading")

  // Initialize animations
  const elements = document.querySelectorAll("[data-aos]")
  elements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
  })
})

// Accessibility improvements
document.addEventListener("DOMContentLoaded", () => {
  // Add skip link for keyboard navigation
  const skipLink = document.createElement("a")
  skipLink.href = "#about"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
})
