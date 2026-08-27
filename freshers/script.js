// ==========================================
// DYNAMIC ANNOUNCEMENTS DATABASE
// ==========================================
const DEFAULT_REGISTRATION_IMG = "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2070&auto=format&fit=crop";

const activeAnnouncements = [
    {
        id: "freshers-league",
        navTitle: "Freshers League",
        pageTitle: "FRESHERS LEAGUE",
        heroTitle: "Registrations Open<br>for Football Freshers League",
        img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2070&auto=format&fit=crop",
        hasRegistration: true,
        customFields: []
    }
];

// ==========================================
// TEAM SQUAD DATABASE
// ==========================================
const teamSquad = [
    // Goalkeepers
    { firstName: "", lastName: "Nikhil", number: 1, nationality: "India", position: "Goalkeepers", image: null, status: null },
    { firstName: "", lastName: "Ojas", number: 16, nationality: "India", position: "Goalkeepers", image: null, status: null },
    // Defenders
    { firstName: "", lastName: "Ayush", number: 2, nationality: "India", position: "Defenders", image: null, status: null },
    { firstName: "", lastName: "Arnav", number: 3, nationality: "India", position: "Defenders", image: null, status: null },
    { firstName: "", lastName: "Abhinav", number: 4, nationality: "India", position: "Defenders", image: null, status: null },
    { firstName: "", lastName: "Unknown", number: 5, nationality: "India", position: "Defenders", image: null, status: null },
    // Midfielders
    { firstName: "", lastName: "Mehul", number: 6, nationality: "India", position: "Midfielders", image: null, status: null },
    { firstName: "", lastName: "Karthi", number: 7, nationality: "India", position: "Midfielders", image: null, status: null },
    { firstName: "", lastName: "Murtaza", number: 8, nationality: "India", position: "Midfielders", image: null, status: null },
    { firstName: "", lastName: "Unknown", number: 10, nationality: "India", position: "Midfielders", image: null, status: null },
    // Forwards
    { firstName: "", lastName: "Mustafa", number: 9, nationality: "India", position: "Forwards", image: null, status: null },
    { firstName: "", lastName: "Iraban", number: 11, nationality: "India", position: "Forwards", image: null, status: null },
    { firstName: "", lastName: "Pankaj", number: 14, nationality: "India", position: "Forwards", image: null, status: null },
    { firstName: "", lastName: "Arjun", number: 17, nationality: "India", position: "Forwards", image: null, status: null },
    { firstName: "", lastName: "Unknown", number: 19, nationality: "India", position: "Forwards", image: null, status: null }
];

