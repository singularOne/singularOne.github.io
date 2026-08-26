/**
 * Creative Maughan LLC - Main JavaScript
 * Simplified without form handling - only mailto link support
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', 
                navList.classList.contains('active'));
        });
        
        // Close menu on navigation click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    overlay.classList.remove('active');
                }
            });
        });
        
        // Close on outside click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                navList.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ============================================
    // PORTFOLIO FILTERS
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                portfolioItems.forEach(item => {
                    const categories = item.dataset.category.split(' ');
                    
                    if (filter === 'all' || 
                        categories.includes(filter)) {
                        item.style.display = '';
                        
                        item.classList.remove('fade-in');
                        void item.offsetWidth;
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        let totalSlides = Math.ceil(track.scrollWidth / track.clientWidth);
        
        for (let i = 1; i <= totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 1) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
        
        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        if (nextBtn && totalSlides > 1) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            });
        }
        
        if (prevBtn && totalSlides > 1) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalSlides - 1;
                }
                updateSlider();
            });
        }
        
        let autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
        
        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < totalSlides - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        });
    }
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const children = entry.target.querySelectorAll('.service-card, .portfolio-item, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                        child.style.opacity = '0';
                        requestAnimationFrame(() => {
                            child.style.transition = 'opacity 0.3s ease';
                            child.style.opacity = '1';
                        });
                    }, index * 50);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .info-item').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ACTIVE NAVIGATION LINK (on scroll)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.contact-btn)');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ============================================
    // LOAD MORE PORTFOLIO ITEMS
    // ============================================
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let isLoadingMore = false;
    
    if (loadMoreBtn && portfolioItems.length >= 8) {
        loadMoreBtn.addEventListener('click', function() {
            if (isLoadingMore) return;
            
            isLoadingMore = true;
            this.disabled = true;
            this.innerHTML = '<span class="spinner">Loading more...</span>';
            
            setTimeout(() => {
                const newItems = createPortfolioItem(9, 17);
                portfolioGrid.appendChild(newItems);
                
                applyActiveFilter();
                
                isLoadingMore = false;
                this.disabled = false;
                this.innerHTML = '';
            }, 1000);
        });
    }
    
    function createPortfolioItem(start, end) {
        const grid = document.querySelector('.portfolio-grid');
        let html = '';
        
        for (let i = start; i <= end; i++) {
            const categories = [
                ['web', 'branding'],
                ['marketing', 'graphics'],
                ['ui-ux', 'animation'],
                ['print', 'digital']
            ][(i % 4)];
            
            html += `
                <article class="portfolio-item" data-category="${categories.join(' ')}">
                    <div class="project-image" style="background: linear-gradient(135deg, ${getRandomGradient()}, ${getSecondaryGradient()})">
                        <span class="overlay">View Project →</span>
                    </div>
                    <div class="project-info">
                        <h3>Project #${i}</h3>
                        <p><span class="category-tag web">${categories[0]} Design</span></p>
                    </div>
                </article>
            `;
        }
        
        return document.createElement('div');
    }
    
    function applyActiveFilter() {
        const activeFilter = filterButtons.find(btn => btn.classList.contains('active'));
        if (activeFilter) {
            portfolioItems.forEach(item => {
                item.style.display = '';
                
                if (activeFilter.dataset.filter !== 'all') {
                    const categories = item.dataset.category.split(' ');
                    if (!categories.includes(activeFilter.dataset.filter)) {
                        item.style.display = 'none';
                    }
                }
            });
        }
    }
    
    // ============================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ============================================
    const heroShapes = document.querySelectorAll('.shape');
    
    if (heroShapes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function getRandomGradient() {
    const gradients = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

function getSecondaryGradient() {
    const pairs = [
        ['#667eea', '#764ba2'],
        ['#f093fb', '#f5576c'],
        ['#4facfe', '#00f2fe']
    ];
    return pairs[Math.floor(Math.random() * pairs.length)][1];
}

// Console welcome message
console.log('%c Creative Maughan LLC Website ', 'background: linear-gradient(135deg, #6366f1, #0ea5e9); color: white; padding: 15px; border-radius: 8px; font-size: 20px; font-weight: bold;');
console.log('%c Site loaded successfully! All mailto links are functional.', 'color: #6366f1; font-weight: bold;');
