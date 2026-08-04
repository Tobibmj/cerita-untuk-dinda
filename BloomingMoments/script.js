document.addEventListener('DOMContentLoaded', () => {
    
    const loader = document.getElementById('loader');
    const text1 = document.getElementById('text-1');
    const textGroup2 = document.getElementById('text-group-2');
    const startBtn = document.getElementById('start-btn');
    const openingSection = document.getElementById('opening');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const glassCard = document.querySelector('.glass-card');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const progressBar = document.getElementById('progress-bar');

    // 1. SEQUENCE OPENING (Dipercepat)
    setTimeout(() => {
        loader.style.display = 'none';
        text1.classList.add('fade-in');
    }, 2000); // Teks 1 muncul lebih cepat

    setTimeout(() => {
        text1.classList.remove('fade-in');
        text1.classList.add('fade-out');
    }, 4500); // Teks 1 pudar

    setTimeout(() => {
        text1.style.display = 'none';
        textGroup2.classList.add('fade-in');
    }, 5500); // Tombol Mulai & Nama langsung muncul

    // 2. TOMBOL MULAI PERJALANAN
    startBtn.addEventListener('click', () => {
        openingSection.style.opacity = '0';
        openingSection.style.visibility = 'hidden';
        
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Autoplay diblokir:", e));

        // Background Langsung Ganti Pink Terang
        document.body.classList.add('theme-light');

        setTimeout(() => {
            openingSection.style.display = 'none';
            mainContent.classList.remove('hidden');
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';

            setTimeout(() => {
                glassCard.classList.add('show');
                scrollIndicator.classList.add('show');
                startPetalFall();
                createStars(); 
            }, 500);
        }, 1000); 
    });

    // 3. KELOPAK BUNGA & BINTANG
    function startPetalFall() {
        const container = document.getElementById('petals-container');
        setInterval(() => {
            if(document.body.classList.contains('theme-end')) return;

            const petal = document.createElement('div');
            petal.classList.add('falling-petal');
            
            const startPosX = Math.random() * window.innerWidth;
            const size = Math.random() * 10 + 10; 
            const fallDuration = Math.random() * 5 + 7; 
            
            petal.style.left = `${startPosX}px`;
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.5}px`;
            petal.style.animationDuration = `${fallDuration}s`;
            
            container.appendChild(petal);
            setTimeout(() => { petal.remove(); }, fallDuration * 1000);
        }, 800);
    }

    function createStars() {
        const container = document.getElementById('stars-container');
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            container.appendChild(star);
        }
    }

    // 4. SCROLL PROGRESS BAR
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;

        if (scrollTop > 100) {
            scrollIndicator.style.opacity = '0';
        }
    });

    // 5. INTERSECTION OBSERVER (Animasi Reveal Cepat)
    const revealOptions = {
        threshold: 0.3, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // JIKA MENTOK BAWAH (ENDING) -> UBAH JADI MALAM (HITAM)
                if(entry.target.id === 'ending') {
                    document.body.classList.remove('theme-light');
                    document.body.classList.add('theme-end');
                    document.body.style.backgroundColor = 'var(--dark-bg)';
                    document.body.style.color = 'var(--ivory-white)';

                    // Fade Out Music Cepat
                    let fadeAudio = setInterval(() => {
                        if (bgMusic.volume > 0.05) {
                            bgMusic.volume -= 0.05;
                        } else {
                            bgMusic.pause();
                            clearInterval(fadeAudio);
                        }
                    }, 500);
                }

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-trigger');
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});