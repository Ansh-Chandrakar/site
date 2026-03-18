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
        "Album/IMG_20220918_163357.jpg",
        "Album/IMG_20220918_170536.jpg",
        "Album/IMG_20221127_070417.jpg",
        "Album/IMG-20231130-WA0016.jpg",
        "Album/PXL_20231103_151716316.jpg",
        "Album/PXL_20231129_115846961.NIGHT.jpg",
        "Album/PXL_20231220_074203952.MP.jpg",
        "Album/PXL_20231227_131905740.NIGHT.jpg",
        "Album/PXL_20240110_112412937.jpg",
        "Album/PXL_20240118_145725633.jpg",
        "Album/PXL_20240125_044921384.jpg",
        "Album/PXL_20240404_132721072.jpg",
        "Album/PXL_20240410_055743423.jpg",
        "Album/PXL_20240713_105500606.jpg",
        "Album/PXL_20240718_102523079.jpg",
        "Album/PXL_20240718_112149759.jpg",
        "Album/PXL_20241212_092753960.PORTRAIT.jpg",
        "Album/PXL_20241213_041920283.RAW-01.COVER.jpg",
        "Album/PXL_20241213_042639329.RAW-01.COVER.jpg",
        "Album/PXL_20241213_074323916.RAW-01.COVER.jpg",
        "Album/PXL_20241213_103320351.RAW-01.COVER.jpg",
        "Album/PXL_20250118_100336812.jpg",
        "Album/PXL_20250314_122645103.jpg",
        "Album/PXL_20250320_171859006.jpg",
        "Album/PXL_20250425_005055363.jpg",
        "Album/PXL_20250623_144333490.jpg",
        "Album/PXL_20250625_040805220.jpg",
        "Album/PXL_20250715_065231170.jpg",
        "Album/PXL_20250722_131550989.jpg",
        "Album/PXL_20250829_040624709.jpg",
        "Album/PXL_20251006_125642885.jpg",
        "Album/Snapchat-1756550038.jpg"
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
            
            // Note: The random 'wide' class logic was removed from here
            // because the Masonry CSS now handles the layout perfectly!

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

