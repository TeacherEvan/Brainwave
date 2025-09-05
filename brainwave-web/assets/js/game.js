const Game = (() => {
    let score = 0;
    let lives = 3;
    let level = 1;
    let planets = [];
    let correctAnswer = 0;
    let gameOverCallback;

    const planetArea = document.getElementById('planet-area');

    function start(callback) {
        gameOverCallback = callback;
        score = 0;
        lives = 3;
        level = 1;
        UI.updateScore(score);
        UI.updateLives(lives);
        startLevel();
    }

    function startLevel() {
        planets = [];
        planetArea.innerHTML = '';
        const numPlanets = Math.floor(Math.random() * 5) + 3; // 3-7 planets
        correctAnswer = numPlanets;

        for (let i = 0; i < numPlanets; i++) {
            createPlanet();
        }
    }

    function createPlanet() {
        const planet = document.createElement('div');
        planet.className = 'planet';
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        planet.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Ensure planets stay within visible area (account for UI and planet size)
        const margin = 100; // Space for UI elements and planet size
        const planetSize = 50; // Assumed planet size in px
        const maxX = window.innerWidth - margin; // Account for margin
        const maxY = window.innerHeight - margin;
        const minX = margin / 2; // Use half margin for left boundary
        const minY = margin; // Use margin for top boundary
        
        let x = Math.random() * (maxX - minX) + minX;
        let y = Math.random() * (maxY - minY) + minY;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        function movePlanet() {
            x += dx;
            y += dy;

            if (x < minX || x > maxX) dx *= -1;
            if (y < minY || y > maxY) dy *= -1;

            planet.style.left = `${x}px`;
            planet.style.top = `${y}px`;
        }

        let moveInterval = setInterval(movePlanet, 20);

        function handlePlanetClick(e) {
            e.preventDefault();
            clearInterval(moveInterval);
            
            // Get click coordinates (handle both mouse and touch events)
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            // Create particle effects
            for (let i = 0; i < 20; i++) {
                UI.createParticle(clientX, clientY, planet.style.backgroundColor);
            }
            UI.showHitChar(clientX, clientY);
            
            // Remove the planet from DOM and array
            planet.remove();
            const planetIndex = planets.indexOf(planet);
            if (planetIndex > -1) {
                planets.splice(planetIndex, 1);
            }
            
            // Check if all planets are gone
            if (planets.length === 0) {
                askQuestion();
            }
        }

        // Add both click and touchstart event listeners
        planet.addEventListener('click', handlePlanetClick);
        planet.addEventListener('touchstart', handlePlanetClick);

        planets.push(planet);
        planetArea.appendChild(planet);
    }

    function askQuestion() {
        UI.showQuestionModal(correctAnswer, handleAnswer);
    }

    function handleAnswer(isCorrect) {
        if (isCorrect) {
            score += 10;
            level++;
            UI.updateScore(score);
            startLevel();
        } else {
            lives--;
            UI.updateLives(lives);
            if (lives > 0) {
                startLevel();
            } else {
                gameOverCallback();
            }
        }
    }

    function getScore() {
        return score;
    }

    return { start, getScore };
})();
