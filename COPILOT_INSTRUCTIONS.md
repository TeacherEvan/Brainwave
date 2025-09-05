# 🤖 Copilot Instructions & Development Best Practices

## Project Context
You are working on **Brainwave**, an educational counting game designed for children aged 4-8. This project was created in collaboration with SANGSOM Kindergarten and Teacher Evan. The project includes both a Python/Pygame desktop version and a modern web-based version.

## 🎯 Project Goals & Values

### Educational Focus
- **Primary Goal**: Help children develop counting and cognitive skills
- **Age Appropriateness**: All features must be suitable for ages 4-8
- **Accessibility**: Code should support inclusive design principles
- **Safety**: No external dependencies that could pose security risks

### Code Quality Standards
- **Readability**: Code should be clear enough for educators to understand
- **Maintainability**: Easy for other developers to modify and extend
- **Performance**: Smooth operation on school computers and tablets
- **Documentation**: Every function and feature should be well-documented

## 🏗️ Architecture Guidelines

### File Organization
```
brainwave-web/
├── index.html          # Main entry point - keep minimal and semantic
├── assets/
│   ├── css/
│   │   └── style.css   # All styles - organized by component
│   └── js/
│       ├── main.js     # App initialization and state management
│       ├── game.js     # Core game logic and mechanics
│       └── ui.js       # User interface and visual effects
```

### Code Structure Principles

#### JavaScript Modules
- **IIFE Pattern**: Use Immediately Invoked Function Expressions for modules
- **Namespace Protection**: Avoid global variable pollution
- **Single Responsibility**: Each module handles one primary concern
- **Clear Interfaces**: Expose only necessary functions publicly

#### CSS Organization
- **Component-Based**: Group styles by UI component
- **Progressive Enhancement**: Base styles first, then enhancements
- **Responsive First**: Mobile-first design approach
- **Performance**: Optimize for CSS animation performance

## 🎨 Visual Design Guidelines

### Color Psychology for Education
- **Calming Blues**: Primary backgrounds to reduce anxiety
- **Energetic Accents**: Bright colors for interactive elements
- **High Contrast**: Ensure readability for all users
- **Consistent Palette**: Limit color choices for visual harmony

### Animation Principles
- **Smooth Performance**: 60fps target for all animations
- **Educational Value**: Animations should reinforce learning
- **Accessibility**: Respect `prefers-reduced-motion` settings
- **Timing**: Quick feedback (< 200ms), longer for transitions (300-500ms)

### Responsive Design
- **Mobile First**: Design for touch interactions primarily
- **Tablet Optimized**: Perfect for classroom tablet use
- **Desktop Enhanced**: Take advantage of larger screens
- **Cross-Browser**: Test in Chrome, Firefox, Safari, Edge

## 🔧 Development Best Practices

### JavaScript Coding Standards

#### Function Design
```javascript
// ✅ Good: Clear, single purpose, well-documented
/**
 * Creates a new planet element with physics and click handling
 * @param {number} x - Initial X position
 * @param {number} y - Initial Y position
 * @param {string} color - Hex color code
 * @returns {HTMLElement} The created planet element
 */
function createPlanet(x, y, color) {
    // Implementation
}

// ❌ Avoid: Unclear purpose, multiple responsibilities
function doStuff(a, b, c) {
    // Multiple unrelated operations
}
```

#### Event Handling
```javascript
// ✅ Good: Clean event delegation and error handling
function handlePlanetClick(event) {
    try {
        event.preventDefault();
        const planet = event.target;
        removePlanet(planet);
        updateScore();
    } catch (error) {
        console.error('Error handling planet click:', error);
    }
}

// ❌ Avoid: Inline event handlers and missing error handling
onClick="score++" // Don't do this
```

#### Performance Considerations
```javascript
// ✅ Good: Efficient DOM operations
const fragment = document.createDocumentFragment();
planets.forEach(planetData => {
    fragment.appendChild(createPlanet(planetData));
});
container.appendChild(fragment);

// ❌ Avoid: Multiple DOM reflows
planets.forEach(planetData => {
    container.appendChild(createPlanet(planetData)); // Causes reflow each time
});
```

### CSS Best Practices

#### Animation Performance
```css
/* ✅ Good: Hardware accelerated properties */
.planet {
    transform: translateX(0);
    opacity: 1;
    transition: transform 0.3s ease-out;
}

.planet:hover {
    transform: translateX(10px) scale(1.1);
}

/* ❌ Avoid: Layout-triggering properties */
.planet {
    left: 0;
    width: 50px;
    transition: left 0.3s, width 0.3s; /* Causes layout recalculation */
}
```