// ==========================================
// CORE LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // 1. Build Dynamic Dropdowns (Header & Footer)
    const announcementsNav = document.getElementById('announcements-nav');
    const footerAnnouncementsList = document.getElementById('footer-announcements-list');
    
    if (announcementsNav && activeAnnouncements.length > 0) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-box';
        const ul = document.createElement('ul');
        activeAnnouncements.forEach(event => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `announcement.html?id=${event.id}`;
            a.textContent = event.navTitle;
            li.appendChild(a);
            ul.appendChild(li);
        });
        dropdown.appendChild(ul);
        announcementsNav.appendChild(dropdown);
    }

    if (footerAnnouncementsList && activeAnnouncements.length > 0) {
        activeAnnouncements.forEach(event => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `announcement.html?id=${event.id}`;
            a.textContent = event.navTitle;
            li.appendChild(a);
            footerAnnouncementsList.appendChild(li);
        });
    }

    // 2. Random Chunk Splitting Function
    function getChunks(word) {
        const length = word.length;
        if (length <= 2) return [word];
        const chunks = [];
        let i = 0;
        while (i < length) {
            let size = Math.floor(Math.random() * 2) + 2;
            if (i + size > length) size = length - i;
            chunks.push(word.slice(i, i + size));
            i += size;
        }
        return chunks;
    }

        // 3. Reusable Discrete Chunk Reveal Function
    function splitGlitchText(element, staggerSpeed = 0.12) {
        if (!element) return;
        const text = element.textContent;
        element.innerHTML = ''; 
        const words = text.split(' '); 
        let delay = 0;
        words.forEach((word) => {
            const wordWrap = document.createElement('span');
            wordWrap.className = 'word-wrap';
            const chunks = getChunks(word);
            chunks.forEach(chunkText => {
                const chunkBlock = document.createElement('span');
                chunkBlock.className = 'chunk-block';
                const chunkTextEl = document.createElement('span');
                chunkTextEl.className = 'chunk-text';
                chunkTextEl.textContent = chunkText;
                const chunkBox = document.createElement('span');
                chunkBox.className = 'chunk-box';
                
                // ONLY the box gets the delay. Text is already visible behind it.
                chunkBox.style.animationDelay = `${delay}s`;
                
                chunkBlock.appendChild(chunkTextEl);
                chunkBlock.appendChild(chunkBox);
                wordWrap.appendChild(chunkBlock);
                delay += staggerSpeed; 
            });
            element.appendChild(wordWrap);
            delay += 0.2;
        });
    }

    // 4. Page-Specific Logic
    const introLoader = document.getElementById('intro-loader');
    const path = window.location.pathname.split("/").pop();

    // --- HOMEPAGE LOGIC ---
    if (path === "" || path === "index.html") {
        if (introLoader) {
            splitGlitchText(document.querySelector('[data-glitch-text]'));
            document.body.style.overflow = 'hidden';

            setTimeout(() => introLoader.classList.add('glitch-animate'), 400);
            
            const chunkBoxes = introLoader.querySelectorAll('.chunk-box');
            let maxDelay = 0;
            chunkBoxes.forEach(box => {
                const delayStr = box.style.animationDelay;
                if (delayStr) {
                    const delayVal = parseFloat(delayStr);
                    if (delayVal > maxDelay) maxDelay = delayVal;
                }
            });
            
            // Total time = max delay + 0.8s (new text delay) + 0.2s (text fade duration)
            const lastChunkFinishTime = 400 + (maxDelay * 1000) + 1000;

            const underlineStartTime = lastChunkFinishTime + 200;
            setTimeout(() => introLoader.classList.add('animate-underline'), underlineStartTime);
            
            const startSlideTime = underlineStartTime + 1000 + 200;
            const settledSection = document.getElementById('club-settled-section');
            setTimeout(() => {
                introLoader.classList.add('slide-down');
                if (settledSection) settledSection.classList.add('expanded');
            }, startSlideTime);

            const convertTime = startSlideTime + 1200;
            setTimeout(() => {
                if (settledSection) {
                    settledSection.appendChild(introLoader);
                    introLoader.style.position = 'relative';
                    introLoader.style.transform = 'none';
                    introLoader.style.top = 'auto';
                    introLoader.style.height = '100%';
                    introLoader.style.zIndex = '1';
                }
                document.body.style.overflow = 'auto'; 
            }, convertTime);
        }
    } 
    // --- ANNOUNCEMENT PAGE LOGIC ---
    else if (path === "announcement.html") {
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('id');
        const eventData = activeAnnouncements.find(e => e.id === eventId);

        if (eventData) {
            document.getElementById('dynamic-glitch-text').textContent = eventData.pageTitle;
            let heroImage = eventData.img || DEFAULT_REGISTRATION_IMG;
            document.getElementById('dynamic-hero-bg').style.background = `url('${heroImage}') no-repeat center center/cover`;
            document.getElementById('dynamic-hero-title').innerHTML = eventData.heroTitle;
            
            if (eventData.hasRegistration) {
                document.getElementById('dynamic-register-btn').href = `register.html?event=${eventData.id}`;
                document.getElementById('dynamic-register-btn').style.display = 'inline-block';
            } else {
                document.getElementById('dynamic-register-btn').style.display = 'none';
            }

            const settledSection = document.getElementById('club-settled-section');
            if (introLoader) {
                splitGlitchText(document.getElementById('dynamic-glitch-text'));
                document.body.style.overflow = 'hidden';
                setTimeout(() => introLoader.classList.add('glitch-animate'), 400);
                
                const chunkBoxes = introLoader.querySelectorAll('.chunk-box');
                let maxDelay = 0;
                chunkBoxes.forEach(box => {
                    const delayStr = box.style.animationDelay;
                    if (delayStr) {
                        const delayVal = parseFloat(delayStr);
                        if (delayVal > maxDelay) maxDelay = delayVal;
                    }
                });

                const lastChunkFinishTime = 400 + (maxDelay * 1000) + 1000;
                const underlineStartTime = lastChunkFinishTime + 200;
                setTimeout(() => introLoader.classList.add('animate-underline'), underlineStartTime);

                const startSlideTime = underlineStartTime + 1000 + 200;
                setTimeout(() => {
                    introLoader.classList.add('slide-down');
                    if (settledSection) settledSection.classList.add('expanded');
                }, startSlideTime);

                const convertTime = startSlideTime + 1200;
                setTimeout(() => {
                    if (settledSection) {
                        settledSection.appendChild(introLoader);
                        introLoader.style.position = 'relative';
                        introLoader.style.transform = 'none';
                        introLoader.style.top = 'auto';
                        introLoader.style.height = '100%';
                        introLoader.style.zIndex = '1';
                    }
                    document.body.style.overflow = 'auto'; 
                }, convertTime);
            }
        } else {
            document.body.innerHTML = '<h1 style="color:white;text-align:center;margin-top:20vh;">Announcement not found.</h1>';
        }
    }
    // --- REGISTER PAGE LOGIC ---
    else if (path === "register.html") {
        // Instantly fade the form box in beautifully on page load (no loader transition)
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.form-box', 
                { opacity: 0, y: 40, duration: 1.2, ease: 'power4.out' },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
            );
        }

        // Handle Form Submit
        document.getElementById('reg-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = {
                name: document.getElementById('name').value,
                roll: document.getElementById('roll').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                position: document.getElementById('position').value,
                experience: document.getElementById('experience').value
            };
            
            const submitBtn = form.querySelector('.btn-submit-cute');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Registration submitted successfully! We will contact you soon.');
                    form.reset();
                } else {
                    alert('Error submitting form. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please check your connection.');
            } finally {
                submitBtn.textContent = 'Submit Now';
                submitBtn.disabled = false;
            }
        });
    }
    
    // --- TEAM PAGE LOGIC ---
    else if (path === "team.html") {
        const squadContainer = document.getElementById('squad-container');
        if (squadContainer) {
            const positions = ["Goalkeepers", "Defenders", "Midfielders", "Forwards"];
            positions.forEach(pos => {
                const playersInPos = teamSquad.filter(p => p.position === pos);
                if (playersInPos.length > 0) {
                    const section = document.createElement('div');
                    section.className = 'position-section';
                    const title = document.createElement('h2');
                    title.className = 'position-title';
                    title.textContent = pos;
                    section.appendChild(title);
                    const grid = document.createElement('div');
                    grid.className = 'player-grid';
                    playersInPos.forEach(player => {
                        const card = document.createElement('div');
                        card.className = 'player-card';
                        const texture = document.createElement('div');
                        texture.className = 'card-texture';
                        card.appendChild(texture);
                        if (player.image) {
                            const img = document.createElement('img');
                            img.className = 'player-image';
                            img.src = player.image;
                            img.alt = `${player.firstName} ${player.lastName}`;
                            card.appendChild(img);
                        } else {
                            const silhouette = document.createElement('div');
                            silhouette.className = 'player-silhouette';
                            card.appendChild(silhouette);
                        }
                        if (player.status) {
                            const badge = document.createElement('div');
                            badge.className = 'status-badge';
                            badge.textContent = player.status;
                            card.appendChild(badge);
                        }
                        const topInfo = document.createElement('div');
                        topInfo.className = 'card-top-info';
                        const num = document.createElement('div');
                        num.className = 'squad-number';
                        num.textContent = player.number || '';
                        const nat = document.createElement('div');
                        nat.className = 'nationality';
                        nat.textContent = player.nationality;
                        topInfo.appendChild(num);
                        topInfo.appendChild(nat);
                        card.appendChild(topInfo);
                        const bottomInfo = document.createElement('div');
                        bottomInfo.className = 'card-bottom-info';
                        const firstName = document.createElement('div');
                        firstName.className = 'first-name';
                        firstName.textContent = player.firstName;
                        const lastName = document.createElement('div');
                        lastName.className = 'last-name';
                        lastName.textContent = player.lastName;
                        const accent = document.createElement('div');
                        accent.className = 'accent-line';
                        bottomInfo.appendChild(firstName);
                        bottomInfo.appendChild(lastName);
                        bottomInfo.appendChild(accent);
                        card.appendChild(bottomInfo);
                        grid.appendChild(card);
                    });
                    section.appendChild(grid);
                    squadContainer.appendChild(section);
                }
            });
        }
    }

    // 5. Header Scroll Behavior
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 6. Hero Sequential Scroll Logic
    const scrollContainer = document.getElementById('hero-scroll-container');
    if (scrollContainer) {
        const grid = scrollContainer.querySelector('.collage-grid');
        const outerBgs = scrollContainer.querySelectorAll('.collage-img .bg');
        const centerImg = scrollContainer.querySelector('.center-img');
        const finalText = scrollContainer.querySelector('.hero-final-text');
        const floatingText = scrollContainer.querySelector('.hero-floating-text');
        const words = finalText.querySelectorAll('span');
        const wordCount = words.length;

        window.addEventListener('scroll', () => {
            const rect = scrollContainer.getBoundingClientRect();
            const scrollableHeight = scrollContainer.offsetHeight - window.innerHeight;
            const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);

            if (progress <= 0.5) {
                const phase1Progress = progress / 0.5; 
                grid.style.transform = `scale(${1 + (phase1Progress * 1.5)})`;
                outerBgs.forEach(bg => bg.style.transform = `scale(${1 + (phase1Progress * 1.5)})`);
                const size = 33.33 + (phase1Progress * 66.67);
                const pos = 33.33 - (phase1Progress * 33.33);
                centerImg.style.width = `${size}%`;
                centerImg.style.height = `${size}%`;
                centerImg.style.top = `${pos}%`;
                centerImg.style.left = `${pos}%`;
                if (floatingText) floatingText.style.opacity = Math.max(0, 1 - (phase1Progress * 2));
                words.forEach(word => { word.style.opacity = 0; word.style.transform = 'translateY(20px)'; });
            } 
            else if (progress > 0.5 && progress < 0.7) {
                grid.style.transform = `scale(2.5)`;
                outerBgs.forEach(bg => bg.style.transform = `scale(2.5)`);
                centerImg.style.width = `100%`; centerImg.style.height = `100%`;
                centerImg.style.top = `0%`; centerImg.style.left = `0%`;
                words.forEach(word => { word.style.opacity = 0; word.style.transform = 'translateY(20px)'; });
            } 
            else if (progress >= 0.7) {
                grid.style.transform = `scale(2.5)`;
                outerBgs.forEach(bg => bg.style.transform = `scale(2.5)`);
                centerImg.style.width = `100%`; centerImg.style.height = `100%`;
                centerImg.style.top = `0%`; centerImg.style.left = `0%`;
                const textProgress = (progress - 0.7) / 0.3; 
                const wordsToShow = Math.ceil(textProgress * wordCount);
                words.forEach((word, index) => {
                    if (index < wordsToShow) { word.style.opacity = 1; word.style.transform = 'translateY(0)'; } 
                    else { word.style.opacity = 0; word.style.transform = 'translateY(20px)'; }
                });
            }
        });
    }

    // 7. Footer Hover Glitch
    const footerContainer = document.querySelector('.footer-headline-container');
    const defaultFooterText = document.querySelector('.footer-headline.default-text');
    const hoverFooterText = document.querySelector('.footer-headline.hover-text');

    function triggerGlitch(element) {
        splitGlitchText(element);
        void element.offsetWidth; 
        element.classList.add('glitch-animate');
    }

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerGlitch(defaultFooterText);
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (footerContainer) {
        splitGlitchText(defaultFooterText);
        splitGlitchText(hoverFooterText);
        footerObserver.observe(footerContainer);
        footerContainer.addEventListener('mouseenter', () => triggerGlitch(hoverFooterText));
        footerContainer.addEventListener('mouseleave', () => triggerGlitch(defaultFooterText));
    }
});
