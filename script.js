/**
 * ================================================================
 * CRAVE HOUSE - INTERACTIVE SCRIPT
 * ================================================================
 * This file manages the dynamics, filter animations, sliders,
 * scroll reveals, and direct WhatsApp integrations.
 * ================================================================
 */

// 1. CONFIGURATION
// Update these values to configure all direct ordering, social, and logo links instantly.
const CRAVE_HOUSE_CONFIG = {
    // Enter your WhatsApp phone number with country code, without any spaces or symbols (e.g. "919876543210")
    whatsappNumber: "917286827925", 
    
    // Delivery platform links
    swiggyUrl: "https://www.swiggy.com/menu/1378857?source=sharing",
    zomatoUrl: "https://zomato.onelink.me/xqzv/i2ib7bkk",
    
    // Social media links
    instagramUrl: "https://www.instagram.com/cravehouse.kitchen?igsh=MXRsNnI3YjdjZzRodw==",
    emailAddress: "hello@cravehouse.com",
    
    // Logo configurations
    // Specify the local logo image paths below (or leave empty "" to fallback to typographic logo).
    logoFullSrc: "assets/images/logo_full.png",
    logoIconSrc: "assets/images/logo_icon.png"
};

// Initialize elements once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Theme Toggle state first
    initThemeToggle();
    
    // Apply configuration inputs to DOM elements
    applyConfigurations();
    
    // Setup Navigation Scroll Behaviors
    initNavbarScroll();
    
    // Setup Mobile Navigation Drawer
    initMobileNav();
    
    // Setup Intersection Observer for Scroll Reveals
    initScrollReveal();
    
    // Setup Category Menu Filtering
    initMenuFilter();
    
    // Setup Reviews Slider
    initReviewsSlider();
    
    // Setup Contact Form Response
    initContactForm();
    
    // Setup WhatsApp Order Buttons on Menu Cards
    initWhatsAppOrderButtons();
    
    // Render Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

/**
 * Applies the central configuration object values to all relevant links
 * and visual components across the page automatically.
 */
