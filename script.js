document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        mirror: false
    });

    // Count-up animation for pricing numbers
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const targetText = entry.target.getAttribute('data-target');
                    const target = parseFloat(targetText);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const frameDuration = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = target / totalFrames;
                    
                    let frame = 0;
                    const updateCount = () => {
                        frame++;
                        count += increment;
                        
                        if(frame < totalFrames) {
                            entry.target.innerText = Math.floor(count).toLocaleString();
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.innerText = target.toLocaleString();
                        }
                    };
                    
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(counter => observer.observe(counter));
    };

    animateCounters();

    // Timeline line progress animation
    const animateTimeline = () => {
        const timelineLine = document.querySelector('.timeline-line');
        if(!timelineLine) return;

        // Set initial state
        timelineLine.style.width = '0%';

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                setTimeout(() => {
                    timelineLine.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
                    timelineLine.style.width = '84%'; // Matches CSS width
                }, 500);
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        observer.observe(timelineLine);
    };

    animateTimeline();
});

