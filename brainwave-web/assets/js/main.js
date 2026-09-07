document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const submitScoreButton = document.getElementById('submit-score-button');

    let gameState = 'welcome';
    let isTransitioning = false;

    // Enhanced screen transition system
    function showScreen(targetScreen, direction = 'forward') {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const currentScreen = document.querySelector('.screen.active');
        
        // Remove active class from all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Add transition classes
        if (currentScreen) {
            currentScreen.style.animation = direction === 'forward' 
                ? 'screenExitForward 0.5s ease-in-out forwards'
                : 'screenExitBackward 0.5s ease-in-out forwards';
        }
        
        // Show target screen with entrance animation
        setTimeout(() => {
            targetScreen.style.display = 'flex';
            targetScreen.classList.add('active');
            targetScreen.style.animation = direction === 'forward'
                ? 'screenEnterForward 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
                : 'screenEnterBackward 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            
            // Hide previous screen
            if (currentScreen) {
                setTimeout(() => {
                    currentScreen.style.display = 'none';
                    currentScreen.style.animation = '';
                }, 100);
            }
            
            setTimeout(() => {
                targetScreen.style.animation = '';
                isTransitioning = false;
            }, 600);
        }, currentScreen ? 200 : 0);
    }

    // Add enhanced button interactions
    function enhanceButton(button) {
        button.addEventListener('mouseenter', () => {
            if (!isTransitioning) {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!isTransitioning) {
                button.style.transform = '';
            }
        });
        
        button.addEventListener('mousedown', () => {
            if (!isTransitioning) {
                button.style.transform = 'translateY(-1px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseup', () => {
            if (!isTransitioning) {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
    }

    // Apply enhancements to all buttons
    [startButton, playButton, submitScoreButton].forEach(enhanceButton);

    // Enhanced event handlers with visual feedback
    startButton.addEventListener('click', (e) => {
        if (isTransitioning) return;
        
        // Create click effect
        UI.createClickEffect(e.clientX, e.clientY);
        
        // Add button press animation
        startButton.style.animation = 'buttonPress 0.2s ease-out';
        
        setTimeout(() => {
            gameState = 'instructions';
            showScreen(instructionsScreen, 'forward');
            startButton.style.animation = '';
        }, 200);
    });

    playButton.addEventListener('click', (e) => {
        if (isTransitioning) return;
        
        UI.createClickEffect(e.clientX, e.clientY);
        playButton.style.animation = 'buttonPress 0.2s ease-out';
        
        setTimeout(() => {
            gameState = 'game';
            showScreen(gameScreen, 'forward');
            playButton.style.animation = '';
            
            // Start game with a slight delay for smooth transition
            setTimeout(() => {
                Game.start(() => {
                    gameState = 'game-over';
                    showScreen(gameOverScreen, 'forward');
                });
            }, 300);
        }, 200);
    });

    submitScoreButton.addEventListener('click', (e) => {
        if (isTransitioning) return;
        
        const playerName = document.getElementById('player-name').value.trim();
        
        if (playerName === '') {
            // Add shake animation for empty name
            const nameInput = document.getElementById('player-name');
            nameInput.style.animation = 'inputShake 0.5s ease-in-out';
            nameInput.focus();
            setTimeout(() => {
                nameInput.style.animation = '';
            }, 500);
            return;
        }
        
        UI.createClickEffect(e.clientX, e.clientY);
        submitScoreButton.style.animation = 'buttonPress 0.2s ease-out';
        
        // Show success feedback
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            animation: successPop 2s ease-out forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        successMessage.textContent = `Thanks for playing, ${playerName}!`;
        gameOverScreen.appendChild(successMessage);
        
        setTimeout(() => {
            gameState = 'welcome';
            showScreen(welcomeScreen, 'backward');
            submitScoreButton.style.animation = '';
            
            // Clear the input and remove success message
            document.getElementById('player-name').value = '';
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 1000);
        }, 1500);
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;
        
        switch (e.key) {
            case 'Enter':
                if (gameState === 'welcome' && startButton.offsetParent !== null) {
                    startButton.click();
                } else if (gameState === 'instructions' && playButton.offsetParent !== null) {
                    playButton.click();
                } else if (gameState === 'game-over' && submitScoreButton.offsetParent !== null) {
                    submitScoreButton.click();
                }
                break;
            case 'Escape':
                if (gameState === 'game') {
                    // Pause game functionality could be added here
                    console.log('Game paused');
                }
                break;
        }
    });

    // Add loading animation for initial screen
    function initializeApp() {
        // Create loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const loadingRing = document.createElement('div');
        loadingRing.className = 'loading-ring';
        loadingScreen.appendChild(loadingRing);
        
        document.body.appendChild(loadingScreen);
        
        // Simulate loading time and initialize
        setTimeout(() => {
            loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
            showScreen(welcomeScreen);
            
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    }

    // Add CSS animations for screen transitions
    function addTransitionAnimations() {
        if (!document.querySelector('#transition-animations')) {
            const style = document.createElement('style');
            style.id = 'transition-animations';
            style.textContent = `
                @keyframes screenExitForward {
                    0% { opacity: 1; transform: translateX(0) scale(1); }
                    100% { opacity: 0; transform: translateX(-100px) scale(0.95); }
                }
                
                @keyframes screenEnterForward {
                    0% { opacity: 0; transform: translateX(100px) scale(0.95); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }
                
                @keyframes screenExitBackward {
                    0% { opacity: 1; transform: translateX(0) scale(1); }
                    100% { opacity: 0; transform: translateX(100px) scale(0.95); }
                }
                
                @keyframes screenEnterBackward {
                    0% { opacity: 0; transform: translateX(-100px) scale(0.95); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }
                
                @keyframes buttonPress {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
                
                @keyframes inputShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                
                @keyframes successPop {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.5); 
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.1); 
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.8); 
                    }
                }
                
                @keyframes fadeOut {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
                
                /* Enhanced focus styles for accessibility */
                button:focus {
                    outline: 3px solid var(--glow-primary);
                    outline-offset: 2px;
                }
                
                input:focus {
                    outline: 2px solid var(--glow-primary);
                    outline-offset: 1px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize the application
    addTransitionAnimations();
    initializeApp();
    
    console.log('🎮 Brainwave Enhanced Edition - Ready to Play!');
});
