/**
 * BYB GENSET AUSTRAL - High-Performance Modern Vanilla App Engine
 * Ultra Fast, Zero-Dependency, Mobile-App Feel
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Gallery Data (All 9 Images from Imgens) ---
  const galleryItems = [
    {
      full: "assets/gallery/gallery_01_0abed4cb-7997-4606-b936-0aea99eb9607.webp",
      thumb: "assets/gallery/thumb_gallery_01_0abed4cb-7997-4606-b936-0aea99eb9607.webp",
      title: "Operación en Altura - Chiloé",
      subtitle: "Plataforma Elevadora en Faena"
    },
    {
      full: "assets/gallery/gallery_02_3e45cc72-0374-4722-a287-5f732d7c4372.webp",
      thumb: "assets/gallery/thumb_gallery_02_3e45cc72-0374-4722-a287-5f732d7c4372.webp",
      title: "Plataforma Articulada en Terreno",
      subtitle: "Alcance y Precisión Superior"
    },
    {
      full: "assets/gallery/gallery_03_564cf5e6-d73f-4847-b4b2-4ea0df59817f.webp",
      thumb: "assets/gallery/thumb_gallery_03_564cf5e6-d73f-4847-b4b2-4ea0df59817f.webp",
      title: "Trabajos Industriales Seguros",
      subtitle: "Máxima Estabilidad Certificada"
    },
    {
      full: "assets/gallery/gallery_04_articulado_12_metros_4x4_electricos_y_diesel.webp",
      thumb: "assets/gallery/thumb_gallery_04_articulado_12_metros_4x4_electricos_y_diesel.webp",
      title: "Articulado 12 Metros 4x4",
      subtitle: "Eléctrico y Diésel Todo Terreno"
    },
    {
      full: "assets/gallery/gallery_05_articulados_4x4_diesel_18_metros.webp",
      thumb: "assets/gallery/thumb_gallery_05_articulados_4x4_diesel_18_metros.webp",
      title: "Articulados 4x4 Diésel 18 Metros",
      subtitle: "Gran Altura y Capacidad de Carga"
    },
    {
      full: "assets/gallery/gallery_06_bc1fc172-8c2a-4465-8c49-76f1e163a082.webp",
      thumb: "assets/gallery/thumb_gallery_06_bc1fc172-8c2a-4465-8c49-76f1e163a082.webp",
      title: "Maniobrabilidad y Alcance",
      subtitle: "Operaciones en Espacios Reducidos"
    },
    {
      full: "assets/gallery/gallery_07_cf40dfae-e092-46c7-92f4-8090aca424d7.webp",
      thumb: "assets/gallery/thumb_gallery_07_cf40dfae-e092-46c7-92f4-8090aca424d7.webp",
      title: "Flota BYB Genset Austral",
      subtitle: "Equipos de Última Generación"
    },
    {
      full: "assets/gallery/gallery_08_f084ba38-6d11-4c1e-a264-305694490a4f.webp",
      thumb: "assets/gallery/thumb_gallery_08_f084ba38-6d11-4c1e-a264-305694490a4f.webp",
      title: "Mantenimiento y Montaje",
      subtitle: "Soluciones Confiables en Altura"
    },
    {
      full: "assets/gallery/gallery_09_f6607040-7bd8-4694-a186-5ace799e041a.webp",
      thumb: "assets/gallery/thumb_gallery_09_f6607040-7bd8-4694-a186-5ace799e041a.webp",
      title: "Equipamiento Certificado",
      subtitle: "Disponibilidad Inmediata en Ancud"
    }
  ];

  // --- 2. Interactive Lightbox ---
  let currentImageIdx = 0;
  const lightbox = document.getElementById('lightboxModal');
  const lbImg = document.getElementById('lightboxImage');
  const lbCounter = document.getElementById('lightboxCounter');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbWhatsAppBtn = document.getElementById('lightboxWhatsAppBtn');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    currentImageIdx = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = galleryItems[currentImageIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.full;
      lbImg.alt = item.title;
      lbCounter.textContent = `${currentImageIdx + 1} / ${galleryItems.length}`;
      lbTitle.textContent = item.title;
      const msg = encodeURIComponent(`Hola BYB Genset Austral, deseo cotizar el equipo: ${item.title}`);
      lbWhatsAppBtn.href = `https://wa.me/56983206510?text=${msg}`;
      lbImg.style.opacity = '1';
    }, 150);
  }

  function prevImage() {
    currentImageIdx = (currentImageIdx - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  }

  function nextImage() {
    currentImageIdx = (currentImageIdx + 1) % galleryItems.length;
    updateLightbox();
  }

  // Bind Gallery Clicks
  document.querySelectorAll('.gallery-item-bento').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index, 10);
      openLightbox(idx);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', prevImage);
  if (lbNext) lbNext.addEventListener('click', nextImage);

  // Close when clicking outside image
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-viewport')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // Touch Swipe for Lightbox on Mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 45) prevImage(); // swipe right
      else if (diffX < -45) nextImage(); // swipe left
    } else {
      if (diffY > 80) closeLightbox(); // swipe down to dismiss
    }
  }

  // --- 3. Mobile Drawer Controls ---
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('appDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('active')) closeDrawer();
    else openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // --- 4. Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 5. Interactive FAQs Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const headerEl = item.querySelector('.faq-header');
    const bodyEl = item.querySelector('.faq-body');

    headerEl.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        bodyEl.style.maxHeight = null;
      } else {
        item.classList.add('open');
        bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstBody = faqItems[0].querySelector('.faq-body');
    faqItems[0].classList.add('open');
    firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // --- 6. Active Navigation Tracking via IntersectionObserver ---
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const bottomTabs = document.querySelectorAll('.mobile-bottom-bar .bottom-tab');
  const sections = document.querySelectorAll('section[id], div[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        bottomTabs.forEach(tab => {
          if (tab.getAttribute('data-target') === id) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));

  // --- 7. Toast Notification Utility ---
  function showToast(message) {
    let toast = document.querySelector('.app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // --- 8. Contact Form Direct WhatsApp / Email Action ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = contactForm.elements['name'] ? contactForm.elements['name'].value.trim() : '';
      const empresa = contactForm.elements['empresa'] ? contactForm.elements['empresa'].value.trim() : '';
      const whatsapp = contactForm.elements['whatsapp'] ? contactForm.elements['whatsapp'].value.trim() : '';
      const email = contactForm.elements['email'] ? contactForm.elements['email'].value.trim() : '';
      const asunto = contactForm.elements['asunto'] ? contactForm.elements['asunto'].value.trim() : '';
      const mensaje = contactForm.elements['message'] ? contactForm.elements['message'].value.trim() : '';

      const text = `*Nueva Cotización - BYB Genset Austral*%0A%0A` +
        `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
        `🏢 *Empresa:* ${encodeURIComponent(empresa)}%0A` +
        `📱 *WhatsApp:* ${encodeURIComponent(whatsapp)}%0A` +
        `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
        `📌 *Asunto:* ${encodeURIComponent(asunto)}%0A` +
        `📝 *Detalle:* ${encodeURIComponent(mensaje)}`;

      showToast('¡Cotización enviada con éxito! Redirigiendo a WhatsApp...');
      setTimeout(() => {
        window.open(`https://wa.me/56983206510?text=${text}`, '_blank');
      }, 700);
    });
  }

  // --- 9. Progressive Web App (PWA) Offline Service Worker ---
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
