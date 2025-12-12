// Portfolio Script
document.addEventListener('DOMContentLoaded', function () {
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Navigation items and sections
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    // Function to update active nav link based on scroll position
    function updateActiveSection() {
        let current = '';
        const scrollPos = window.scrollY + 100; // Offset for better UX

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update navigation
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // Click navigation to scroll to section
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smooth scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for nav height
                    behavior: 'smooth'
                });

                // Update active nav
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Listen for scroll to update active section
    window.addEventListener('scroll', updateActiveSection);

    // Initialize on page load
    updateActiveSection();

    // Auto-pause other videos when one plays
    const allVideos = document.querySelectorAll('video');

    allVideos.forEach(video => {
        video.addEventListener('play', function () {
            // Pause all other videos
            allVideos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });

    // ===== INFO OVERLAY SYSTEM =====
    // Open overlay when info button clicked
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent card click
            const projectId = this.getAttribute('data-project');
            const overlay = document.getElementById(`overlay-${projectId}`);

            // Close any other open overlays
            document.querySelectorAll('.info-overlay').forEach(ov => {
                ov.classList.remove('active');
            });

            // Open this overlay
            overlay.classList.add('active');
        });
    });

    // Close overlay when X clicked
    document.querySelectorAll('.close-overlay').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            this.closest('.info-overlay').classList.remove('active');
        });
    });

    // Close overlay when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.info-overlay') &&
            !e.target.closest('.info-btn')) {
            document.querySelectorAll('.info-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
        }
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.info-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
        }
    });
});