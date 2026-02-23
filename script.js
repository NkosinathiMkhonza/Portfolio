// ==========================================
// DAY 4: SETUP & NAVIGATION LOGIC
// ==========================================

// 1. SELECTING ELEMENTS (The Variables)
// We are grabbing the HTML elements we need to interact with.
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Debugging: Check if we successfully grabbed the elements
// Open your browser Console (F12 -> Console) to see this print out
console.log(`Script Loaded. Found ${sections.length} sections and ${navLinks.length} nav links.`);


// 2. THE SCROLL SPY LOGIC
// This function checks which section is currently on screen and highlights the nav link.
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the section is visible on screen
        if (entry.isIntersecting) {
            // Get the ID of the current section (e.g., "intro", "projects")
            const currentId = entry.target.getAttribute('id');
            
            // Remove 'active' class from all links first
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Find the specific link that points to this section and add 'active' class
            // We use the CSS attribute selector: a[href="#intro"]
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    // Options: Trigger when 30% of the section is visible
    threshold: 0.3 
});

// Loop through all sections and attach the observer to them
sections.forEach(section => {
    observer.observe(section);
});