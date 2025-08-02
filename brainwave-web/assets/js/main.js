document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const submitScoreButton = document.getElementById('submit-score-button');

    let gameState = 'welcome';

    function showScreen(screen) {
        welcomeScreen.style.display = 'none';
        instructionsScreen.style.display = 'none';
        gameScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        screen.style.display = 'flex';
    }

    startButton.addEventListener('click', () => {
        gameState = 'instructions';
        showScreen(instructionsScreen);
    });

    playButton.addEventListener('click', () => {
        gameState = 'game';
        showScreen(gameScreen);
        Game.start(() => {
            gameState = 'game-over';
            showScreen(gameOverScreen);
        });
    });

    submitScoreButton.addEventListener('click', () => {
        const playerName = document.getElementById('player-name').value;
        alert(`High score for ${playerName}: ${Game.getScore()}`);
        gameState = 'welcome';
        showScreen(welcomeScreen);
    });

    showScreen(welcomeScreen);
});
