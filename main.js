// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status and update UI
    checkAuthStatus();
    
    // Set up logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Initialize hero slider on home page
    if (document.querySelector('.hero-slider')) {
        initHeroSlider();
    }
});

// Check authentication status and update UI
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('currentUser') !== null;
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    // Update navigation based on login status
    if (isLoggedIn) {
        // Hide register and login links
        const registerNav = document.getElementById('register-nav');
        const loginNav = document.getElementById('login-nav');
        const logoutNav = document.getElementById('logout-nav');
        
        if (registerNav) registerNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'none';
        if (logoutNav) logoutNav.style.display = 'block';
    }
    
    // Show/hide admin link based on admin status
    const adminNav = document.getElementById('admin-nav');
    if (adminNav) {
        adminNav.style.display = isAdmin ? 'block' : 'none';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

// Initialize hero slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Handle wrap-around for infinite sliding
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Make this function global for the arrow buttons
    window.changeSlide = function(offset) {
        showSlide(currentSlide + offset);
    };
    
    // Show first slide immediately
    showSlide(currentSlide);
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 6000);
}