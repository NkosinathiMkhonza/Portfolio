# Nkosinathi Mkhonza — Portfolio

> A documentation-style developer portfolio built with vanilla HTML, CSS, and JavaScript.

**Live Site →** [nkosinathimkhonza.github.io/Portfolio](https://nkosinathimkhonza.github.io/Portfolio)

---

## Overview

This portfolio is designed to look and feel like a developer documentation site — intentionally styled after tools like GitHub and VS Code that I use every day. Every design decision reflects how I actually think about code: structured, readable, and purposeful.

---

## Features

- **Documentation-style layout** — sidebar navigation with scroll spy, mirroring the feel of technical docs
- **Bootstrap 2-8-2 grid** — left nav, main content, and live activity panel in equal proportions
- **Interactive code snippets** — runnable terminal blocks that simulate output inline
- **Live GitHub activity panel** — right sidebar fetches real commit history from the GitHub API on every page load
- **Terminal contact form** — validated contact form powered by Formspree; on success the form transforms into an animated terminal session
- **Scroll spy navigation** — active nav link updates automatically as you scroll through sections
- **Responsive design** — collapses gracefully to a single column on mobile

---

## Tech Stack

| Layer | Tech |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, Bootstrap 5 |
| Logic | Vanilla JavaScript (ES6+) |
| Form Backend | Formspree |
| Data | GitHub REST API v3 |
| Hosting | GitHub Pages |

---

## Project Structure

```
Portfolio/
├── index.html      # Main markup — Bootstrap grid, all sections
├── style.css       # Custom theme built on GitHub dark palette
├── script.js       # Scroll spy, interactive snippets, form logic, GitHub API
└── README.md       # You are here
```

---

## Running Locally

No build tools or dependencies needed. Just clone and open:

```bash
git clone https://github.com/NkosinathiMkhonza/Portfolio.git
cd Portfolio
# Open index.html in your browser
```

Or use the VS Code Live Server extension for hot reload.

---

## Contact Form

The contact form uses [Formspree](https://formspree.io) to deliver submissions to my inbox without requiring a backend server. The form data is sent via a `fetch` POST request with `async/await`, and the success state triggers a custom terminal animation instead of a page reload.

---

## Commit History Philosophy

Every feature in this project was committed as a focused, single-purpose change. The git history is intentionally readable — each commit message describes exactly what changed and why.

---

## Author

**Nkosinathi Mkhonza** — Community-Taught Software Engineer  
Petrol Attendant by day. Software Engineer by night.

[GitHub](https://github.com/NkosinathiMkhonza) · [Portfolio](https://nkosinathimkhonza.github.io/Portfolio)

---

*Designed & Built by Nkosinathi Mkhonza*
