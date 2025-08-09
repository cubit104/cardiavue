document.addEventListener('DOMContentLoaded', function() {
    // Default credentials
    const validCredentials = {
        'doctor': 'cardio123',
        'nurse': 'health456',
        'admin': 'admin789'
    };

    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check if credentials are valid
        if (validCredentials[username] && validCredentials[username] === password) {
            // Store login state
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            alert('Invalid username or password. Please try again.');
        }
    });
});
