
useCaseDiagram
    actor "Employer/Visitor" as User
    
    package "Portfolio System" {
        usecase "View Professional Profile" as UC1
        usecase "Download Resume" as UC2
        usecase "View Projects List" as UC3
        usecase "Interact with Terminal" as UC4
        usecase "Submit Contact Form" as UC5
        usecase "Toggle Dark/Light Mode" as UC6
        
        usecase "Validate Form Input" as UC_Extend
    }
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    
    UC5 .> UC_Extend : <<extend>>\n(on invalid input)


sequenceDiagram
    autonumber
    actor User as Employer
    participant View as HTML Form
    participant Controller as JS Validation
    participant DOM as DOM (Screen)
    
    User->>View: Enters Name & Email
    User->>View: Clicks "Send Message"
    View->>Controller: Event Listener triggers
    
    alt Invalid Data
        Controller->>Controller: validate(input) returns false
        Controller->>DOM: Add 'error' class to input
        DOM->>User: Shows Red Border & Error Text
    else Valid Data
        Controller->>Controller: validate(input) returns true
        Controller->>View: Reset Form Fields
        Controller->>DOM: Display Success Message
        DOM->>User: Shows "Message Sent" Alert
    end