function applyConfigurations() {
    // 1. Handle Logo Display
    const desktopLogo = document.getElementById("logo-desktop");
    const mobileLogo = document.getElementById("logo-mobile");
    const footerLogo = document.getElementById("footer-logo-image");
    const logoTextElements = document.querySelectorAll("#logo-text, #footer-logo-text");
    
    const hasFullLogo = CRAVE_HOUSE_CONFIG.logoFullSrc && CRAVE_HOUSE_CONFIG.logoFullSrc.trim() !== "";
    const hasIconLogo = CRAVE_HOUSE_CONFIG.logoIconSrc && CRAVE_HOUSE_CONFIG.logoIconSrc.trim() !== "";
    
    if (hasFullLogo) {
        if (desktopLogo) {
            desktopLogo.src = CRAVE_HOUSE_CONFIG.logoFullSrc;
            // Do NOT set inline display — let CSS classes (.logo-desktop/.logo-mobile) and
            // media queries handle visibility so mobile shows the icon logo correctly.
        }
        if (footerLogo) {
            footerLogo.src = CRAVE_HOUSE_CONFIG.logoFullSrc;
            footerLogo.style.display = "block";
            const footerText = document.getElementById("footer-logo-text");
            if (footerText) footerText.style.display = "none";
        }
        const desktopText = document.getElementById("logo-text");
        if (desktopText) desktopText.style.display = "none";
    }
    
    if (hasIconLogo) {
        if (mobileLogo) {
            mobileLogo.src = CRAVE_HOUSE_CONFIG.logoIconSrc;
            // Do NOT set inline display — CSS media query handles showing on mobile.
        }
    }
    
    if (!hasFullLogo && !hasIconLogo) {
        // Show text fallbacks if no image config exists
        logoTextElements.forEach(text => {
            text.style.display = "block";
        });
        if (desktopLogo) desktopLogo.style.display = "none";
        if (mobileLogo) mobileLogo.style.display = "none";
        if (footerLogo) footerLogo.style.display = "none";
    }

    // 2. Bind WhatsApp links
    const whatsappBaseText = encodeURIComponent("Hi Crave House 👋 I have a question about your menu!");
    const floatingWhatsapp = document.getElementById("floating-whatsapp");
    if (floatingWhatsapp) {
        floatingWhatsapp.href = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}?text=${whatsappBaseText}`;
    }

    const heroWhatsapp = document.getElementById("hero-whatsapp-cta");
    if (heroWhatsapp) {
        const heroWhatsappText = encodeURIComponent("Hi Crave House 👋 I'd like to view your menu and place an order!");
        heroWhatsapp.href = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}?text=${heroWhatsappText}`;
    }

    const platformWhatsapp = document.getElementById("platform-whatsapp-link");
    if (platformWhatsapp) {
        const directOrderText = encodeURIComponent("Hi Crave House 👋 I'd like to order some desserts directly!");
        platformWhatsapp.href = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}?text=${directOrderText}`;
    }

    const contactWhatsapp = document.getElementById("contact-whatsapp-text");
    if (contactWhatsapp) {
        contactWhatsapp.href = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}`;
        contactWhatsapp.textContent = `+${CRAVE_HOUSE_CONFIG.whatsappNumber.slice(0,2)} ${CRAVE_HOUSE_CONFIG.whatsappNumber.slice(2,7)} ${CRAVE_HOUSE_CONFIG.whatsappNumber.slice(7)}`;
    }

    const whatsappFooterElements = ["footer-social-whatsapp", "footer-whatsapp-link"];
    whatsappFooterElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}`;
        }
    });

    // 3. Bind Swiggy & Zomato links
    const swiggyElements = document.querySelectorAll("#hero-swiggy-cta, #platform-swiggy-link, #footer-swiggy-link");
    swiggyElements.forEach(el => {
        el.href = CRAVE_HOUSE_CONFIG.swiggyUrl;
    });

    const zomatoElements = document.querySelectorAll("#hero-zomato-cta, #platform-zomato-link, #footer-zomato-link");
    zomatoElements.forEach(el => {
        el.href = CRAVE_HOUSE_CONFIG.zomatoUrl;
    });

    // 4. Bind Instagram & Email
    const instagramElements = ["instagram-cta-btn", "contact-instagram-text", "footer-social-instagram", "footer-ordering-instagram"];
    instagramElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = CRAVE_HOUSE_CONFIG.instagramUrl;
            if (id === "contact-instagram-text") {
                const handleWithQuery = CRAVE_HOUSE_CONFIG.instagramUrl.split("/").filter(Boolean).pop() || "cravehouse.kitchen";
                const handle = handleWithQuery.split("?")[0];
                const icon = el.querySelector("i, svg");
                if (icon) {
                    el.innerHTML = "";
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(` @${handle}`));
                } else {
                    el.textContent = `@${handle}`;
                }
            }
        }
    });

    const emailElements = ["contact-email-text", "footer-social-email"];
    emailElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = `mailto:${CRAVE_HOUSE_CONFIG.emailAddress}`;
            if (id === "contact-email-text") {
                el.textContent = CRAVE_HOUSE_CONFIG.emailAddress;
            }
        }
    });
}

/**
 * Handles the Sticky Header scroll transitions.
 * Appends a glassmorphic background blur class when page is scrolled down.
 */
function initNavbarScroll() {
    const header = document.getElementById("header");
    let isScrolled = false;

    const checkScroll = () => {
        if (window.scrollY > 50) {
            if (!isScrolled) {
                header.classList.add("scrolled");
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                header.classList.remove("scrolled");
                isScrolled = false;
            }
        }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll(); // Initial check
}

/**
 * Mobile Hamburger Menu toggle controls
 */
function initMobileNav() {
    const burgerMenu = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        burgerMenu.classList.toggle("active");
        navMenu.classList.toggle("active");
    };

    const closeMenu = () => {
        burgerMenu.classList.remove("active");
        navMenu.classList.remove("active");
    };

    burgerMenu.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            closeMenu();
            
            // Manage Active Class
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Close menu when clicking outside of it on mobile
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target) && navMenu.classList.contains("active")) {
            closeMenu();
        }
    });
}

/**
 * Intersection Observer triggers smooth cinematic fade-ins and slide reveals
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    
    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15 // Triggers when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Unobserve after animating once
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }
}

/**
 * Handles category menu filtering with smooth CSS animations
 */
function initMenuFilter() {
    const filterButtons = document.querySelectorAll(".menu-filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active states
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            menuCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    // Show item
                    card.classList.remove("hide");
                    // Wait a frame to trigger transition
                    setTimeout(() => {
                        card.classList.add("show");
                    }, 20);
                } else {
                    // Hide item
                    card.classList.remove("show");
                    card.classList.add("hide");
                }
            });
        });
    });
}

/**
 * Testimonial Slider / Carousel behavior
 */
function initReviewsSlider() {
    const slides = document.querySelectorAll(".review-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideTimer;

    if (slideCount === 0) return;

    const showSlide = (index) => {
        // Ensure index is within boundaries
        if (index >= slideCount) currentSlide = 0;
        else if (index < 0) currentSlide = slideCount - 1;
        else currentSlide = index;

        // Transition slide active states
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        // Transition dots states
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Reset the auto rotation timer
        startAutoSlide();
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    const startAutoSlide = () => {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 6000); // Rotate slide every 6 seconds
    };

    // Button Click Controls
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    // Dot Click Controls
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"), 10);
            showSlide(index);
        });
    });

    // Start auto slide
    startAutoSlide();
}

/**
 * Frontend Contact Form Handler - Intercepts submits, showcases a premium
 * glass loading response state and simulates successful delivery.
 */
function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formSubmitBtn = document.getElementById("form-submit-btn");
    const formStatus = document.getElementById("form-status");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Premium Loading Button Effect
        const originalText = formSubmitBtn.innerHTML;
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<span class="loading-spinner"></span> Sending...`;
        formSubmitBtn.style.opacity = "0.7";

        // Add loading spinner animation dynamically if not present
        if (!document.getElementById("spinner-styles")) {
            const style = document.createElement("style");
            style.id = "spinner-styles";
            style.innerHTML = `
                .loading-spinner {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #FFFFFF;
                    animation: spin 1s ease-in-out infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Simulate API network latency
        setTimeout(() => {
            // Restore button
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = originalText;
            formSubmitBtn.style.opacity = "1";

            // Show Success Notification
            formStatus.classList.add("success");
            formStatus.style.display = "block";

            // Reset Fields
            contactForm.reset();

            // Hide status badge after 5 seconds
            setTimeout(() => {
                formStatus.style.display = "none";
                formStatus.classList.remove("success");
            }, 5000);
        }, 1500);
    });
}

/**
 * Adds WhatsApp message prefilling handlers to all menu card buttons.
 * When clicked, it prompts the customer to fill out details:
 * 
 * Hi Crave House 👋
 * 
 * I want to order:
 * 
 * Item: [Item Name]
 * Quantity: 1
 * Name: 
 * Delivery Address: 
 */
function initWhatsAppOrderButtons() {
    const orderButtons = document.querySelectorAll(".order-whatsapp-btn");

    orderButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const itemName = btn.getAttribute("data-item-name");
            
            // Construct the template message
            const message = `Hi Crave House 👋\n\nI want to order:\n\nItem: ${itemName}\nQuantity: 1\nName:\nDelivery Address:`;
            const encodedMessage = encodeURIComponent(message);
            
            // Final WhatsApp URL
            const url = `https://wa.me/${CRAVE_HOUSE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
            
            // Open in new tab
            window.open(url, "_blank");
        });
    });
}

/**
 * Setup Light/Dark Mode theme toggle with localStorage persistence
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    // Check for saved theme preference, otherwise default to dark mode
    const currentTheme = localStorage.getItem("theme") || "dark";
    
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        
        const isLight = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}
