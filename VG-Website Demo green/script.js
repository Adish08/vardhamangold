// Vardhaman Gold - B2B Agro-Manufacturing Website Interactions

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. SCROLL NAVBAR EFFECTS
  ----------------------------------------------- */
  const headerNav = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  });

  /* -----------------------------------------------
     2. MOBILE NAVIGATION DRAWER
  ----------------------------------------------- */
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      headerNav.classList.toggle('mobile-open');
    });
  }

  // Close mobile drawer when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('mobile-open');
    });
  });

  /* -----------------------------------------------
     3. INTERSECTION OBSERVER FOR MOTION_INTENSITY: 4
  ----------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once triggered to lock layout state
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Bind animation classes
  document.querySelectorAll('.fade-in-up, .stagger-parent').forEach(el => {
    animationObserver.observe(el);
  });

  /* -----------------------------------------------
     4. PRODUCT CATALOGUE CATEGORY FILTERING
  ----------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const catalogGroups = document.querySelectorAll('.catalog-group');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle Active Button Styling
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Toggle visibility of catalog category groups and cards
        catalogGroups.forEach(group => {
          if (filterValue === 'all') {
            group.style.display = 'block';
            productCards.forEach(card => card.style.display = 'flex');
          } else if (filterValue === 'oil') {
            if (group.id === 'oil-group') {
              group.style.display = 'block';
              productCards.forEach(card => {
                if (card.getAttribute('data-category') === 'oil') {
                  card.style.display = 'flex';
                } else {
                  card.style.display = 'none';
                }
              });
            } else {
              group.style.display = 'none';
            }
          } else if (filterValue === 'pulses') {
            if (group.id === 'pulses-group') {
              group.style.display = 'block';
              productCards.forEach(card => {
                if (card.getAttribute('data-category') === 'pulses') {
                  card.style.display = 'flex';
                } else {
                  card.style.display = 'none';
                }
              });
            } else {
              group.style.display = 'none';
            }
          }
        });
      });
    });
  }

  /* -----------------------------------------------
     5. B2B INQUIRY DROP-DOWN PRE-POPULATION
  ----------------------------------------------- */
  const productSelect = document.querySelector('#productInterest');
  if (productSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProduct = urlParams.get('product');
    
    if (selectedProduct) {
      // Direct options map matching dropdown values
      const validOptions = ['oil_15l', 'oil_5l', 'oil_1l', 'urad_whole', 'urad_chilka', 'urad_mogar'];
      
      if (validOptions.includes(selectedProduct)) {
        productSelect.value = selectedProduct;
      } else if (selectedProduct === 'peanut_oil') {
        productSelect.value = 'oil_15l'; // Default to bulk tin
      } else if (selectedProduct === 'urad_dal') {
        productSelect.value = 'urad_whole'; // Default to whole grains
      }
    }
  }

  /* -----------------------------------------------
     6. INTERACTIVE MAP DISTRICT CLICK SYSTEM
  ----------------------------------------------- */
  const districts = document.querySelectorAll('.map-district');
  const mapTitle = document.querySelector('#mapCardTitle');
  const mapDesc = document.querySelector('#mapCardDesc');

  if (districts.length > 0 && mapTitle && mapDesc) {
    const districtData = {
      neemuch: {
        title: 'Vardhaman Gold Processing Unit',
        desc: 'Plot No. 42-45, Phase-2, Industrial Area, Neemuch. Direct factory dispatch center.',
        color: 'var(--clr-secondary)'
      },
      mandsaur: {
        title: 'Mandsaur Regional Dealership',
        desc: 'Supplying 120+ retail partners. Next-day bulk dispatch routes active.',
        color: 'var(--clr-primary)'
      },
      ratlam: {
        title: 'Ratlam Wholesale Logistics Center',
        desc: 'Super-stockist node servicing local distributors and spice manufacturers.',
        color: 'var(--clr-primary)'
      },
      rajasthan: {
        title: 'Rajasthan Border Supply (Chittorgarh / Pratapgarh)',
        desc: 'Active expansion routes. Open for super-stockist dealership applications.',
        color: 'var(--clr-accent)'
      }
    };

    districts.forEach(district => {
      district.addEventListener('click', () => {
        const dKey = district.getAttribute('data-district');
        const data = districtData[dKey];

        if (data) {
          // Reset highlights
          districts.forEach(d => {
            d.style.backgroundColor = 'hsla(150, 24%, 18%, 0.08)';
            d.style.color = 'var(--clr-secondary)';
            d.style.borderColor = 'hsla(150, 24%, 18%, 0.2)';
            d.style.fontWeight = '400';
          });

          // Highlight selected
          district.style.backgroundColor = data.color;
          district.style.color = 'var(--clr-bg-cream)';
          district.style.borderColor = 'var(--clr-primary)';
          district.style.fontWeight = '700';

          // Update Info Card
          mapTitle.textContent = data.title;
          mapDesc.textContent = data.desc;

          // Reposition Pin based on active district
          const mapPin = document.querySelector('.map-pin');
          if (mapPin) {
            if (dKey === 'neemuch') { mapPin.style.top = '40%'; mapPin.style.left = '48%'; }
            else if (dKey === 'mandsaur') { mapPin.style.top = '60%'; mapPin.style.left = '65%'; }
            else if (dKey === 'ratlam') { mapPin.style.top = '75%'; mapPin.style.left = '40%'; }
            else if (dKey === 'rajasthan') { mapPin.style.top = '15%'; mapPin.style.left = '25%'; }
          }
        }
      });
    });
  }

  /* -----------------------------------------------
     7. FORM INQUIRY SUBMISSION (MOCK ACTION)
  ----------------------------------------------- */
  const inquiryForm = document.querySelector('#bulkInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const bName = document.querySelector('#businessName').value;
      const cName = document.querySelector('#contactName').value;
      const cPhone = document.querySelector('#contactPhone').value;
      const pInterest = document.querySelector('#productInterest').value;
      const volume = document.querySelector('#estVolume').value;
      
      // Build WhatsApp message text from form details
      const productLabels = {
        oil_15l: 'Peanut Oil (15L Tin)',
        oil_5l: 'Peanut Oil (5L Can)',
        oil_1l: 'Peanut Oil (1L Bottle)',
        urad_whole: 'Urad Sabut (Whole)',
        urad_chilka: 'Urad Chilka (Split)',
        urad_mogar: 'Urad Mogar (Polished)'
      };
      
      const volLabels = {
        trial: 'Trial < 1 Ton',
        small: '1-5 Tons',
        medium: '5-15 Tons',
        large: '15+ Tons'
      };

      const waMessage = `Hello Vardhaman Gold, I would like to inquire about wholesale prices.\n\n*Business:* ${bName}\n*Contact:* ${cName}\n*Phone:* ${cPhone}\n*Product:* ${productLabels[pInterest] || pInterest}\n*Est. Volume:* ${volLabels[volume] || volume}`;
      const encodedMsg = encodeURIComponent(waMessage);
      
      // Simulate success and redirect option
      alert(`Wholesale request submitted successfully!\n\nBusiness: ${bName}\nRepresentative: ${cName}\n\nWe will now open WhatsApp to connect you with our Neemuch sales desk.`);
      
      window.open(`https://wa.me/919999999999?text=${encodedMsg}`, '_blank');
      inquiryForm.reset();
    });
  }

});
