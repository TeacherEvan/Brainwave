const UI = (() => {
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const questionModal = document.getElementById('question-modal');
    const answerOptions = document.getElementById('answer-options');
    const gameContainer = document.getElementById('game-container');

    function updateScore(score) {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateLives(lives) {
        livesElement.textContent = `Lives: ${lives}`;
    }

    function showQuestionModal(correctAnswer, callback) {
        answerOptions.innerHTML = '';
        const options = generateOptions(correctAnswer);
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                questionModal.style.display = 'none';
                callback(option === correctAnswer);
            });
            answerOptions.appendChild(button);
        });
        questionModal.style.display = 'block';
    }

    function generateOptions(correctAnswer) {
        const options = [correctAnswer];
        while (options.length < 4) {
            const option = Math.floor(Math.random() * 10) + 1;
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        return options.sort(() => Math.random() - 0.5);
    }

    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = color;
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        particle.style.setProperty('--angle', `${angle}deg`);
        particle.style.setProperty('--distance', `${distance}px`);
        gameContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        gameContainer.appendChild(star);
    }

    function showHitChar(x, y) {
        const char = document.createElement('div');
        char.className = 'hit-char';
        const chars = '123456789ABCDEFGHIJK';
        char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
        char.style.left = `${x}px`;
        char.style.top = `${y}px`;
        gameContainer.appendChild(char);
        setTimeout(() => char.remove(), 1000);
    }

    for (let i = 0; i < 50; i++) {
        createStar();
    }

    return { updateScore, updateLives, showQuestionModal, createParticle, showHitChar };
})();
