import pygame
import sys
import random

class Star:
    def __init__(self, screen_width, screen_height):
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.x = random.randint(0, screen_width)
        self.y = random.randint(0, screen_height)
        self.speed = random.uniform(0.1, 1)
        self.radius = random.uniform(0.5, 2)

    def move(self, screen_width):
        self.x -= self.speed
        if self.x < 0:
            self.x = screen_width
            self.y = random.randint(0, self.screen_height)

    def draw(self, surface):
        pygame.draw.circle(surface, (255, 255, 255), (self.x, self.y), self.radius)

class Planet:
    def __init__(self, position, color, shape='circle'):
        self.position = list(position)
        self.color = color
        self.radius = 15
        self.click_radius = self.radius + 10
        self.shape = shape
        self.dx = 0
        self.dy = 0
        self.possible_velocities = [-3, -2, -1, 1, 2, 3]

    def assign_random_velocity(self):
        self.dx = random.choice(self.possible_velocities)
        self.dy = random.choice(self.possible_velocities)

    def move(self, screen_width, screen_height):
        self.position[0] += self.dx
        self.position[1] += self.dy

        if self.position[0] <= self.radius or self.position[0] >= screen_width - self.radius:
            self.dx = -self.dx
        if self.position[1] <= self.radius or self.position[1] >= screen_height - self.radius:
            self.dy = -self.dy

    def check_collision(self, other_dot):
        distance = ((self.position[0] - other_dot.position[0]) ** 2 +
                    (self.position[1] - other_dot.position[1]) ** 2) ** 0.5
        if distance <= self.radius + other_dot.radius:
            self.dx, other_dot.dx = other_dot.dx, self.dx
            self.dy, other_dot.dy = other_dot.dy, self.dy

    def draw(self, surface):
        if self.shape == 'circle':
            pygame.draw.circle(surface, self.color, (int(self.position[0]), int(self.position[1])), self.radius)
        elif self.shape == 'square':
            rect_side = self.radius * 2
            rect = pygame.Rect(int(self.position[0] - self.radius),
                               int(self.position[1] - self.radius),
                               rect_side,
                               rect_side)
            pygame.draw.rect(surface, self.color, rect)

