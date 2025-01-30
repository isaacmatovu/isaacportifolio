// Function to create and show notification
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    // Set notification styles based on type
    const baseClasses = 'flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-500 max-w-md';
    const typeClasses = {
        success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
        error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
        info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    };
    
    // Create notification content
    notification.className = `${baseClasses} ${typeClasses[type]} translate-x-full`;
    notification.innerHTML = `
        <div class="flex-1">
            ${message}
        </div>
        <button class="ml-4 hover:opacity-75 transition-opacity" onclick="this.parentElement.remove()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    });
    
    // Add hover effect
    notification.addEventListener('mouseenter', () => {
        notification.classList.add('scale-105');
    });
    
    notification.addEventListener('mouseleave', () => {
        notification.classList.remove('scale-105');
    });
    
    // Auto remove after delay
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
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

    form.addEventListener('submit', function(event) {
        // Netlify will handle the form submission
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

        // Show success notification after a short delay (simulating form submission)
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            
            // Reset form
            form.reset();
        }, 2000);
    });
});
