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
        let x = Math.random() * (window.innerWidth - 50);
        let y = Math.random() * (window.innerHeight - 50);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        function movePlanet() {
            x += dx;
            y += dy;

            if (x < 0 || x > window.innerWidth - 50) dx *= -1;
            if (y < 0 || y > window.innerHeight - 50) dy *= -1;

            planet.style.left = `${x}px`;
            planet.style.top = `${y}px`;
        }

        let moveInterval = setInterval(movePlanet, 20);

        planet.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click events from firing
            clearInterval(moveInterval);
            for (let i = 0; i < 20; i++) {
                UI.createParticle(e.touches[0].clientX, e.touches[0].clientY, planet.style.backgroundColor);
            }
            UI.showHitChar(e.touches[0].clientX, e.touches[0].clientY);
            planet.remove();
            planets.pop();
            if (planets.length === 0) {
                askQuestion();
            }
        });

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