class GameState:
    def __init__(self, screen):
        self.screen = screen
        self.score = 0
        self.level = 1
        self.lives = 3
        self.planets = []
        self.font_small = pygame.font.Font(None, 36)
        self.font_medium = pygame.font.Font(None, 48)
        self.font_large = pygame.font.Font(None, 72)
        self.state = 'playing'
        self.first_click = False
        self.question_asked = False
        self.correct_answer = 0
        self.clickable_numbers = []
        self.player_name = ""
        self.answer_move_timer = 0
        self.answer_started_moving = False
        self.min_dots = 6
        self.max_dots = 12
        self.num_dots = random.randint(self.min_dots, self.max_dots)
        self.dots = []
        self.BACKGROUND_COLORS = [(255,0,0), (0,0,255), (128,0,128), (0,255,0), (255,192,203)]
        self.bg_color_index = 0
        self.fade_step = 0
        self.fade_max = 100
        self.fade_direction = 1
        self.stars = [Star(self.screen.get_width(), self.screen.get_height()) for _ in range(200)]

    def run(self):
        self.generate_dots()
        running = True
        while running:
            self.handle_events()
            self.update()
            self.draw()
            pygame.display.update()
            if self.state == 'show_high_scores':
                return 'high_scores'

    def generate_dots(self):
        self.dots = []
        for _ in range(self.num_dots):
            radius = 15
            x = random.randint(radius, self.screen.get_width() - radius)
            y = random.randint(radius, self.screen.get_height() - radius)
            color = random.choice(self.BACKGROUND_COLORS)
            dot = Planet((x, y), color)
            self.dots.append(dot)
        self.correct_answer = self.num_dots

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
            if self.state == 'playing':
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pos = pygame.mouse.get_pos()
                    for dot in self.dots[:]:
                        distance = ((pos[0] - dot.position[0]) ** 2 + (pos[1] - dot.position[1]) ** 2) ** 0.5
                        if distance <= dot.click_radius:
                            self.dots.remove(dot)
                            self.score += 1
                            if not self.first_click:
                                self.first_click = True
                                for remaining_dot in self.dots:
                                    remaining_dot.assign_random_velocity()
                            break
                    if not self.dots and not self.question_asked:
                        self.state = 'question'
                        self.clickable_numbers = self.generate_clickable_numbers(self.correct_answer)
                        self.question_asked = True
                        self.answer_move_timer = pygame.time.get_ticks()
                        self.answer_started_moving = False
            elif self.state == 'question':
                if event.type == pygame.MOUSEBUTTONDOWN:
                    pos = pygame.mouse.get_pos()
                    for number_dot in self.clickable_numbers:
                        rect_side = number_dot.radius * 2
                        rect = pygame.Rect(int(number_dot.position[0] - number_dot.radius),
                                           int(number_dot.position[1] - number_dot.radius),
                                           rect_side,
                                           rect_side)
                        if rect.collidepoint(pos):
                            if number_dot.value == self.correct_answer:
                                self.state = 'playing'
                                self.level += 1
                                self.first_click = False
                                self.question_asked = False
                                self.num_dots = random.randint(self.min_dots, self.max_dots)
                                self.generate_dots()
                                self.clickable_numbers = []
                            else:
                                self.score -= 10
                                self.score = max(0, self.score)
                                self.lives -= 1
                                if self.lives <= 0:
                                    self.state = 'enter_name'
                                else:
                                    self.question_asked = False
                                    self.first_click = False
                                    self.generate_dots()
                                    self.clickable_numbers = []
                                    self.state = 'playing'
            elif self.state == 'enter_name':
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_BACKSPACE:
                        self.player_name = self.player_name[:-1]
                    elif event.key == pygame.K_RETURN:
                        if self.player_name.strip() == "":
                            self.player_name = "Anonymous"
                        self.save_high_score(self.player_name, self.score)
                        self.state = 'show_high_scores'
                    else:
                        if len(self.player_name) < 20:
                            self.player_name += event.unicode

    def update(self):
        if self.state == 'playing' and self.first_click:
            for dot in self.dots:
                dot.move(self.screen.get_width(), self.screen.get_height())
                for other_dot in self.dots:
                    if other_dot != dot:
                        dot.check_collision(other_dot)
        for star in self.stars:
            star.move(self.screen.get_width())

    def draw(self):
        self.screen.fill((0, 0, 0))
        for star in self.stars:
            star.draw(self.screen)

        if self.state == 'playing':
            for dot in self.dots:
                dot.draw(self.screen)
            score_text = self.font_small.render(f'Score: {self.score}', True, (255,255,255))
            lives_text = self.font_small.render(f'Lives: {self.lives}', True, (255,255,255))
            self.screen.blit(score_text, (10, 10))
            self.screen.blit(lives_text, (self.screen.get_width() - 150, 10))
        elif self.state == 'question':
            question_text = self.font_medium.render('How many planets?', True, (255,255,255))
            question_rect = question_text.get_rect(center=(self.screen.get_width() // 2, 50))
            self.screen.blit(question_text, question_rect)

            current_time = pygame.time.get_ticks()

            if current_time - self.answer_move_timer >= 1000 and not self.answer_started_moving:
                for number_dot in self.clickable_numbers:
                    number_dot.assign_random_velocity()
                self.answer_started_moving = True

            for number_dot in self.clickable_numbers:
                if self.answer_started_moving:
                    number_dot.move(self.screen.get_width(), self.screen.get_height())
                    for other_num_dot in self.clickable_numbers:
                        if other_num_dot != number_dot:
                            number_dot.check_collision(other_num_dot)

                number_dot.draw(self.screen)
                num_text = self.font_small.render(str(number_dot.value), True, (255,255,255))
                num_rect = num_text.get_rect(center=(int(number_dot.position[0]), int(number_dot.position[1])))
                self.screen.blit(num_text, num_rect)

            score_text = self.font_small.render(f'Score: {self.score}', True, (255,255,255))
            lives_text = self.font_small.render(f'Lives: {self.lives}', True, (255,255,255))
            self.screen.blit(score_text, (10, 10))
            self.screen.blit(lives_text, (self.screen.get_width() - 150, 10))
        elif self.state == 'enter_name':
            self.screen.fill((0,0,0))
            prompt_text = self.font_medium.render('Enter Your Name:', True, (255,255,255))
            prompt_rect = prompt_text.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2 - 50))
            self.screen.blit(prompt_text, prompt_rect)

            input_box = pygame.Rect(self.screen.get_width() // 2 - 150, self.screen.get_height() // 2, 300, 50)
            pygame.draw.rect(self.screen, (255,255,255), input_box, 2)

            name_surface = self.font_medium.render(self.player_name, True, (255,255,255))
            self.screen.blit(name_surface, (input_box.x + 10, input_box.y + 10))

    def generate_clickable_numbers(self, correct_ans):
        options = [correct_ans]
        while len(options) < 4:
            option = random.randint(self.min_dots, self.max_dots + 3)
            if option not in options:
                options.append(option)
        options.sort()
        numbers = []
        start_x = self.screen.get_width() // 2
        spacing = 60
        total_height = (len(options) * spacing) - spacing
        start_y = (self.screen.get_height() // 2) - (total_height // 2)

        for i, num in enumerate(options):
            y_position = start_y + i * spacing
            number_dot = Planet((start_x, y_position), random.choice(self.BACKGROUND_COLORS), shape='square')
            number_dot.radius = 25
            number_dot.click_radius = number_dot.radius + 10
            number_dot.value = num
            number_dot.dx = 0
            number_dot.dy = 0
            numbers.append(number_dot)
        return numbers

    def save_high_score(self, name, score):
        with open('highscores.txt', 'a') as f:
            f.write(f"{name},{score}\n")
