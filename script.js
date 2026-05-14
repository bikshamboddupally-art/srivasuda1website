document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL ANIMATIONS (Intersection Observer)
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.style.animation = "fadeUp 1s forwards";
          // If you want the animation to trigger only once, you can unobserve
          // observer.unobserve(entry.target);
        }
      });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));

    // 2. STATS SECTION (Animated Counters)
    const counters = document.querySelectorAll('.counter');
    
    // We only want to animate the counters once they come into view
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                // Add a small delay or check if it already animated
                if(!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    let update = () => {
                      let target = +counter.getAttribute('data-target');
                      let count = +counter.innerText;
                      let speed = target / 100;
                  
                      if(count < target){
                        counter.innerText = Math.ceil(count + speed);
                        setTimeout(update, 20);
                      } else {
                        // For the + symbol (e.g. 1500+)
                        counter.innerText = target + "+";
                      }
                    }
                    update();
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Very simple inline display toggle for demo purposes
            const currentDisplay = window.getComputedStyle(navLinks).display;
            if (currentDisplay === 'none') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(255,255,255,0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                navCta.style.display = 'block';
                navCta.style.position = 'absolute';
                navCta.style.top = '70px';
                navCta.style.right = '20px';
                navCta.style.padding = '20px';
            } else {
                navLinks.style.display = 'none';
                navCta.style.display = 'none';
                // Remove inline styles to prevent bugs on resize
                setTimeout(() => {
                    navLinks.removeAttribute('style');
                    navCta.removeAttribute('style');
                }, 100);
            }
        });
    }

    // 4. NRI Services Toggle
    const nriDivision = document.getElementById('nri-division');
    const nriPanel = document.getElementById('nri-panel');
    const closePanelBtn = document.querySelector('.close-panel');

    if (nriDivision && nriPanel) {
        nriDivision.addEventListener('click', () => {
            if (!nriPanel.classList.contains('active')) {
                nriPanel.style.display = 'block';
                // Force reflow
                void nriPanel.offsetWidth;
                nriPanel.classList.add('active');
                
                // Smooth scroll to panel
                setTimeout(() => {
                    nriPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });

        if(closePanelBtn) {
            closePanelBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent triggering anything else
                nriPanel.style.animation = 'fadeOutDown 0.4s forwards';
                setTimeout(() => {
                    nriPanel.classList.remove('active');
                    nriPanel.style.animation = '';
                    nriPanel.style.display = 'none';
                }, 400);
            });
        }
    }

    // 5. Property Division Toggle
    const propertyDivision = document.getElementById('property-division');
    const propertyPanel = document.getElementById('property-panel');
    const propertyCloseBtn = document.querySelector('.property-close');

    if (propertyDivision && propertyPanel) {
        propertyDivision.addEventListener('click', () => {
            if (!propertyPanel.classList.contains('active')) {
                // If NRI panel is open, close it
                if (nriPanel && nriPanel.classList.contains('active')) {
                    nriPanel.classList.remove('active');
                    nriPanel.style.display = 'none';
                }

                propertyPanel.style.display = 'block';
                void propertyPanel.offsetWidth;
                propertyPanel.classList.add('active');
                
                setTimeout(() => {
                    propertyPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });

        if(propertyCloseBtn) {
            propertyCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                propertyPanel.style.animation = 'fadeOutDown 0.4s forwards';
                setTimeout(() => {
                    propertyPanel.classList.remove('active');
                    propertyPanel.style.animation = '';
                    propertyPanel.style.display = 'none';
                }, 400);
            });
        }
    }
});
