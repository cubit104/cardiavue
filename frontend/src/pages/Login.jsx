<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CardiaVue - Login</title>
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Animation Side -->
        <div class="animation-side">
            <div class="logo">
                <img src="assets/logo.svg" alt="CardiaVue Logo">
                <h1>CardiaVue</h1>
            </div>
            <div class="animation">
                <div class="heartbeat-animation">
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <path class="heartbeat-line" d="M 0,200 Q 40,100 80,200 T 160,200 T 240,200 T 320,200 T 400,200" fill="none" stroke="#4285f4" stroke-width="5"></path>
                        <circle class="pulse-circle" cx="200" cy="200" r="5" fill="#e74c3c"></circle>
                    </svg>
                </div>
                <div class="tagline">
                    <h2>Advanced Cardiac Monitoring</h2>
                    <p>Providing healthcare professionals with real-time insights</p>
                </div>
            </div>
        </div>
        
        <!-- Login Side -->
        <div class="login-side">
            <div class="login-container">
                <h2>Welcome Back</h2>
                <p>Please login to your account</p>
                
                <form id="login-form">
                    <div class="input-group">
                        <i class="fas fa-user"></i>
                        <input type="text" id="username" placeholder="Username" required>
                    </div>
                    
                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="password" placeholder="Password" required>
                    </div>
                    
                    <div class="remember-forgot">
                        <label>
                            <input type="checkbox"> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    
                    <button type="submit" class="login-btn">Login</button>
                </form>
                
                <div class="login-footer">
                    <p>Don't have an account? <a href="#">Contact administrator</a></p>
                </div>
            </div>
        </div>
    </div>
    <script src="login.js"></script>
</body>
</html>
