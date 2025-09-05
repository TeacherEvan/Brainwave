# 🧠 Brainwave - Educational Counting Game

<div align="center">

![Brainwave Logo](https://img.shields.io/badge/Brainwave-Educational%20Game-blue?style=for-the-badge&logo=game&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat-square&logo=python)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

*An interactive educational game designed to help children develop counting and cognitive skills*

</div>

## 🌟 Overview

Brainwave is an engaging educational game created in collaboration with SANGSOM Kindergarten students and Teacher Evan. The game helps children develop counting skills, hand-eye coordination, and cognitive abilities through interactive space-themed gameplay.

### 🎯 Game Objectives
- **Count and Click**: Players click on moving planets/dots to make them disappear
- **Memory Challenge**: After clearing all objects, players must recall how many they counted
- **Progressive Difficulty**: Each level increases complexity and challenge
- **Educational Value**: Reinforces number recognition and counting skills

## 🚀 Features

### Core Gameplay
- ✨ Interactive point-and-click mechanics
- 🪐 Space-themed visual design with animated planets
- 📊 Progressive scoring system
- ❤️ Lives-based challenge system
- 🎯 Multiple difficulty levels

### Visual Experience
- 🌌 Dynamic space background with animated starfield
- 🎨 Vibrant color schemes and particle effects
- ✨ Smooth animations and transitions
- 📱 Responsive design for multiple screen sizes
- 🎪 Engaging visual feedback on interactions

## 🏗️ Project Structure

```
Brainwave/
├── 📁 brainwave-web/          # Web version of the game
│   ├── index.html             # Main HTML file
│   └── assets/
│       ├── css/
│       │   └── style.css      # Enhanced styling
│       └── js/
│           ├── main.js        # Main game controller
│           ├── game.js        # Core game logic
│           └── ui.js          # UI management
├── 📁 src/                    # Python desktop version
│   ├── main.py               # Main game entry point
│   └── states/               # Game state management
├── 📄 Brainwave.txt          # Original Python game code
├── 📄 HTMLplan.md            # Web conversion plan
├── 📄 README.md              # This file
├── 📄 COPILOT_INSTRUCTIONS.md # Development guidelines
└── 📄 AUDIT_REPORT.md        # Project audit and analysis
```

## 🎮 How to Play

### Desktop Version (Python/Pygame)
1. **Prerequisites**: Python 3.x with Pygame installed
2. **Installation**: 
   ```bash
   pip install pygame
   ```
3. **Run the game**:
   ```bash
   python src/main.py
   ```

### Web Version
1. **Local Development**:
   ```bash
   cd brainwave-web
   # Serve with any HTTP server
   python -m http.server 8000
   # OR
   npx live-server
   ```
2. **Open**: Navigate to `http://localhost:8000`
3. **Play**: Click "Start Game" and follow the instructions

### Gameplay Instructions
1. 🎯 **Start**: Click the "Start Game" button
2. 📖 **Read Instructions**: Learn how to play
3. 🪐 **Count Planets**: Click on moving planets to make them disappear
4. 🧠 **Answer Question**: Select how many planets you counted
5. 📈 **Progress**: Advance through levels by answering correctly
6. ❤️ **Lives**: Incorrect answers cost lives - game ends at 0 lives

## 🎨 Visual Enhancements (300% Improvement)

### Recent Improvements
- 🌌 **Enhanced Space Theme**: Deep space gradient backgrounds with animated starfield
- ✨ **Particle Effects**: Dynamic particle systems on planet clicks
- 🎪 **Smooth Animations**: CSS3 animations for all interactive elements
- 🎨 **Modern UI Design**: Glassmorphism effects and neon-style glowing elements
- 📱 **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- 🌈 **Color Psychology**: Carefully chosen color palettes for educational environments

### Technical Enhancements
- **Performance**: Optimized animation rendering
- **Accessibility**: Enhanced contrast and text readability
- **User Experience**: Intuitive interaction patterns
- **Visual Feedback**: Immediate response to user actions

## 🛠️ Development

### Prerequisites
- Python 3.x (for desktop version)
- Modern web browser (for web version)
- Basic understanding of HTML/CSS/JavaScript

### Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/TeacherEvan/Brainwave.git
   cd Brainwave
   ```

2. **Desktop Development**:
   ```bash
   pip install pygame
   python src/main.py
   ```

3. **Web Development**:
   ```bash
   cd brainwave-web
   # Use any local server
   python -m http.server 8000
   ```

### Code Organization
- **Modular Architecture**: Separate concerns between game logic, UI, and main controller
- **Clean Code**: Well-commented and documented functions
- **Scalable Design**: Easy to add new features and levels

## 🎯 Educational Benefits

### Learning Outcomes
- **Number Recognition**: Visual and tactile number learning
- **Counting Skills**: Systematic counting practice
- **Hand-Eye Coordination**: Precise clicking and timing
- **Memory Development**: Recalling counted objects
- **Problem Solving**: Strategic thinking about answers

### Age Appropriateness
- **Target Age**: 4-8 years old
- **Skill Level**: Beginner to intermediate counting
- **Supervision**: Can be played independently or with guidance

## 🤝 Contributing

### Development Guidelines
See [COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md) for detailed development guidelines and best practices.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes following the coding standards
4. Test thoroughly
5. Submit a pull request

## 📊 Project Status

### Current Version: v2.0
- ✅ Desktop Python version complete
- ✅ Web version with enhanced visuals
- ✅ Mobile-responsive design
- ✅ Comprehensive documentation

### Roadmap
- 🔄 Android app packaging
- 📱 iOS compatibility
- 🎵 Sound effects and music
- 👥 Multiplayer support
- 📈 Progress tracking and analytics

## 🏫 Educational Partnership

This project was developed in collaboration with:
- **SANGSOM Kindergarten** - Student feedback and testing
- **Teacher Evan** - Educational design and development
- **Students** - Creative input and game testing

## 📄 License

This project is developed for educational purposes. Please respect the collaborative nature of the project and give appropriate credit when using or modifying the code.

## 🆘 Support

For questions, bug reports, or feature requests:
1. Create an issue in the GitHub repository
2. Contact Teacher Evan through the school
3. Check the [AUDIT_REPORT.md](AUDIT_REPORT.md) for known issues and solutions

---

<div align="center">

**Made with ❤️ for educational excellence**

*Brainwave - Where learning meets fun!*

</div>