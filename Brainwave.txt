import pygame
import sys
import random
import os
import time

pygame.init()

# Get the display info
infoObject = pygame.display.Info()
SCREEN_WIDTH = infoObject.current_w
SCREEN_HEIGHT = infoObject.current_h

# Reference resolution for scaling
REF_WIDTH = 800
REF_HEIGHT = 600

# Scaling factors
scale_x = SCREEN_WIDTH / REF_WIDTH
scale_y = SCREEN_HEIGHT / REF_HEIGHT
scale = min(scale_x, scale_y)  # Use the smaller scale to maintain aspect ratio

# Colors (R, G, B)
WHITE  = (255, 255, 255)
BLACK  = (0, 0, 0)
RED    = (255, 0, 0)
BLUE   = (0, 0, 255)
GREEN  = (0, 255, 0)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
PINK   = (255, 192, 203)

# Colors for background transition
BACKGROUND_COLORS = [RED, BLUE, PURPLE, GREEN, PINK]

# Background and text colors
BG_COLOR   = BLACK
TEXT_COLOR = WHITE

# Screen setup
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT), pygame.FULLSCREEN)
pygame.display.set_caption('BrainWave')

def get_font(size):
    return pygame.font.Font(None, int(size * scale))

class Dot:
    def __init__(self, position, color, shape='circle'):
        self.position = list(position)
        self.color = color
        self.radius = int(15 * scale)
        self.click_radius = self.radius + int(10 * scale)
        self.shape = shape  # 'circle' or 'square'

        # Start with zero velocity
        self.dx = 0
        self.dy = 0

        # Possible velocities
        self.possible_velocities = [-3, -2, -1, 1, 2, 3]

    def assign_random_velocity(self):
        self.dx = random.choice(self.possible_velocities) * scale
        self.dy = random.choice(self.possible_velocities) * scale

    def move(self):
        self.position[0] += self.dx
        self.position[1] += self.dy

        # Screen boundaries
        if self.position[0] <= self.radius or self.position[0] >= SCREEN_WIDTH - self.radius:
            self.dx = -self.dx
        if self.position[1] <= self.radius or self.position[1] >= SCREEN_HEIGHT - self.radius:
            self.dy = -self.dy

    def check_collision(self, other_dot):
        distance = ((self.position[0] - other_dot.position[0]) ** 2 +
                    (self.position[1] - other_dot.position[1]) ** 2) ** 0.5
        if distance <= self.radius + other_dot.radius:
            # Swap velocities
            self.dx, other_dot.dx = other_dot.dx, self.dx
            self.dy, other_dot.dy = other_dot.dy, self.dy

    def draw(self, surface):
        if self.shape == 'circle':
            pygame.draw.circle(surface, self.color, (int(self.position[0]), int(self.position[1])), self.radius)
        elif self.shape == 'square':
            rect_side = self.radius * 2  # Diameter equivalent
            rect = pygame.Rect(int(self.position[0] - self.radius),
                               int(self.position[1] - self.radius),
                               rect_side,
                               rect_side)
            pygame.draw.rect(surface, self.color, rect)

def invert_color(color):
    if color == WHITE:
        return BLACK
    elif color == BLACK:
        return WHITE
    else:
        return color  # Keep other colors the same

def display_feedback(color):
    flash_duration = 500  # Duration in milliseconds
    flash_start_time = pygame.time.get_ticks()
    while pygame.time.get_ticks() - flash_start_time < flash_duration:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
        # Fill the screen with the feedback color
        screen.fill(color)
        pygame.display.update()
        pygame.time.delay(10)  # Brief delay to control frame rate

