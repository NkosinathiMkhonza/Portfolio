classDiagram
    class Project {
        +String title
        +String description
        +String techStack
        +Int stars
        +getRepoUrl()
    }

    class ContactForm {
        +String name
        +String email
        +String message
        +Boolean isValid
        +validateEmail()
        +submit()
    }

    class Terminal {
        +List history
        +Map commands
        +executeCommand(String cmd)
        +addToHistory(String cmd)
    }
    
    class UserInterface {
        +String currentTheme
        +toggleTheme()
        +scrollToSection(String id)
    }

    UserInterface "1" --> "1" Terminal : manages
    UserInterface "1" --> "1" ContactForm : manages
    UserInterface "1" --> "*" Project : displays

// MODEL
const skills = ["Python", "Django", "SQL"];
let currentTheme = "dark";

// VIEW (Logic that touches the screen)
document.getElementById('form-success').style.display = 'block';
inputElement.classList.add('error');