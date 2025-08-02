import pygame
import sys
import os

class HighScoresState:
    def __init__(self, screen):
        self.screen = screen
        self.font_title = pygame.font.Font(None, 72)
        self.font_entry = pygame.font.Font(None, 48)
        self.high_scores = self.load_high_scores()

    def run(self):
        running = True
        clock = pygame.time.Clock()

        while running:
            self.screen.fill((0, 0, 0))

            title_text = self.font_title.render('High Scores', True, (255, 255, 255))
            title_rect = title_text.get_rect(center=(self.screen.get_width() // 2, 100))
            self.screen.blit(title_text, title_rect)

            start_y = 200
            for index, (name, score) in enumerate(self.high_scores):
                entry_text = self.font_entry.render(f"{index + 1}. {name}: {score}", True, (255, 255, 255))
                entry_rect = entry_text.get_rect(center=(self.screen.get_width() // 2, start_y))
                self.screen.blit(entry_text, entry_rect)
                start_y += 50

            prompt_text = self.font_entry.render('Click to Play Again', True, (255, 255, 255))
            prompt_rect = prompt_text.get_rect(center=(self.screen.get_width() // 2, self.screen.get_height() - 100))
            self.screen.blit(prompt_text, prompt_rect)

            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    return None
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        return None
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    return 'welcome'
            
            clock.tick(60)

    def load_high_scores(self):
        high_scores = []
        if os.path.exists('highscores.txt'):
            with open('highscores.txt', 'r') as f:
                for line in f:
                    parts = line.strip().split(',')
                    if len(parts) == 2:
                        name, score_value = parts
                        high_scores.append((name, int(score_value)))
        return sorted(high_scores, key=lambda x: x[1], reverse=True)[:5]