def welcome_screen():
    running = True
    clock = pygame.time.Clock()

    # Variables for the fading effect of "SANGSOM Kindergarten"
    fade_value = 0
    fade_direction = 1  # 1 for increasing brightness, -1 for decreasing
    fade_speed = 3  # Adjusts how quickly the color fades

    # Fonts
    font_welcome = get_font(100)
    font_medium = get_font(48)
    font_small = get_font(28)
    font_bold = get_font(28)
    font_bold.set_bold(True)

    while running:
        screen.fill(BG_COLOR)

        # Adjust fade value
        fade_value += fade_direction * fade_speed
        if fade_value >= 100:
            fade_value = 100
            fade_direction = -1
        elif fade_value <= 0:
            fade_value = 0
            fade_direction = 1

        # Calculate the current yellow color for fading effect
        current_yellow = (
            255,
            255,
            int(153 + (fade_value / 100) * (0 - 153))  # From bright yellow to light yellow
        )

        # Welcome text
        welcome_text = font_welcome.render('Welcome!', True, TEXT_COLOR)
        welcome_rect = welcome_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - int(100 * scale)))
        screen.blit(welcome_text, welcome_rect)

        # Click to Start text
        click_text = font_medium.render('Click to Start', True, TEXT_COLOR)
        click_rect = click_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        pygame.draw.rect(screen, TEXT_COLOR, click_rect.inflate(int(20 * scale), int(10 * scale)), int(2 * scale))
        screen.blit(click_text, click_rect)

        # Created by Teacher Evan
        created_text = font_small.render('Created by Teacher Evan', True, TEXT_COLOR)
        created_rect = created_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - int(120 * scale)))
        screen.blit(created_text, created_rect)

        # Collaboration message
        collaboration_text = 'In collaboration with the students of'
        collaboration_render = font_small.render(collaboration_text, True, TEXT_COLOR)
        collaboration_rect = collaboration_render.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - int(80 * scale)))
        screen.blit(collaboration_render, collaboration_rect)

        # "SANGSOM Kindergarten" with fading effect
        sangsom_text = 'SANGSOM Kindergarten'
        sangsom_render = font_bold.render(sangsom_text, True, current_yellow)
        sangsom_rect = sangsom_render.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - int(50 * scale)))
        screen.blit(sangsom_render, sangsom_rect)

        # Draw the dynamic title at the top
        draw_title('BrainWave', int(20 * scale))

        pygame.display.update()

        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                running = False
        clock.tick(60)  # Maintain 60 FPS

def instructions_screen():
    running = True
    clock = pygame.time.Clock()
    font_large = get_font(48)

    while running:
        screen.fill(BG_COLOR)

        # Instructions text
        instructions = ["Click and count the dots!"]

        start_y = SCREEN_HEIGHT // 2 - int(50 * scale)
        for line in instructions:
            text = font_large.render(line, True, TEXT_COLOR)
            text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, start_y))
            screen.blit(text, text_rect)
            start_y += int(50 * scale)

        # Draw the dynamic title at the bottom
        draw_title('BrainWave', SCREEN_HEIGHT - int(60 * scale))
        pygame.display.update()

        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                running = False
        clock.tick(60)  # Maintain 60 FPS

def draw_title(text, y_position):
    font = get_font(74)
    char_surfaces = []
    total_width = 0
    # Colors for blinking title
    title_colors = [RED, BLUE, YELLOW, PURPLE]

    for char in text:
        color = random.choice(title_colors)
        char_surface = font.render(char, True, color)
        char_surfaces.append(char_surface)
        total_width += char_surface.get_width()

    x = (SCREEN_WIDTH - total_width) // 2

    for char_surface in char_surfaces:
        char_rect = char_surface.get_rect(topleft=(x, y_position))
        screen.blit(char_surface, char_rect)
        x += char_rect.width

def load_high_scores():
    high_scores = []
    if os.path.exists('highscores.txt'):
        with open('highscores.txt', 'r') as f:
            for line in f:
                parts = line.strip().split(',')
                if len(parts) == 2:
                    name, score_value = parts
                    high_scores.append((name, int(score_value)))
    return high_scores

def save_high_score(name, score):
    high_scores = load_high_scores()
    high_scores.append((name, score))
    # Keep only top 5 scores
    high_scores = sorted(high_scores, key=lambda x: x[1], reverse=True)[:5]
    with open('highscores.txt', 'w') as f:
        for entry in high_scores:
            f.write(f"{entry[0]},{entry[1]}\n")

