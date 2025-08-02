import pygame
import sys
import random
from states.welcome import WelcomeState
from states.instructions import InstructionsState
from states.game import GameState
from states.high_scores import HighScoresState

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
REF_WIDTH = 800
REF_HEIGHT = 600
SCALE = min(SCREEN_WIDTH / REF_WIDTH, SCREEN_HEIGHT / REF_HEIGHT)

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)
PURPLE = (128, 0, 128)
PINK = (255, 192, 203)

BACKGROUND_COLORS = [RED, BLUE, PURPLE, GREEN, PINK]
BG_COLOR = BLACK
TEXT_COLOR = WHITE

def get_font(size):
    return pygame.font.Font(None, int(size * SCALE))

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption('Stellar Conquest')

    states = {
        'welcome': WelcomeState(screen),
        'instructions': InstructionsState(screen),
        'game': GameState(screen),
        'high_scores': HighScoresState(screen)
    }
    current_state = 'welcome'

    while True:
        state = states[current_state]
        next_state = state.run()

        if next_state is None:
            pygame.quit()
            sys.exit()
        
        current_state = next_state

if __name__ == '__main__':
    main()
