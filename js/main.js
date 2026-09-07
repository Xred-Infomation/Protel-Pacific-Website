document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
  const slides = document.querySelectorAll(".slide-item");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    function showSlide(index) {
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }
    function startAutoSlide() {
      stopAutoSlide();
      slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }
    function stopAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
    }
    if (prevBtn) prevBtn.addEventListener("click", () => { showSlide(currentSlide - 1); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { showSlide(currentSlide + 1); startAutoSlide(); });
    dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); startAutoSlide(); }));
    const sliderContainer = document.querySelector(".hero-slider");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoSlide);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }
    startAutoSlide();
  }
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll("[data-category]");
  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetCat = btn.getAttribute("data-filter");
        filterItems.forEach(item => {
          const itemCat = item.getAttribute("data-category");
          if (targetCat === "all" || itemCat === targetCat || itemCat.split(" ").includes(targetCat)) {
            item.style.display = "";
            item.style.opacity = "0";
            setTimeout(() => { item.style.transition = "opacity 0.3s ease"; item.style.opacity = "1"; }, 50);
          } else { item.style.display = "none"; }
        });
      });
    });
  }
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (triggers.length > 0 && lightboxModal && lightboxImg) {
    triggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const imgSrc = trigger.getAttribute("href") || trigger.getAttribute("data-src") || trigger.querySelector("img")?.src;
        const caption = trigger.getAttribute("data-title") || trigger.querySelector("img")?.alt || "";
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          if (lightboxCaption) lightboxCaption.textContent = caption;
          lightboxModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });
    function closeLightbox() {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    }
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightboxModal.addEventListener("click", (e) => { if (e.target === lightboxModal) closeLightbox(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lightboxModal.classList.contains("active")) closeLightbox(); });
  }
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value.trim();
      const email = contactForm.querySelector('[name="email"]')?.value.trim();
      const message = contactForm.querySelector('[name="message"]')?.value.trim();
      if (!name || !email || !message) { alert("Please fill in all required fields (Name, Email, Message)."); return; }
      const subjectSelect = contactForm.querySelector('[name="subject"]');
      const subject = subjectSelect?.options[subjectSelect.selectedIndex]?.text || "Website Inquiry";
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = "mailto:Sales@protel-pacific.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
});