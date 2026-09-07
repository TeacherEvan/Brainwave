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
        const numPlanets = Math.min(3 + level + Math.floor(Math.random() * 3), 12); // scales with level, capped at 12
        correctAnswer = numPlanets;

        for (let i = 0; i < numPlanets; i++) {
            createPlanet();
        }
    }

    function createPlanet() {
        const planet = document.createElement('div');
        planet.className = 'planet';
        
        // Enhanced color system with realistic planet colors
        const planetColors = [
            '#ff6b4a', // Mars red
            '#4a90ff', // Neptune blue  
            '#ffd700', // Venus gold
            '#ff4a6b', // Pink gas giant
            '#4aff90', // Terrestrial green
            '#9a4aff', // Purple gas giant
            '#ff9a4a', // Jupiter orange
            '#4affff', // Ice planet cyan
            '#ff4aff', // Magenta exotic
            '#90ff4a'  // Lime terrestrial
        ];
        
        const planetColor = planetColors[Math.floor(Math.random() * planetColors.length)];
        planet.style.color = planetColor;
        
        // Enhanced positioning with better collision avoidance
        const margin = 120; // Increased margin for UI and planet safety
        const planetSize = 60; // Current planet size
        const maxX = window.innerWidth - margin;
        const maxY = window.innerHeight - margin;
        const minX = margin;
        const minY = margin + 80; // Extra space for game UI
        
        let x, y;
        let attempts = 0;
        
        // Collision avoidance with existing planets
        do {
            x = Math.random() * (maxX - minX) + minX;
            y = Math.random() * (maxY - minY) + minY;
            attempts++;
        } while (attempts < 50 && isTooCloseToOtherPlanets(x, y, planetSize));
        
        // Enhanced movement physics
        const speedMultiplier = 0.5 + Math.random() * 1.5; // Varied speeds
        let dx = (Math.random() - 0.5) * 6 * speedMultiplier;
        let dy = (Math.random() - 0.5) * 6 * speedMultiplier;
        
        // Ensure minimum movement
        if (Math.abs(dx) < 1) dx = dx >= 0 ? 1 : -1;
        if (Math.abs(dy) < 1) dy = dy >= 0 ? 1 : -1;

        function movePlanet() {
            x += dx;
            y += dy;

            // Enhanced boundary collision with smooth bouncing
            if (x < minX || x > maxX) {
                dx *= -0.8; // Slight energy loss for realism
                x = Math.max(minX, Math.min(maxX, x));
            }
            if (y < minY || y > maxY) {
                dy *= -0.8;
                y = Math.max(minY, Math.min(maxY, y));
            }
            
            // Add slight gravitational drift towards center
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const gravityStrength = 0.01;
            
            dx += (centerX - x) * gravityStrength * 0.001;
            dy += (centerY - y) * gravityStrength * 0.001;
            
            // Apply maximum velocity limits
            const maxVelocity = 4;
            dx = Math.max(-maxVelocity, Math.min(maxVelocity, dx));
            dy = Math.max(-maxVelocity, Math.min(maxVelocity, dy));

            planet.style.left = `${x}px`;
            planet.style.top = `${y}px`;
        }

        let moveInterval = setInterval(movePlanet, 16); // ~60fps for smooth movement

        function handlePlanetClick(e) {
            e.preventDefault();
            e.stopPropagation();
            
            clearInterval(moveInterval);
            
            // Enhanced click coordinates handling
            const rect = planet.getBoundingClientRect();
            const clientX = rect.left + rect.width / 2;
            const clientY = rect.top + rect.height / 2;
            
            // Create spectacular destruction effects
            createPlanetDestructionEffect(clientX, clientY, planetColor);
            
            // Enhanced particle explosion
            for (let i = 0; i < 35; i++) {
                UI.createParticle(clientX, clientY, planetColor);
            }
            
            // Show hit character with planet-themed symbols
            UI.showHitChar(clientX, clientY);
            
            // Add screen shake effect
            createScreenShake();
            
            // Smooth removal animation
            planet.style.animation = 'planetDestruction 0.6s ease-out forwards';
            
            setTimeout(() => {
                planet.remove();
                const planetIndex = planets.indexOf(planet);
                if (planetIndex > -1) {
                    planets.splice(planetIndex, 1);
                }
                
                // Check if all planets are gone
                if (planets.length === 0) {
                    setTimeout(() => {
                        askQuestion();
                    }, 500); // Delay for dramatic effect
                }
            }, 300);
        }

        // Enhanced event handling for better touch support
        planet.addEventListener('click', handlePlanetClick);
        planet.addEventListener('touchstart', handlePlanetClick, { passive: false });
        
        // Add hover effects for desktop
        planet.addEventListener('mouseenter', () => {
            planet.style.filter = 'brightness(1.3) saturate(1.5)';
            planet.style.transform = 'scale(1.15)';
        });
        
        planet.addEventListener('mouseleave', () => {
            planet.style.filter = '';
            planet.style.transform = '';
        });

        planets.push(planet);
        planetArea.appendChild(planet);
        
        // Add entrance sound effect simulation
        planet.style.animation = 'planetSpawn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    // Helper function to check planet collision during creation
    function isTooCloseToOtherPlanets(x, y, size) {
        const minDistance = size * 1.5; // Minimum distance between planets
        
        return planets.some(existingPlanet => {
            const existingRect = existingPlanet.getBoundingClientRect();
            const existingX = existingRect.left + existingRect.width / 2;
            const existingY = existingRect.top + existingRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(x - existingX, 2) + Math.pow(y - existingY, 2)
            );
            
            return distance < minDistance;
        });
    }
    
    // Enhanced visual effects
    function createPlanetDestructionEffect(x, y, color) {
        // Create expanding shockwave
        const shockwave = document.createElement('div');
        shockwave.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            border: 3px solid ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: shockwaveExpansion 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        
        planetArea.appendChild(shockwave);
        
        setTimeout(() => {
            if (shockwave.parentNode) {
                shockwave.remove();
            }
        }, 800);
    }
    
    function createScreenShake() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.style.animation = 'screenShake 0.3s ease-out';
        
        setTimeout(() => {
            gameContainer.style.animation = '';
        }, 300);
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
