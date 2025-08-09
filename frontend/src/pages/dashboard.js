document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set user name from session
    const username = sessionStorage.getItem('username');
    const userNameDisplay = document.getElementById('user-name');
    
    if (username && userNameDisplay) {
        if (username === 'doctor') {
            userNameDisplay.textContent = 'Dr. Sarah Chen';
        } else if (username === 'nurse') {
            userNameDisplay.textContent = 'Nurse Michael Wilson';
        } else if (username === 'admin') {
            userNameDisplay.textContent = 'Admin Jennifer Taylor';
        }
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }
    
    // Create Charts
    createHeartRateChart();
    createPatientDistributionChart();
});

function createHeartRateChart() {
    const ctx = document.getElementById('heartRateChart');
    
    if (!ctx) return;
    
    const heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Average Heart Rate',
                    data: [72, 76, 82, 80, 74, 71, 75],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Critical Patients Heart Rate',
                    data: [88, 92, 96, 95, 90, 89, 91],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

function createPatientDistributionChart() {
    const ctx = document.getElementById('patientDistributionChart');
    
    if (!ctx) return;
    
    const patientDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['18-30', '31-45', '46-60', '61-75', '76+'],
            datasets: [{
                data: [15, 23, 28, 25, 9],
                backgroundColor: [
                    '#4285f4',
                    '#34a853',
                    '#fbbc05',
                    '#ea4335',
                    '#9e9e9e'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}