#### Responsive Units
```css
/* ✅ Good: Flexible, scalable units */
.button {
    padding: 1rem 2rem;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    margin: 0.5rem;
}

/* ❌ Avoid: Fixed pixel values for everything */
.button {
    padding: 16px 32px;
    font-size: 24px;
    margin: 8px;
}
```

### HTML Semantic Guidelines
```html
<!-- ✅ Good: Semantic, accessible markup -->
<main id="game-container" role="application" aria-label="Brainwave Counting Game">
    <section id="game-area" aria-live="polite">
        <h2 class="sr-only">Game Area</h2>
        <!-- Game content -->
    </section>
    <aside id="score-panel" aria-label="Game Statistics">
        <!-- Score and lives -->
    </aside>
</main>

<!-- ❌ Avoid: Generic divs without semantic meaning -->
<div id="container">
    <div id="area">
        <!-- Content without context -->
    </div>
</div>
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] **Functionality**: All game mechanics work correctly
- [ ] **Responsive**: Test on mobile, tablet, and desktop
- [ ] **Performance**: Smooth animations at 60fps
- [ ] **Accessibility**: Keyboard navigation and screen reader support
- [ ] **Cross-Browser**: Chrome, Firefox, Safari, Edge compatibility

### Educational Testing
- [ ] **Age Appropriateness**: Suitable for target age group
- [ ] **Learning Objectives**: Supports educational goals
- [ ] **Engagement**: Maintains child interest
- [ ] **Frustration Level**: Challenging but not overwhelming

## 🔍 Code Review Guidelines

### What to Look For
1. **Educational Value**: Does this change support learning?
2. **Code Quality**: Is it readable and maintainable?
3. **Performance**: Will this run smoothly on school devices?
4. **Accessibility**: Can all children use this feature?
5. **Safety**: No security vulnerabilities or inappropriate content?

### Review Checklist
- [ ] Code follows project style guidelines
- [ ] Functions are well-documented
- [ ] No hardcoded values (use constants)
- [ ] Error handling is implemented
- [ ] Performance impact is considered
- [ ] Accessibility standards are met

## 🚀 Deployment Best Practices

### Pre-Deployment Checklist
- [ ] All console.log statements removed or properly managed
- [ ] CSS and JS are minified for production
- [ ] Images are optimized for web
- [ ] HTTPS is configured
- [ ] Loading performance is optimized

### Monitoring
- Track key metrics for educational effectiveness:
  - Time spent per level
  - Accuracy rates
  - Engagement patterns
  - Technical performance

## 🔧 Common Issues & Solutions

### Performance Issues
**Problem**: Animations are choppy
**Solution**: Use `transform` and `opacity` for animations, avoid layout properties

**Problem**: Too many DOM elements
**Solution**: Use object pooling for frequently created/destroyed elements

### Educational Concerns
**Problem**: Game is too difficult
**Solution**: Implement adaptive difficulty based on player performance

**Problem**: Children lose interest
**Solution**: Add more visual feedback and celebration animations

### Accessibility Issues
**Problem**: Cannot use with keyboard
**Solution**: Implement comprehensive keyboard navigation

**Problem**: Difficult to see for some users
**Solution**: Ensure WCAG 2.1 AA compliance for contrast and sizing

## 📚 Resources

### Educational Game Design
- [Educational Game Design Best Practices](https://en.wikipedia.org/wiki/Educational_game)
- [Child-Computer Interaction Guidelines](https://www.interaction-design.org/literature/topics/child-computer-interaction)

### Technical Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Animation Performance](https://web.dev/animations/)

### Testing Tools
- Chrome DevTools for performance analysis
- WAVE Web Accessibility Evaluator
- Lighthouse for overall quality assessment

## 🤝 Collaboration Guidelines

### Communication
- **Clear Commit Messages**: Describe what and why, not just what
- **Pull Request Descriptions**: Include context and testing notes
- **Code Comments**: Explain complex educational logic
- **Issue Reporting**: Include reproduction steps and educational impact

### Documentation
- Update README.md for significant changes
- Maintain inline documentation
- Keep this guide updated with new patterns
- Document educational rationale for features

---

Remember: This is an educational project that impacts children's learning. Every code change should consider both technical excellence and educational value. When in doubt, prioritize simplicity, accessibility, and educational effectiveness over complex features.