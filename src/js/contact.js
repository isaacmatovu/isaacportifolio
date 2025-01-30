// Function to create and show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white max-w-md z-50 translate-x-full`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'success' 
                    ? '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
                    : '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                }
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            ${type === 'success' ? `
                <div class="ml-4">
                    <a href="#home" class="text-white underline hover:text-gray-100">Back to Top</a>
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    // Check if we're returning from a form submission
    if (window.location.search.includes('form-submit=success')) {
        showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        // Clear the URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', function(event) {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-3 inline" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;
    });
});
