import pygame
import sys

class WelcomeState:
    def __init__(self, screen):
        self.screen = screen
        self.font_welcome = pygame.font.Font(None, 100)
        self.font_medium = pygame.font.Font(None, 48)
        self.font_small = pygame.font.Font(None, 28)
        self.font_bold = pygame.font.Font(None, 28)
        self.font_bold.set_bold(True)

    def run(self):
        running = True
        clock = pygame.time.Clock()
        fade_value = 0
        fade_direction = 1
        fade_speed = 3

        while running:
            self.screen.fill((0, 0, 0))

            fade_value += fade_direction * fade_speed
            if fade_value >= 100:
                fade_value = 100
                fade_direction = -1
            elif fade_value <= 0:
                fade_value = 0
                fade_direction = 1

            current_yellow = (
                255,
                255,
                int(153 + (fade_value / 100) * (0 - 153))
            )

            welcome_text = self.font_welcome.render('Stellar Conquest', True, (255, 255, 255))
            welcome_rect = welcome_text.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2 - 100))
            self.screen.blit(welcome_text, welcome_rect)

            click_text = self.font_medium.render('Click to Start', True, (255, 255, 255))
            click_rect = click_text.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() // 2))
            pygame.draw.rect(self.screen, (255, 255, 255), click_rect.inflate(20, 10), 2)
            self.screen.blit(click_text, click_rect)

            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    return None
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        return None
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    return 'instructions'
            
            clock.tick(60)