def display_high_scores():
    running = True
    clock = pygame.time.Clock()
    font_title = get_font(72)
    font_entry = get_font(48)
    high_scores = load_high_scores()

    while running:
        screen.fill(BG_COLOR)

        # Title
        title_text = font_title.render('High Scores', True, TEXT_COLOR)
        title_rect = title_text.get_rect(center=(SCREEN_WIDTH // 2, int(100 * scale)))
        screen.blit(title_text, title_rect)

        # Display high scores
        start_y = int(200 * scale)
        for index, (name, score) in enumerate(high_scores):
            entry_text = font_entry.render(f"{index + 1}. {name}: {score}", True, TEXT_COLOR)
            entry_rect = entry_text.get_rect(center=(SCREEN_WIDTH // 2, start_y))
            screen.blit(entry_text, entry_rect)
            start_y += int(50 * scale)

        # Prompt to restart
        prompt_text = font_entry.render('Click to Play Again', True, TEXT_COLOR)
        prompt_rect = prompt_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - int(100 * scale)))
        screen.blit(prompt_text, prompt_rect)

        pygame.display.update()

        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                # Restart the game
                welcome_screen()
                instructions_screen()
                game_loop()
        clock.tick(60)

def game_loop():
    running = True
    clock = pygame.time.Clock()
    score = 0
    level = 1
    lives = 3  # Starting lives

    # Fonts
    font_small = get_font(36)
    font_medium = get_font(48)
    font_large = get_font(72)

    # Initialize variables
    first_click = False
    question_asked = False

    # Generate dots without velocities
    min_dots = 6
    max_dots = 12
    num_dots = random.randint(min_dots, max_dots)

    dots = []
    for _ in range(num_dots):
        radius = int(15 * scale)
        x = random.randint(radius, SCREEN_WIDTH - radius)
        y = random.randint(radius, SCREEN_HEIGHT - radius)
        color = random.choice(BACKGROUND_COLORS)
        dot = Dot((x, y), color)
        # Do not assign velocity yet
        dots.append(dot)

    # Game state
    state = 'playing'  # Can be 'playing', 'question', 'game_over', 'enter_name'

    # For question
    clickable_numbers = []  # The hopping numbers as options
    correct_answer = num_dots

    # Initialize background fading variables
    bg_color_index = 0
    fade_step = 0
    fade_max = 100  # Number of steps in fading
    fade_direction = 1  # 1 for forward, -1 for reverse

    player_name = ""

    # Timer for answer squares movement
    answer_move_timer = 0
    answer_started_moving = False

    while running:
        # Handle background color fading only after first click
        if first_click and state == 'playing':
            fade_step += fade_direction
            if fade_step >= fade_max:
                fade_step = 0
                bg_color_index = (bg_color_index + 1) % len(BACKGROUND_COLORS)
            color1 = BACKGROUND_COLORS[bg_color_index]
            color2 = BACKGROUND_COLORS[(bg_color_index + 1) % len(BACKGROUND_COLORS)]
            fade_ratio = fade_step / fade_max
            current_bg_color = (
                int(color1[0] * (1 - fade_ratio) + color2[0] * fade_ratio),
                int(color1[1] * (1 - fade_ratio) + color2[1] * fade_ratio),
                int(color1[2] * (1 - fade_ratio) + color2[2] * fade_ratio),
            )
        else:
            # Use black background before first click and during the question screen
            current_bg_color = BG_COLOR

        screen.fill(current_bg_color)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()

            if state == 'playing':
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pos = pygame.mouse.get_pos()
                    for dot in dots[:]:
                        distance = ((pos[0] - dot.position[0]) ** 2 + (pos[1] - dot.position[1]) ** 2) ** 0.5
                        if distance <= dot.click_radius:
                            dots.remove(dot)
                            score += 1

                            if not first_click:
                                first_click = True
                                # Assign velocities to remaining dots
                                for remaining_dot in dots:
                                    remaining_dot.assign_random_velocity()

                            break  # Exit the loop since we found the clicked dot

                    if not dots and not question_asked:
                        state = 'question'
                        clickable_numbers = generate_clickable_numbers(correct_answer)
                        question_asked = True
                        answer_move_timer = pygame.time.get_ticks()
                        answer_started_moving = False  # Reset movement flag

            elif state == 'question':
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pos = pygame.mouse.get_pos()
                    for number_dot in clickable_numbers:
                        rect_side = number_dot.radius * 2
                        rect = pygame.Rect(int(number_dot.position[0] - number_dot.radius),
                                           int(number_dot.position[1] - number_dot.radius),
                                           rect_side,
                                           rect_side)
                        if rect.collidepoint(pos):
                            if number_dot.value == correct_answer:
                                # Correct answer
                                display_feedback(GREEN)
                                state = 'playing'
                                level += 1
                                first_click = False
                                question_asked = False
                                # Generate new dots for next level (without velocity)
                                num_dots = random.randint(min_dots, max_dots)
                                correct_answer = num_dots
                                dots = []
                                for _ in range(num_dots):
                                    radius = int(15 * scale)
                                    x = random.randint(radius, SCREEN_WIDTH - radius)
                                    y = random.randint(radius, SCREEN_HEIGHT - radius)
                                    color = random.choice(BACKGROUND_COLORS)
                                    dot = Dot((x, y), color)
                                    # Do not assign velocity yet
                                    dots.append(dot)
                                clickable_numbers = []
                            else:
                                # Incorrect answer
                                display_feedback(RED)
                                score -= 10  # Deduct 10 points
                                score = max(0, score)  # Prevent negative score
                                lives -= 1
                                if lives <= 0:
                                    state = 'enter_name'
                                else:
                                    # Reset for the same level
                                    question_asked = False
                                    first_click = False
                                    # Generate dots for the same level
                                    dots = []
                                    for _ in range(num_dots):
                                        radius = int(15 * scale)
                                        x = random.randint(radius, SCREEN_WIDTH - radius)
                                        y = random.randint(radius, SCREEN_HEIGHT - radius)
                                        color = random.choice(BACKGROUND_COLORS)
                                        dot = Dot((x, y), color)
                                        dots.append(dot)
                                    clickable_numbers = []
                                    state = 'playing'

            elif state == 'enter_name':
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_BACKSPACE:
                        player_name = player_name[:-1]
                    elif event.key == pygame.K_RETURN:
                        # Save the player's name and score
                        if player_name.strip() == "":
                            player_name = "Anonymous"
                        save_high_score(player_name, score)
                        state = 'show_high_scores'
                    else:
                        if len(player_name) < 20:
                            player_name += event.unicode

            elif state == 'show_high_scores':
                # Event handling for high score display
                if event.type == pygame.MOUSEBUTTONDOWN:
                    # Restart the game
                    welcome_screen()
                    instructions_screen()
                    game_loop()

        if state == 'playing':
            # Update and draw dots
            for dot in dots:
                if first_click:
                    dot.move()
                dot.draw(screen)
                # Check collision with other dots
                if first_click:
                    for other_dot in dots:
                        if other_dot != dot:
                            dot.check_collision(other_dot)

            # Display score and lives
            score_text = font_small.render(f'Score: {score}', True, TEXT_COLOR)
            lives_text = font_small.render(f'Lives: {lives}', True, TEXT_COLOR)
            screen.blit(score_text, (int(10 * scale), int(10 * scale)))
            screen.blit(lives_text, (SCREEN_WIDTH - int(150 * scale), int(10 * scale)))

        elif state == 'question':
            # Display question
            question_text = font_medium.render('How many dots?', True, TEXT_COLOR)
            question_rect = question_text.get_rect(center=(SCREEN_WIDTH // 2, int(50 * scale)))
            screen.blit(question_text, question_rect)

            current_time = pygame.time.get_ticks()

            if current_time - answer_move_timer >= 1000 and not answer_started_moving:
                # After 1 second, start moving the answer squares
                for number_dot in clickable_numbers:
                    number_dot.assign_random_velocity()
                answer_started_moving = True

            for number_dot in clickable_numbers:
                if answer_started_moving:
                    number_dot.move()
                    # Check collision with other number dots
                    for other_num_dot in clickable_numbers:
                        if other_num_dot != number_dot:
                            number_dot.check_collision(other_num_dot)

                # Draw squares
                number_dot.draw(screen)
                # Draw the number value
                num_text = font_small.render(str(number_dot.value), True, TEXT_COLOR)
                num_rect = num_text.get_rect(center=(int(number_dot.position[0]), int(number_dot.position[1])))
                screen.blit(num_text, num_rect)

            # Display score and lives
            score_text = font_small.render(f'Score: {score}', True, TEXT_COLOR)
            lives_text = font_small.render(f'Lives: {lives}', True, TEXT_COLOR)
            screen.blit(score_text, (int(10 * scale), int(10 * scale)))
            screen.blit(lives_text, (SCREEN_WIDTH - int(150 * scale), int(10 * scale)))

        elif state == 'enter_name':
            # Display "Enter Your Name" screen
            screen.fill(BG_COLOR)
            prompt_text = font_medium.render('Enter Your Name:', True, TEXT_COLOR)
            prompt_rect = prompt_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - int(50 * scale)))
            screen.blit(prompt_text, prompt_rect)

            # Display text input box
            input_box = pygame.Rect(SCREEN_WIDTH // 2 - int(150 * scale), SCREEN_HEIGHT // 2, int(300 * scale), int(50 * scale))
            pygame.draw.rect(screen, WHITE, input_box, 2)

            name_surface = font_medium.render(player_name, True, TEXT_COLOR)
            screen.blit(name_surface, (input_box.x + int(10 * scale), input_box.y + int(10 * scale)))

        elif state == 'show_high_scores':
            display_high_scores()
            return  # Exit game_loop

        pygame.display.update()
        clock.tick(60)  # Limit to 60 frames per second

def generate_clickable_numbers(correct_ans):
    min_dots = 6
    max_dots = 12
    options = [correct_ans]
    while len(options) < 4:
        option = random.randint(min_dots, max_dots + 3)
        if option not in options:
            options.append(option)
    options.sort()  # Sort options for alignment
    numbers = []
    # Start positions: center horizontally, stack vertically
    start_x = SCREEN_WIDTH // 2
    spacing = int(60 * scale)
    total_height = (len(options) * spacing) - spacing  # Total height occupied by options
    start_y = (SCREEN_HEIGHT // 2) - (total_height // 2)

    for i, num in enumerate(options):
        y_position = start_y + i * spacing
        number_dot = Dot((start_x, y_position), random.choice(BACKGROUND_COLORS), shape='square')
        number_dot.radius = int(25 * scale)
        number_dot.click_radius = number_dot.radius + int(10 * scale)
        number_dot.value = num
        number_dot.dx = 0  # Start stationary
        number_dot.dy = 0  # Start stationary
        numbers.append(number_dot)
    return numbers

def main():
    welcome_screen()
    instructions_screen()
    game_loop()

if __name__ == '__main__':
    main()
