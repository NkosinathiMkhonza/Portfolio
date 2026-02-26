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
// ==========================================
// DAY 5: INTERACTIVE CODE SNIPPETS
// ==========================================

// 1. THE DATA (The Model)
// This defines what happens when specific code blocks are "run".
const snippetOutputs = {
    "terminal": {
        output: `
> Role: Software Engineer
> Focus: Django & REST APIs
> Process: Code -> Break -> Fix -> Learn`,
        language: "bash"
    },
    "work_ethic.py": {
        output: `
[INFO] Starting daily routine...
[SUCCESS] Hard work completed.
[INFO] Switching to Engineering Mode...`,
        language: "python"
    }
};

// 2. THE LOGIC (The Controller)
// We find the code blocks and add the buttons dynamically
const codeBlocks = document.querySelectorAll('.code-block');

codeBlocks.forEach(block => {
    // Find the header to see what "file" it is
    const header = block.querySelector('.code-header span');
    if (!header) return;

    const title = header.textContent.trim(); // e.g., "terminal" or "work_ethic.py"

    // Check if we have defined an output for this block
    if (snippetOutputs[title]) {
        // Create the "Run" button
        const runBtn = document.createElement('button');
        runBtn.className = 'run-btn';
        runBtn.textContent = 'Run';
        
        // Add the button to the header
        const headerContainer = block.querySelector('.code-header');
        headerContainer.appendChild(runBtn);

        // Add the Click Event Listener
        runBtn.addEventListener('click', () => {
            executeSnippet(block, title);
        });
    }
});

// 3. THE EXECUTION FUNCTION
function executeSnippet(block, title) {
    const data = snippetOutputs[title];
    
    // Check if output already exists, if so, remove it (toggle)
    const existingOutput = block.querySelector('.run-output');
    if (existingOutput) {
        existingOutput.remove();
        return;
    }

    // Create the output container
    const outputDiv = document.createElement('div');
    outputDiv.className = 'run-output';
    
    // Add the text
    outputDiv.textContent = data.output;

    // Append it to the code block (after the <pre>)
    block.appendChild(outputDiv);
}
// ==========================================
// DAY 6: FORM VALIDATION LOGIC
// ==========================================

// 1. SELECT FORM ELEMENTS
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('form-success');

// 2. HELPER FUNCTIONS

// validateEmail: Uses Regex to check if email looks real
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// showError: Adds error class and displays message
const showError = (input, message) => {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-text');

    // We need to add the error text to HTML if it doesn't exist
    // But for now, we assume the HTML structure is there or we handle it dynamically
    if (!errorDisplay) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-text visible';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    } else {
        errorDisplay.textContent = message;
        errorDisplay.classList.add('visible');
    }
    
    input.classList.add('error');
};

// clearError: Removes error state
const clearError = (input) => {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-text');
    
    if (errorDisplay) {
        errorDisplay.classList.remove('visible');
    }
    input.classList.remove('error');
};


// 3. VALIDATION LOGIC

const checkInputs = () => {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    return isValid;
};


// 4. EVENT LISTENERS

// Submit Event
form.addEventListener('submit', (e) => {
    // 1. Prevent the form from submitting to a server (we don't have one)
    e.preventDefault();

    // 2. Check inputs
    if (checkInputs()) {
        // 3. If valid, show success message
        formSuccess.style.display = 'block';
        formSuccess.textContent = 'Message sent successfully! (Simulated)';
        
        // 4. Reset form
        form.reset();

        // 5. Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    } else {
        formSuccess.style.display = 'none';
    }
});

// Real-time Feedback (Blur = when user clicks out of the input)
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', checkInputs);
});
// ==========================================
// DAY 7: FINAL POLISH
// ==========================================

// 1. DYNAMIC YEAR IN FOOTER
const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// 2. BACK TO TOP BUTTON
// Create the button element
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
document.body.appendChild(backToTopBtn);

// Show/Hide Button Logic
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // If scrolled down more than 300px
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Click Event
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});