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