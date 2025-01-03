# Deep Shortener Frontend

The frontend of the Deep Shortener application provides a user-friendly interface for shortening URLs, managing user accounts, and handling URL redirects. Built with `React`, `TypeScript`, and styled using `TailwindCSS`, the application is optimized for performance and ease of use.

## Features

* __User Authentication__: Login and signup pages with protected routes.
* __URL Management__: Shorten, edit, and delete URLs directly from the interface.
* __Error Handling__: Custom pages for "Not Found" and "URL Not Found" scenarios.
* __Responsive Design__: Mobile-first, responsive user interface.
* __Integrated Toast Notifications__: User feedback via `react-toastify`.

## Project Structure

The application follows a modular structure for scalability and maintainability:

```bash
src/
├── components/          # Reusable React components
├── contexts/            # Context providers for global state
├── pages/               # Page components for routes
├── styles/              # Global and component-specific styles
├── App.tsx              # Main app file
├── index.tsx            # React DOM entry point
└── utils/               # Utility functions
```

## Environment Variables

Create an `.env` file from the `.env.example`. Your env file should look like this:

```bash
VITE_APP_BASE_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:5050
```

* __VITE_APP_BASE_URL__: The base URL for the frontend.
* __VITE_API_BASE_URL__: The base URL for the backend API.

## Prerequisites

Ensure you have the following installed:

* Docker

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/DavidOmomia/deep-shortener-app.git
cd deep-shortener-app
```

2. Start the application with Docker and access the application at `http://localhost:3000`.


```bash
npm run docker:start
```

## Key Components

`App.tsx`

The root component initializes:

* __Routes__: Configures public and protected routes.
* __Auth Provider__: Manages user authentication state.
* __Toast Notifications__: Provides feedback to users.

## Key Routes

* `/login` - User login page.
* `/signup` - User signup page.
* `/url-not-found` - Page for invalid slugs.
* `/` - Protected route for the home page.







