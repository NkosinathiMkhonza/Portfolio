document.addEventListener('DOMContentLoaded', () => {

// ==========================================
// SCROLL SPY — highlights active nav link
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

console.log(`Script Loaded. Found ${sections.length} sections and ${navLinks.length} nav links.`);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));


// ==========================================
// INTERACTIVE CODE SNIPPETS
// ==========================================
const snippetOutputs = {
    "terminal": {
        output: `> Role: Software Engineer\n> Focus: Django & REST APIs\n> Process: Code -> Break -> Fix -> Learn`
    },
    "work_ethic.py": {
        output: `[INFO] Starting daily routine...\n[SUCCESS] Hard work completed.\n[INFO] Switching to Engineering Mode...`
    }
};

const codeBlocks = document.querySelectorAll('.code-block');

codeBlocks.forEach(block => {
    const header = block.querySelector('.code-header span');
    if (!header) return;
    const title = header.textContent.trim();
    if (snippetOutputs[title]) {
        const runBtn = document.createElement('button');
        runBtn.className = 'run-btn';
        runBtn.textContent = 'Run';
        block.querySelector('.code-header').appendChild(runBtn);
        runBtn.addEventListener('click', () => {
            const existing = block.querySelector('.run-output');
            if (existing) { existing.remove(); return; }
            const outputDiv = document.createElement('div');
            outputDiv.className = 'run-output';
            outputDiv.textContent = snippetOutputs[title].output;
            block.appendChild(outputDiv);
        });
    }
});


// ==========================================
// FORM — validation + terminal success swap
// ==========================================
const form         = document.getElementById('contact-form');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const messageInput = document.getElementById('message');
const charCount    = document.getElementById('charCount');
const termSuccess  = document.getElementById('terminal-success');
const shellStatus  = document.getElementById('shell-status');
const tsResetBtn   = document.getElementById('tsResetBtn');
const submitBtn    = document.getElementById('submitBtn');

// Char counter
if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCount.textContent = len + ' / 500';
        charCount.classList.toggle('warn', len > 400);
    });
}

// Helpers
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showError = (input, message) => {
    const group = input.parentElement;
    let err = group.querySelector('.error-text');
    if (!err) {
        err = document.createElement('div');
        err.className = 'error-text';
        group.appendChild(err);
    }
    err.textContent = message;
    err.classList.add('visible');
    input.classList.add('error');
};

const clearError = (input) => {
    const err = input.parentElement.querySelector('.error-text');
    if (err) err.classList.remove('visible');
    input.classList.remove('error');
};

const checkInputs = () => {
    let valid = true;
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required'); valid = false;
    } else clearError(nameInput);

    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required'); valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email'); valid = false;
    } else clearError(emailInput);

    if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required'); valid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters'); valid = false;
    } else clearError(messageInput);

    return valid;
};

// Submit button click — send to Formspree then show terminal
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!checkInputs()) return;

    // Show sending state
    submitBtn.innerHTML = '<span class="submit-path">~/portfolio</span> sending... <span class="submit-arrow">&#8987;</span>';
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/xpqyqvzy', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            // Fade out form, show terminal animation
            form.style.transition = 'opacity 0.35s ease';
            form.style.opacity = '0';
            setTimeout(() => {
                form.style.display = 'none';
                if (shellStatus) shellStatus.textContent = '&#9679; sent';
                termSuccess.style.display = 'block';
            }, 360);
        } else {
            submitBtn.innerHTML = '<span class="submit-path">⚠</span> failed to send — try again';
            submitBtn.disabled = false;
        }
    } catch (err) {
        submitBtn.innerHTML = '<span class="submit-path">⚠</span> network error — try again';
        submitBtn.disabled = false;
    }
});

// Reset — go back to blank form
if (tsResetBtn) {
    tsResetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        termSuccess.style.display = 'none';
        form.reset();
        if (charCount) charCount.textContent = '0 / 500';
        if (shellStatus) shellStatus.textContent = '● ready';
        submitBtn.innerHTML = '<span class="submit-path">~/portfolio</span> run send_message.py <span class="submit-arrow">&#8594;</span>';
        submitBtn.disabled = false;
        form.style.opacity = '0';
        form.style.display = '';
        setTimeout(() => {
            form.style.transition = 'opacity 0.35s ease';
            form.style.opacity = '1';
        }, 10);
    });
}

// Real-time blur validation
[nameInput, emailInput, messageInput].forEach(input => {
    if (input) input.addEventListener('blur', checkInputs);
});


// ==========================================
// FOOTER YEAR
// ==========================================
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();


// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

<<<<<<< HEAD
// ==========================================
// GITHUB LIVE COMMITS — right panel
// ==========================================
async function loadGithubCommits() {
    const commitMsg  = document.getElementById('rp-commit-msg');
    const commitMeta = document.getElementById('rp-commit-meta');
    const commitList = document.getElementById('rp-commits-list');

    try {
        const res = await fetch('https://api.github.com/repos/NkosinathiMkhonza/Portfolio/commits?per_page=4', {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (!res.ok) throw new Error('GitHub API error');
        const commits = await res.json();
        if (!commits.length) return;

        // Latest commit — fills the green dot item
        const latest    = commits[0];
        const latestMsg = latest.commit.message.split('\n')[0];
        const latestDate= timeAgo(new Date(latest.commit.author.date));
        commitMsg.textContent = latestMsg;
        commitMeta.innerHTML  = `main &bull; ${latestDate}`;

        // Remaining 3 commits below
        commitList.innerHTML = commits.slice(1).map(c => {
            const msg  = c.commit.message.split('\n')[0];
            const when = timeAgo(new Date(c.commit.author.date));
            return `<div class="rp-item rp-commit-extra">
                <span class="rp-dot rp-dot-dim"></span>
                <div>
                    <div class="rp-value rp-commit-msg-small">${escapeHtml(msg)}</div>
                    <div class="rp-meta">${when}</div>
                </div>
            </div>`;
        }).join('');

    } catch (err) {
        if (commitMsg) commitMsg.textContent = 'could not load commits';
        if (commitMeta) commitMeta.textContent = 'check github.com';
    }
}

function timeAgo(date) {
    const s = Math.floor((new Date() - date) / 1000);
    if (s < 60)    return 'just now';
    if (s < 3600)  return Math.floor(s / 60) + 'm ago';
    if (s < 86400) return Math.floor(s / 3600) + 'h ago';
    return Math.floor(s / 86400) + 'd ago';
}

function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

loadGithubCommits();

=======
>>>>>>> 642b8aab14088b3d27bb901e136866944eb4834b
}); // end DOMContentLoaded
