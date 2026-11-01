"""
Entry point for the commuter simulation prototype.
Run via: python main.py
"""

import sys
from engine import GameEngine


def main():
    try:
        engine = GameEngine()
        engine.start()
    except (KeyboardInterrupt, EOFError):
        print("\nSession ended.")
        sys.exit(0)


if __name__ == "__main__":
    main()
