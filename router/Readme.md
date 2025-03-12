# Simple Router

A simple client-side router for a Single Page Application (SPA) built with JavaScript. It supports hash-based routing, dynamic routes, 404 handling, and browser history management.

## Features

- **Basic Hash Routing:** Navigate to different views based on URL hash.
- **Dynamic Routes:** Routes can accept parameters like `/user/:id`.
- **404 Handling:** Displays a 404 page for undefined routes.
- **History Management:** Uses the History API to navigate through the app without page reloads.

## Usage

1. Clone the repository.
2. Open `index.html` in a browser.
3. Use the URL hash to navigate between views.

Example:

- `#home` → Home Page
- `#about` → About Page
- `#user/123` → User Page with ID 123
