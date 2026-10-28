// JavaScript for Chiara Travels Coorg website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            // Toggle hamburger icon between menu (☰) and close (✕)
            if (nav.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '✕';
            } else {
                mobileMenuToggle.innerHTML = '☰';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if active
                if (nav) {
                    nav.classList.remove('active');
                    if (mobileMenuToggle) mobileMenuToggle.innerHTML = '☰';
                }
                
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fleet category filtering tabs
    const tabBtns = document.querySelectorAll('.fleet-tab-btn');
    const fleetCards = document.querySelectorAll('.fleet-card');

    if (tabBtns.length > 0 && fleetCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                fleetCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});

/**
 * Handle Enquiry form submission and redirect to WhatsApp
 * @param {HTMLFormElement} form 
 */
function handleEnquiry(form) {
    if (!form) return;
    
    // Prevent default submission
    event.preventDefault();
    
    // Collect field values
    const name = form.querySelector('#name') ? form.querySelector('#name').value.trim() : '';
    const phone = form.querySelector('#phone') ? form.querySelector('#phone').value.trim() : '';
    const pickup = form.querySelector('#pickup') ? form.querySelector('#pickup').value.trim() : '';
    const drop = form.querySelector('#drop') ? form.querySelector('#drop').value.trim() : '';
    const serviceSelect = form.querySelector('#service');
    const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : '';
    const date = form.querySelector('#date') ? form.querySelector('#date').value : '';
    const time = form.querySelector('#time') ? form.querySelector('#time').value : '';
    const vehicleSelect = form.querySelector('#vehicle');
    const vehicle = vehicleSelect ? vehicleSelect.options[vehicleSelect.selectedIndex].text : '';
    const requirements = form.querySelector('#requirements') ? form.querySelector('#requirements').value.trim() : '';
    
    // Validate required fields
    if (!name || !phone) {
        alert('Please fill in your Name and Mobile Number.');
        return;
    }
    
    // Build WhatsApp message text
    let messageText = `*New Taxi Enquiry - Chiara Travels Coorg*\n\n`;
    messageText += `*Name:* ${name}\n`;
    messageText += `*Mobile:* ${phone}\n`;
    if (service) messageText += `*Service:* ${service}\n`;
    if (pickup) messageText += `*Pickup:* ${pickup}\n`;
    if (drop) messageText += `*Drop:* ${drop}\n`;
    if (date) messageText += `*Date:* ${date}\n`;
    if (time) messageText += `*Time:* ${time}\n`;
    if (vehicle) messageText += `*Vehicle Type:* ${vehicle}\n`;
    if (requirements) messageText += `*Additional Info:* ${requirements}\n`;
    
    // WhatsApp phone number (from existing files: +91 98454 47542)
    const whatsappNumber = '919845447542';
    
    // Construct final API link
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;
    
    // Open in a new window/tab
    window.open(whatsappUrl, '_blank');
}