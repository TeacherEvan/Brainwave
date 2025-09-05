const UI = (() => {
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const questionModal = document.getElementById('question-modal');
    const answerOptions = document.getElementById('answer-options');
    const gameContainer = document.getElementById('game-container');

    // Enhanced background generation
    function initializeBackground() {
        createAdvancedStarfield();
        createCosmicParticles();
        createNebulaEffects();
    }

    function createAdvancedStarfield() {
        // Clear existing stars
        const existingStars = gameContainer.querySelectorAll('.star');
        existingStars.forEach(star => star.remove());

        // Create diverse starfield
        for (let i = 0; i < 150; i++) {
            createStar();
        }
    }

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Determine star size category
        const random = Math.random();
        if (random < 0.1) {
            star.classList.add('large');
        } else if (random < 0.3) {
            star.classList.add('medium');
        } else {
            star.classList.add('small');
        }
        
        // Random positioning
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Varied animation delays for natural effect
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        gameContainer.appendChild(star);
    }

    function createCosmicParticles() {
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every interval
                const particle = document.createElement('div');
                particle.className = 'cosmic-particle';
                
                // Random horizontal starting position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = '100vh';
                
                // Random animation duration for variety
                particle.style.animationDuration = `${12 + Math.random() * 8}s`;
                
                gameContainer.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 20000);
            }
        }, 2000);
    }

    function createNebulaEffects() {
        // Create floating nebula-like effects
        for (let i = 0; i < 3; i++) {
            const nebula = document.createElement('div');
            nebula.className = 'nebula-effect';
            nebula.style.cssText = `
                position: absolute;
                width: ${200 + Math.random() * 300}px;
                height: ${200 + Math.random() * 300}px;
                background: radial-gradient(ellipse, 
                    rgba(108, 92, 231, 0.1) 0%, 
                    rgba(0, 180, 216, 0.05) 50%, 
                    transparent 100%);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: nebulaFloat ${20 + Math.random() * 10}s ease-in-out infinite alternate;
                pointer-events: none;
                z-index: -1;
            `;
            
            gameContainer.appendChild(nebula);
        }

        // Add nebula animation keyframes
        if (!document.querySelector('#nebula-style')) {
            const style = document.createElement('style');
            style.id = 'nebula-style';
            style.textContent = `
                @keyframes nebulaFloat {
                    0% { 
                        transform: translate(0, 0) rotate(0deg) scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                    100% { 
                        transform: translate(50px, -30px) rotate(180deg) scale(1.2);
                        opacity: 0.3;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function updateScore(score) {
        scoreElement.innerHTML = `
            <span class="icon"></span>
            <span>Score: ${score}</span>
        `;
        
        // Add score update animation
        scoreElement.style.animation = 'none';
        scoreElement.offsetHeight; // Trigger reflow
        scoreElement.style.animation = 'scoreUpdate 0.5s ease-out';
    }

    function updateLives(lives) {
        livesElement.innerHTML = `
            <span class="icon" style="background: linear-gradient(135deg, #ff6b6b, #ee5a24);"></span>
            <span>Lives: ${lives}</span>
        `;
        
        // Add lives update animation
        if (lives > 0) {
            livesElement.style.animation = 'livesUpdate 0.5s ease-out';
        } else {
            livesElement.style.animation = 'livesLost 1s ease-out';
        }
    }

    function showQuestionModal(correctAnswer, callback) {
        answerOptions.innerHTML = '';
        const options = generateOptions(correctAnswer);
        
        // Create enhanced option buttons
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.style.animationDelay = `${index * 0.1}s`;
            button.className = 'answer-option';
            
            button.addEventListener('click', (e) => {
                // Add click effect
                createClickEffect(e.clientX, e.clientY);
                
                // Animate modal close
                questionModal.style.animation = 'modalDisappear 0.4s ease-in forwards';
                
                setTimeout(() => {
                    questionModal.style.display = 'none';
                    questionModal.style.animation = '';
                    callback(option === correctAnswer);
                }, 400);
            });
            
            // Add hover sound effect simulation
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-5px) scale(1.08)';
            });
            
            answerOptions.appendChild(button);
        });
        
        questionModal.style.display = 'block';
        questionModal.style.animation = 'modalAppear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }

    function generateOptions(correctAnswer) {
        const options = [correctAnswer];
        const maxOption = Math.max(12, correctAnswer + 3);
        
        while (options.length < 4) {
            const option = Math.floor(Math.random() * maxOption) + 1;
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        return options.sort(() => Math.random() - 0.5);
    }

    function createParticle(x, y, color) {
        const particleCount = 25; // Increased particle count
        const particleTypes = ['fire', 'energy', 'cosmic'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${particleTypes[Math.floor(Math.random() * particleTypes.length)]}`;
            
            // Calculate random direction and distance
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const distance = 50 + Math.random() * 100;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            
            // Size variety
            const size = 4 + Math.random() * 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Starting position
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Custom animation properties
            particle.style.setProperty('--final-x', `${finalX}px`);
            particle.style.setProperty('--final-y', `${finalY}px`);
            particle.style.setProperty('--rotation', `${Math.random() * 360}deg`);
            
            // Dynamic animation with custom properties
            particle.style.animation = `
                advancedParticleBlast ${0.8 + Math.random() * 0.8}s 
                cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards
            `;
            
            gameContainer.appendChild(particle);
            
            // Cleanup
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 2000);
        }
    }

    function createClickEffect(x, y) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: clickRipple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        gameContainer.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    function showHitChar(x, y) {
        const chars = ['★', '✦', '◆', '◊', '○', '●', '◐', '◑', '◒', '◓', '⬟', '⬢', '⬡'];
        const char = document.createElement('div');
        char.className = 'hit-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = `${x}px`;
        char.style.top = `${y}px`;
        char.style.transform = 'translate(-50%, -50%)';
        
        // Random color variation
        const colors = ['var(--glow-primary)', 'var(--accent-yellow)', 'var(--accent-pink)', 'var(--accent-green)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        char.style.color = randomColor;
        char.style.textShadow = `0 0 20px ${randomColor}`;
        
        gameContainer.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode) {
                char.remove();
            }
        }, 1500);
    }

    // Add CSS animations for UI updates
    function addUIAnimations() {
        if (!document.querySelector('#ui-animations')) {
            const style = document.createElement('style');
            style.id = 'ui-animations';
            style.textContent = `
                @keyframes scoreUpdate {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); color: var(--accent-yellow); }
                    100% { transform: scale(1); }
                }
                
                @keyframes livesUpdate {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                @keyframes livesLost {
                    0% { transform: scale(1); }
                    25% { transform: scale(1.1); color: var(--glow-secondary); }
                    50% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
                
                @keyframes modalDisappear {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1) rotateY(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8) rotateY(45deg);
                    }
                }
                
                @keyframes clickRipple {
                    0% {
                        width: 10px;
                        height: 10px;
                        opacity: 0.8;
                    }
                    100% {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
                
                .answer-option {
                    animation: buttonAppear 0.5s ease-out backwards;
                }
                
                @keyframes buttonAppear {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize enhanced UI
    function init() {
        initializeBackground();
        addUIAnimations();
        
        // Add performance monitoring
        if (window.performance) {
            console.log('🌟 Brainwave Enhanced UI initialized');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { 
        updateScore, 
        updateLives, 
        showQuestionModal, 
        createParticle, 
        showHitChar,
        createClickEffect,
        initializeBackground
    };
})();
