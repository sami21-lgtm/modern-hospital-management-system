# CareSync - Professional Hospital Management & Self-Enrollment Portal

CareSync is a highly responsive, modern clinical dashboard designed with glassmorphism concepts. The system incorporates dual modes: a self-registration channel for independent patient intake, and a comprehensive staff portal supporting full CRUD (Create, Read, Update, Delete) clinical database management.

## Features

* **Double-Pane Authentication Interface:** Side-by-side admin staff login portal and client-side patient self-enrollment form.
* **Full CRUD Functionality:** Staff can admit new patients, list ongoing admissions, update medical registries on-the-fly, and complete patient discharge actions.
* **Patient Self-Enrollment Engine:** Generates randomized unique identification numbers for incoming self-registering clients.
* **Instant Dynamic Filtration:** Live-filtering algorithm search bar capable of scanning patients by Name, Department, or ID.
* **Local Storage Fallback Protection:** Full persistence engine ensures data remains intact during browser reloads or workspace updates.
* **Responsive Styling:** Clean modular glassmorphism interface with beautiful background blur properties.

## File Hierarchy

```text
├── index.html       # Structural layout and view panes
├── style.css        # Glassmorphism aesthetic properties and responsive styling rules
└── script.js        # Core persistence logic and CRUD orchestration
