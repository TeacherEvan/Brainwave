import pygame
import sys

class InstructionsState:
    def __init__(self, screen):
        self.screen = screen
        self.font_large = pygame.font.Font(None, 48)

    def run(self):
        running = True
        clock = pygame.time.Clock()

        while running:
            self.screen.fill((0, 0, 0))

            instructions = ["Click and count the planets!"]

            start_y = self.screen.get_height() // 2 - 50
            for line in instructions:
                text = self.font_large.render(line, True, (255, 255, 255))
                text_rect = text.get_rect(center=(self.screen.get_width() // 2, start_y))
                self.screen.blit(text, text_rect)
                start_y += 50

            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    return None
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        return None
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    return 'game'
            
            clock.tick(60)
