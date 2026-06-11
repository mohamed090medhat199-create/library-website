// Create admin user if not exists
function initAdminUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(function(user) {
        return user.email === 'admin@library.com';
    });
    
    if (!adminExists) {
        const adminUser = {
            name: 'Admin',
            email: 'admin@library.com',
            password: 'admin123',
            isAdmin: true
        };
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Initialize admin on page load
initAdminUser();

// Register form submission
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
                
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Reset error messages
        resetErrorMessages();
        
        let isValid = true;
        
        // Validate name
        if (!validateName(name)) {
            document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword(password)) {
            document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate password match
        if (password !== confirmPassword) {
            document.getElementById('confirm-error').textContent = 'Passwords do not match';
            document.getElementById('confirm-error').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                document.getElementById('email-error').textContent = 'Email already registered';
                document.getElementById('email-error').style.display = 'block';
            } else {
                // Add new user
                const newUser = {
                    name:name,
                    email:email,
                    password:password,
                    isAdmin: false,
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Auto-login and redirect
                localStorage.setItem('currentUser', JSON.stringify({ email, name }));
                localStorage.setItem('isAdmin', 'false');
                window.location.href = 'index.html';
            }
        }
    });
}

// Login form submission
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Reset error messages
        resetErrorMessages();
        
        let isValid = true;
        
        // Validate email
        if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword(password)) {
            document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
            document.getElementById('password-error').style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Check credentials
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Login successful
                localStorage.setItem('currentUser', JSON.stringify({ 
                    email: user.email, 
                    name: user.name 
                }));
                localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
                
                // Redirect to appropriate page
                if (user.isAdmin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                // Login failed
                document.getElementById('password-error').textContent = 'Invalid email or password';
                document.getElementById('password-error').style.display = 'block';
            }
        }
    });
}

function resetErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
}

// Protect admin route
if (window.location.pathname.includes('admin.html') && localStorage.getItem('isAdmin') != 'true') {
    window.location.href = 'login.html';
}

if ((window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) && localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// Validate email format
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

// Validate password (at least 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Validate name (at least 2 characters)
function validateName(name) {
    return name.length >= 2;
}