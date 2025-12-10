// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.querySelector('.sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    // Set first section as active by default
    sections[0].classList.add('active');

    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked nav item
            this.classList.add('active');

            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active');

                // Close sidebar on mobile after click
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // VIDEO FUNCTIONALITY
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const watchButtons = document.querySelectorAll('.watch-btn');
    const videoPlayer = document.getElementById('videoPlayer');

    // Open video modal
    watchButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id');
            // YouTube embed URL
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoPlayer.src = embedUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close video modal
    closeModal.addEventListener('click', function () {
        videoModal.classList.remove('active');
        videoPlayer.src = ''; // Stop video playback
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    videoModal.addEventListener('click', function (e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // GALLERY FUNCTIONALITY
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewImageButtons = document.querySelectorAll('.view-image');
    const lightbox = document.getElementById('imageLightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.lightbox-nav.prev');
    const nextButton = document.querySelector('.lightbox-nav.next');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');

    // Image data for lightbox
    const imageData = [
        {
            id: 1,
            title: 'Main Menu Screen',
            description: 'Space Adventure - Character selection interface',
            category: 'space'
        },
        {
            id: 2,
            title: 'Space Combat Scene',
            description: 'Real-time battle with enemy spaceships',
            category: 'space'
        },
        {
            id: 3,
            title: 'Neural Network Training',
            description: 'AI learning patterns to solve puzzles',
            category: 'ai'
        },
        {
            id: 4,
            title: 'Solved Puzzle State',
            description: 'AI successfully completes complex puzzle',
            category: 'ai'
        },
        {
            id: 5,
            title: 'Race Track Overview',
            description: 'Custom designed circuit with obstacles',
            category: 'racing'
        },
        {
            id: 6,
            title: 'Player Lobby Interface',
            description: 'Multiplayer matchmaking and chat system',
            category: 'racing'
        }
    ];

    let currentImageIndex = 0;

    // Gallery filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Open lightbox
    viewImageButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            currentImageIndex = parseInt(this.getAttribute('data-img')) - 1;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Update lightbox content
    function updateLightbox() {
        const image = imageData[currentImageIndex];
        lightboxTitle.textContent = image.title;
        lightboxDesc.textContent = image.description;
    }

    // Close lightbox
    closeLightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Lightbox navigation
    prevButton.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
        updateLightbox();
    });

    nextButton.addEventListener('click', function () {
        currentImageIndex = (currentImageIndex + 1) % imageData.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Lightbox keyboard controls
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            }
            if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        }

        // Video modal keyboard controls
        if (videoModal.classList.contains('active') && e.key === 'Escape') {
            videoModal.classList.remove('active');
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 1024 &&
            !sidebar.contains(e.target) &&
            !mobileToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tab System Functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            const parentTabs = this.closest('.project-tabs');

            // Remove active from all buttons in this project
            parentTabs.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Remove active from all contents in this project
            parentTabs.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active to clicked button
            this.classList.add('active');

            // Show corresponding content
            document.getElementById(tabId).classList.add('active');
        });
    });

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

    // Pause video when overlay closes
    document.querySelectorAll('.info-overlay').forEach(overlay => {
        overlay.addEventListener('transitionend', function () {
            if (!this.classList.contains('active')) {
                const video = this.closest('.project-card').querySelector('video');
                if (video && !video.paused) {
                    video.pause();
                }
            }
        });
    });
});