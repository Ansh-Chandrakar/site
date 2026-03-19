document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GLOBAL VARIABLES & MOUSE TRACKING
    // ==========================================
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Mouse tracking for desktop
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ==========================================
    // 2. PRECISION CUSTOM CURSOR
    // ==========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let ringX = mouseX;
    let ringY = mouseY;

    function animateCursor() {
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
        
        if (cursorRing) {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(animateCursor);
    }
    // Only run custom cursor on non-touch devices to save performance on mobile
    if (window.matchMedia("(pointer: fine)").matches) {
        animateCursor();
    } else {
        if(cursorDot) cursorDot.style.display = 'none';
        if(cursorRing) cursorRing.style.display = 'none';
    }

    const myPhotos = [
        "https://lh3.googleusercontent.com/d/1GW3uOgX9sZPe2HIpeae9QNxNMrsAlWEl",
        "https://lh3.googleusercontent.com/d/1MLzKg4dok6jW92WDPFaxAeQBWXzBzXxL",
        "https://lh3.googleusercontent.com/d/1PxEkLPGx0owXEj2uaDtXa1ip6kzsRRUT",
        "https://lh3.googleusercontent.com/d/17L8fliQzbWhi7NQYN7UwbxK2s4nBsS9P",
        "https://lh3.googleusercontent.com/d/1rTB4YmP6Ml4zFxVPDEPWVC7Iq6PoS6ic",
        "https://lh3.googleusercontent.com/d/12Z_8RHQxefj0ECpsUVa8jrAgzlUrBu3V",
        "https://lh3.googleusercontent.com/d/1S5mCSAb3KrFoyy8kF7rbRnKW9Y7ZYTMt",
        "https://lh3.googleusercontent.com/d/1KAuygadH2b_JsE4xOD6axzgdRGTdJKrt",
        "https://lh3.googleusercontent.com/d/1VfU6KtWhY6z56_0Gkd_OSFO8C_XdAY1Z",
        "https://lh3.googleusercontent.com/d/1DGVWi5kQfxhpmEcWQER5jW5ltfFWw0Zc",
        "https://lh3.googleusercontent.com/d/1X5QxGyL62PzgNiYKZZR4_dVESUS-YznW",
        "https://lh3.googleusercontent.com/d/1g_khY9IpNAchR2LjJPl0hEXBcdzmA1L7",
        "https://lh3.googleusercontent.com/d/1GRiTzu6FJdpykjTHU9kf7yLTaSFG9_mH",
        "https://lh3.googleusercontent.com/d/1FIJoewVKor8zFwPPnZSGQ1t6e5_PcUe3",
        "https://lh3.googleusercontent.com/d/1PMBah_Ub_dIXmCjzzvhp-jZ63dqLYzT8",
        "https://lh3.googleusercontent.com/d/1hNuXjxAw3xlUd9ESy8ZUyL5QPOTJ_YAy",
        "https://lh3.googleusercontent.com/d/1uE3mLC6UmIvwWPBPxYusg3arnHAU9fiI",
        "https://lh3.googleusercontent.com/d/1HVvHOtKU5UfI5OTSabOVO8IIX-ZwMBMU",
        "https://lh3.googleusercontent.com/d/1pRO3pe-ckyFFI_ngv-xRhacqm_5dS9mK",
        "https://lh3.googleusercontent.com/d/1GAvpXN-9Jh1HKP7Qv1algpSNyUjz9f4Y",
        "https://lh3.googleusercontent.com/d/1H9KEqwQnb_K6zoDjU_5G4YhAADSwZDZs",
        "https://lh3.googleusercontent.com/d/1946XtUX_43JQ0-lxGXrFDmqe03FlVGYd",
        "https://lh3.googleusercontent.com/d/1T30S6z48by64Mg2fG5I3TBlSxQA2trXZ",
        "https://lh3.googleusercontent.com/d/1NM0MieVCDaRPDthDEHFwNWBYcSZbUsQ2",
        "https://lh3.googleusercontent.com/d/16ME5Vm163rMctOy96ovg4Ka15AwqtMTO",
        "https://lh3.googleusercontent.com/d/1CleAyny8BEuh6S_hS9Whpn46WpYzWwmZ",
        "https://lh3.googleusercontent.com/d/1Lzqq4DFuCpuXsg0h4nw6KoZQIieWeRtB",
        "https://lh3.googleusercontent.com/d/1xi-l7iqJvws8XiTsOZZUj_sTdjPphgyy",
        "https://lh3.googleusercontent.com/d/1FkK3NrkMoK7g5b6YqtGKEF6YGSd_OFNI",
        "https://lh3.googleusercontent.com/d/1mANyhqQqEJQrgzI6cTjkitzU1fbbZX5j",
        "https://lh3.googleusercontent.com/d/1UBD2pSWUWn7UcN-Jchs3bxbP8JfeSwux",
        "https://lh3.googleusercontent.com/d/1PjJllfCMOzIKWuC9iLUiRr9F3mcd6g_w"
        // ... update all 32 links to this format
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadRandomGallery() {
        const galleryGrid = document.getElementById('photo-gallery-grid');
        if (!galleryGrid) return; 

        const randomizedPhotos = shuffleArray([...myPhotos]);
        galleryGrid.innerHTML = '';

        randomizedPhotos.forEach((photoSrc) => {
            const div = document.createElement('div');
            div.className = 'photo-item';

            const img = document.createElement('img');
            img.src = photoSrc;
            img.alt = "Ansh Chandrakar Gallery Photo";
            img.loading = "lazy"; 

            div.appendChild(img);
            galleryGrid.appendChild(div);
        });
    }

    // Call it immediately so the gallery is ready
    loadRandomGallery();

    // ==========================================
    // 3. SPA NAVIGATION & ROUTING
    // ==========================================
    const pages = document.querySelectorAll('.page-view');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links a, .logo');

    function switchPage(targetId) {
        pages.forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active-link'));

        window.scrollTo(0, 0);

        const targetPage = document.getElementById(targetId);
        if (targetPage) targetPage.classList.add('active');
        
        if (targetId === 'home') {
            mainNav.classList.add('hidden-nav');
            mainNav.classList.remove('visible');
        } else {
            mainNav.classList.remove('hidden-nav');
            mainNav.classList.add('visible');
            const activeLink = document.querySelector(`.nav-links a[data-target="${targetId}"]`);
            if (activeLink) activeLink.classList.add('active-link');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('data-target');
            if (targetId) switchPage(targetId);
        });
    });

    // ==========================================
    // 4. SCROLL & SWIPE TO ADVANCE LOGIC
    // ==========================================
    const pageOrder = ['home', 'about', 'work', 'gallery', 'contact'];
    let overscrollDown = 0;
    let overscrollUp = 0;
    const overscrollThreshold = 150; 
    let isTransitioning = false;

    function goToNextPage() {
        if (isTransitioning) return;
        const currentActive = document.querySelector('.page-view.active');
        if (!currentActive || currentActive.id === 'home') return;

        const currentIndex = pageOrder.indexOf(currentActive.id);
        if (currentIndex < pageOrder.length - 1) {
            isTransitioning = true;
            switchPage(pageOrder[currentIndex + 1]);
            setTimeout(() => { isTransitioning = false; }, 1200); 
        }
    }

    function goToPrevPage() {
        if (isTransitioning) return;
        const currentActive = document.querySelector('.page-view.active');
        if (!currentActive || currentActive.id === 'home') return;

        const currentIndex = pageOrder.indexOf(currentActive.id);
        if (currentIndex > 1) {
            isTransitioning = true;
            switchPage(pageOrder[currentIndex - 1]);
            setTimeout(() => { isTransitioning = false; }, 1200);
        }
    }

    // --- Desktop Wheel Logic ---
    window.addEventListener('wheel', (e) => {
        if (isTransitioning || (typeof isWarping !== 'undefined' && isWarping)) return;

        const scrollableHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const currentScrollBottom = Math.ceil(window.innerHeight + window.scrollY);
        const isAtBottom = currentScrollBottom >= (scrollableHeight - 20);
        const isAtTop = window.scrollY <= 10;

        if (e.deltaY > 0) {
            overscrollUp = 0; 
            if (isAtBottom) {
                overscrollDown += e.deltaY;
                if (overscrollDown >= overscrollThreshold) {
                    goToNextPage();
                    overscrollDown = 0;
                }
            } else { overscrollDown = 0; }
        } else if (e.deltaY < 0) {
            overscrollDown = 0; 
            if (isAtTop) {
                overscrollUp += Math.abs(e.deltaY); 
                if (overscrollUp >= overscrollThreshold) {
                    goToPrevPage();
                    overscrollUp = 0;
                }
            } else { overscrollUp = 0; }
        }
    });

    // --- Mobile Touch/Swipe Logic ---
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 75; // Distance required for a valid swipe

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isTransitioning || (typeof isWarping !== 'undefined' && isWarping)) return;
        
        touchEndY = e.changedTouches[0].screenY;
        
        const scrollableHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const currentScrollBottom = Math.ceil(window.innerHeight + window.scrollY);
        const isAtBottom = currentScrollBottom >= (scrollableHeight - 20);
        const isAtTop = window.scrollY <= 10;

        // Calculate swipe distance (Positive means finger moved UP the screen, indicating a scroll DOWN)
        const swipeDistance = touchStartY - touchEndY;

        if (swipeDistance > swipeThreshold && isAtBottom) {
            goToNextPage();
        } else if (swipeDistance < -swipeThreshold && isAtTop) {
            goToPrevPage();
        }
    }, { passive: true });

    // ==========================================
    // 5. WARP DRIVE ANIMATION
    // ==========================================
    let isWarping = false;
    let warpVelocity = 0;
    const enterBtn = document.getElementById('enter-world-btn');
    
    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            isWarping = true;
            warpVelocity = 2; 
            
            const warpInterval = setInterval(() => {
                warpVelocity *= 1.25; 
            }, 50);

            setTimeout(() => {
                clearInterval(warpInterval);
                isWarping = false;
                warpVelocity = 0;
                
                initParticles(); 
                switchPage('about');
            }, 1200); 
        });
    }

    // ==========================================
    // 6. INTERACTIVE BACKGROUND PHYSICS
    // ==========================================
    const canvas = document.getElementById('cosmos-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    const particleCount = window.innerWidth > 768 ? 150 : 70; // Fewer particles on mobile for performance
    const connectionDistance = 110; 
    const mouseRepelRadius = 150;   
    const mouseRepelForce = 3;      

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6; 
            this.vy = (Math.random() - 0.5) * 0.6; 
            this.radius = Math.random() * 1.5 + 0.5;
        }

        update() {
            if (isWarping) {
                const dx = this.x - width / 2;
                const dy = this.y - height / 2;
                const angle = Math.atan2(dy, dx);
                
                this.x += Math.cos(angle) * warpVelocity;
                this.y += Math.sin(angle) * warpVelocity;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.x = width / 2 + (Math.random() - 0.5) * 20;
                    this.y = height / 2 + (Math.random() - 0.5) * 20;
                }
            } else {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Only calculate mouse repulsion on desktop to save battery/perf on mobile
                if (window.matchMedia("(pointer: fine)").matches) {
                    const dxMouse = this.x - mouseX;
                    const dyMouse = this.y - mouseY;
                    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distMouse < mouseRepelRadius) {
                        const force = (mouseRepelRadius - distMouse) / mouseRepelRadius;
                        this.x += (dxMouse / distMouse) * force * mouseRepelForce;
                        this.y += (dyMouse / distMouse) * force * mouseRepelForce;
                    }
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isWarping ? 'rgba(255, 255, 255, 0.9)' : 'rgba(139, 92, 246, 0.8)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) { 
            particles.push(new Particle()); 
        }
    }

    function animateBackground() {
        if (isWarping) {
            ctx.fillStyle = 'rgba(3, 3, 8, 0.2)'; 
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (!isWarping) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = (1 - distance / connectionDistance) * 0.25;
                        ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
                        ctx.stroke();
                    }
                }
            }
        }
        requestAnimationFrame(animateBackground);
    }

    initParticles();
    animateBackground();
});
