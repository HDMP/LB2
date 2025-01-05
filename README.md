# LB2 - Chat Application

Welcome to the LB2 - Chat Application, a real-time web-based chat platform designed for seamless user communication. This application was created as part of a learning exercise to explore and implement modern front-end technologies.

## Project Overview

The LB2 Chat Application allows users to:
- Register and log in securely.
- Send and receive messages in real-time using WebSocket technology.
- View and update their profile.
- Monitor the online status of other users.

This project was built with Vue 3, Vite, and WebSocket APIs, and features light and dark modes for improved user experience. It was developed with a strong focus on learning modern front-end technologies.

## Features

- **User Authentication:** Secure login and registration system.
- **Real-Time Messaging:** Send and receive instant messages using WebSockets.
- **Responsive UI:** Optimized for all screen sizes.
- **Light and Dark Mode:** Toggle between modern light and dark themes.
- **Online Status Tracking:** Real-time updates on user activity (online/offline).
- **Profile Management:** Update username and password directly from the app.

## Built With

- **Vue 3:** Reactive and declarative framework for modern UIs.
- **Vite:** Lightning-fast development server and build tool.
- **Vue Router:** Front-end routing for dynamic navigation.
- **WebSockets:** For real-time, bidirectional communication.
- **CSS Variables:** Used to enable seamless light and dark mode support.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16+ recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/HDMP/WanjaHaldemann-23B-WEB-LB2.git
    ```

2. Install dependencies:
    ```sh
    npm install
    npm install vite --save-dev
    npm install @vitejs/plugin-vue
    npm install vue-router
    npm install vue@next
    npm install eslint --save-dev
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. Open the app in your browser:
    ```sh
    http://localhost:3000
    ```

## Project Folder Structure

Below is a simplified view of the folder structure:

 ```sh
LB2/
├── src/
│ ├── assets/
│ │ ├── css/ # Global and scoped styles
│ │ ├── images/ # Static images (optional)
│ ├── components/ # Vue components
│ ├── composables/ # Reusable logic (e.g., useChat, useSidebar)
│ ├── router/ # Vue Router configuration
│ ├── services/ # API and WebSocket service files
│ ├── views/ # Page-level components
│ ├── App.vue # Root component
│ ├── main.js # Application entry point
├── package.json # Project metadata and dependencies
```

## Learning and AI Integration

This project was built as a learning tool with assistance from AI technologies:
- **AI Tools:** Helped in structuring the application, debugging, and suggesting best practices.

### Learning Goals:
- Hands-on experience with Vue.js and its ecosystem.
- Deep dive into WebSocket implementation for real-time communication.
- Styling best practices using CSS variables and scoped styles.

While AI played a role in speeding up development, manual adjustments and custom logic were implemented to ensure functionality and creativity.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## Acknowledgments

A special thanks to AI tools for enabling efficient development and providing valuable learning opportunities. This project showcases how AI and developers can collaborate to create functional, modern applications.
