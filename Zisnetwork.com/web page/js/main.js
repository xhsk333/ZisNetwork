// smooth-scroll.js
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = header ? header.offsetHeight : 0;
    let lastScrollPosition = window.scrollY;
    let isScrolling = false;

    // Smooth scroll handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Immediately update active state
                navLinks.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                
                // Calculate scroll position
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.replaceState(null, null, targetId);
            }
        });
    });

    // Scroll handler with debounce
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentPosition = window.scrollY + headerHeight + 1;
                const scrollDirection = window.scrollY > lastScrollPosition ? 'down' : 'up';
                lastScrollPosition = window.scrollY;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${section.id}`) {
                                link.classList.add('active');
                                link.dataset.direction = scrollDirection;
                            }
                        });
                    }
                });
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Initial active state
    if (window.location.hash) {
        const initialActive = document.querySelector(`.nav-links a[href="${window.location.hash}"]`);
        if (initialActive) initialActive.classList.add('active');
    }
});

