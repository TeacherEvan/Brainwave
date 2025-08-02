
# Brainwave: HTML/Android Conversion Plan

## 1. Project Audit & Core Concepts

This document outlines the plan to convert the Python-based "Brainwave" game into a web-based application, suitable for deployment as a standalone website or packaged for Android devices.

The original game is a simple "count the objects" game with a space theme. The core gameplay loop involves:
1.  Displaying a number of "planets" on the screen.
2.  The user clicks on the planets to make them disappear.
3.  After all planets are gone, the user is asked how many planets there were.
4.  Answering correctly proceeds to the next level.
5.  Answering incorrectly results in a life loss.
6.  The game ends when the player runs out of lives.

## 2. Visual Design & Aesthetics

The goal is to create a visually appealing and modern experience. The current Pygame version is basic, so we will create a new visual identity.

*   **Theme:** A vibrant, "deep space" theme.
*   **Background:** A dynamic, animated starfield. We can use a subtle parallax effect to create a sense of depth.
*   **Planets:** Instead of simple colored circles, we'll use a variety of planet sprites with different colors and designs. These can be simple, clean vector graphics.
*   **UI Elements:** Buttons, modals, and text will have a clean, modern, and slightly futuristic look. We'll use a consistent color palette and typography.
*   **Animations:** Smooth animations and transitions will be used throughout the game to enhance the user experience. For example, planets will have a "pop" animation when clicked, and screen transitions will be faded.

## 3. Project Structure (Multi-Folder)

To ensure scalability and maintainability, the project will be organized into the following folder structure:

```
/brainwave-web/
|-- index.html
|-- /assets/
|   |-- /css/
|   |   |-- style.css
|   |-- /js/
|   |   |-- main.js
|   |   |-- game.js
|   |   |-- ui.js
|   |-- /images/
|   |   |-- planets/
|   |   |   |-- planet1.svg
|   |   |   |-- planet2.svg
|   |   |   |-- ...
|   |   |-- background.png
|   |-- /fonts/
|   |   |-- ...
|-- /src/
    |-- ... (if using a framework like React or Vue)
```

*   **`index.html`:** The main entry point of the application.
*   **`assets/css/style.css`:**  Contains all the styles for the game.
*   **`assets/js/`:**  Contains the JavaScript files.
    *   **`main.js`:**  The main game logic, including the state machine.
    *   **`game.js`:**  The core game state logic (planet generation, click handling, etc.).
    *   **`ui.js`:**  Handles UI updates, animations, and user interactions.
*   **`assets/images/`:**  Contains all the image assets.
*   **`assets/fonts/`:** Contains any custom fonts.
*   **`src/`:** This folder is reserved for a potential future migration to a framework like React or Vue.js if the project grows in complexity.

## 4. Conversion & Implementation Plan

The conversion process will be divided into two phases: **Review** and **Implementation**.

### Phase 1: Review & Asset Creation

1.  **Visual Asset Creation:** Create the visual assets for the game, including:
    *   Planet sprites (at least 5-6 variations).
    *   A high-quality space background image.
    *   Button and UI element designs.
2.  **HTML Structure:** Create the basic HTML structure in `index.html`. This will include the main game container and placeholders for the different game states (welcome, instructions, game, etc.).
3.  **CSS Styling:** Create the initial CSS in `style.css` to style the main layout, background, and typography.

### Phase 2: Implementation

1.  **State Machine:** Implement the game's state machine in `main.js`. This will handle transitions between the different game states.
2.  **Welcome & Instructions Screen:** Implement the welcome and instructions screens. This will involve creating the necessary HTML elements and using JavaScript to handle user input (e.g., clicking the "Start" button).
3.  **Game Logic:** Implement the core game logic in `game.js`. This will include:
    *   Generating and displaying the planets.
    *   Handling user clicks on the planets.
    *   Implementing the question/answer mechanic.
    *   Tracking the score and lives.
4.  **UI & Animations:** Implement the UI updates and animations in `ui.js`. This will include:
    *   Updating the score and lives display.
    *   Animating the planets when they are clicked.
    *   Creating smooth transitions between game states.
5.  **High Scores:** The high score feature will not be implemented in this initial version to focus on the core gameplay and visuals.
6.  **User Profiles:** User profiles will not be implemented in this version.

## 5. Android Packaging

Once the web application is complete and tested, we will use a tool like [Capacitor](https://capacitorjs.com/) or [Cordova](https://cordova.apache.org/) to package the web application as a native Android app. This will involve:

1.  Initializing a new Capacitor/Cordova project.
2.  Copying the web application files into the project.
3.  Configuring the project for Android (e.g., setting the app name, icon, etc.).
4.  Building the Android app.

This plan provides a clear roadmap for converting the "Brainwave" game into a modern, visually appealing web application. By following this plan, we can ensure that the final product is well-structured, maintainable, and provides a great user experience.
